<#
brain_clean.ps1  -- alpha-aware line-art de-noising library for the brain PNGs.

Contains reusable functions, then (when run directly) performs:
  1. A parameter sweep on brain-reason.png (technique exploration).
  2. Applies the most promising techniques to all three brains.

Design notes / correctness:
  * Images are 32bpp ARGB with a TRANSPARENT background (A=0) and an OPAQUE
    brain interior (A=255: dark lines + light fill + one coloured region).
  * Every filter is ALPHA-AWARE: when building a pixel's neighbourhood, only
    OPAQUE neighbours contribute. Transparent neighbours are ignored so the
    transparent background never bleeds grey into the silhouette and the crisp
    outline is preserved.
  * The ALPHA CHANNEL IS NEVER MODIFIED for blur/median/downscale techniques:
    output alpha == source alpha, pixel for pixel. So background pixels stay
    exactly A=0 (fully transparent). Morphology techniques deliberately grow the
    DARK ink only, still strictly inside the original opaque mask.
  * Uses GetPixel/SetPixel via a pre-read int[] buffer obtained with LockBits +
    Marshal.Copy (fast) and writes back the same way.
#>

Add-Type -AssemblyName System.Drawing

# ---------------------------------------------------------------------------
# Low-level buffer helpers (LockBits, ARGB int[] <-> Bitmap)
# ---------------------------------------------------------------------------

function Read-ArgbBuffer {
    param([string]$Path)
    $bmp = New-Object System.Drawing.Bitmap($Path)
    $w = $bmp.Width; $h = $bmp.Height
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $count = $w * $h
    $buf = New-Object int[] $count
    [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $count)
    $bmp.UnlockBits($data)
    $bmp.Dispose()
    return @{ W = $w; H = $h; Buf = $buf }
}

function Write-ArgbBuffer {
    param($Img, [string]$Path)
    $w = $Img.W; $h = $Img.H
    $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    [System.Runtime.InteropServices.Marshal]::Copy($Img.Buf, 0, $data.Scan0, $w * $h)
    $bmp.UnlockBits($data)
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

# ARGB int packing helpers (BGRA in memory for Format32bppArgb on little-endian)
function Get-A([int]$p) { return ($p -shr 24) -band 0xFF }
function Get-R([int]$p) { return ($p -shr 16) -band 0xFF }
function Get-G([int]$p) { return ($p -shr 8) -band 0xFF }
function Get-B([int]$p) { return $p -band 0xFF }
function Pack-ARGB([int]$a, [int]$r, [int]$g, [int]$b) {
    if ($a -lt 0) { $a = 0 } elseif ($a -gt 255) { $a = 255 }
    if ($r -lt 0) { $r = 0 } elseif ($r -gt 255) { $r = 255 }
    if ($g -lt 0) { $g = 0 } elseif ($g -gt 255) { $g = 255 }
    if ($b -lt 0) { $b = 0 } elseif ($b -gt 255) { $b = 255 }
    return ([int]$a -shl 24) -bor ([int]$r -shl 16) -bor ([int]$g -shl 8) -bor [int]$b
}

$script:ALPHA_T = 128   # opaque threshold

# ---------------------------------------------------------------------------
# (a) Box blur (separable-ish, alpha-aware). Approximates Gaussian when applied.
#     radiusPx is a float; we use an integer kernel radius = round(radiusPx),
#     min 1, and weight the centre extra for small fractional radii to emulate
#     a softer (sub-pixel) blur.
# ---------------------------------------------------------------------------
function Invoke-Blur {
    param($Img, [double]$RadiusPx)
    $w = $Img.W; $h = $Img.H; $src = $Img.Buf
    $out = New-Object int[] ($w * $h)
    $kr = [int][math]::Max(1, [math]::Round($RadiusPx))
    # centre boost for sub-pixel radii (<1 => heavy centre, ~1 => light, >1 => none)
    $centerBoost = [int][math]::Max(0, [math]::Round((1.0 - ($RadiusPx)) * 6))
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $idx = $y * $w + $x
            $p = $src[$idx]
            $a = (Get-A $p)
            if ($a -lt $script:ALPHA_T) { $out[$idx] = $p; continue }  # keep transparent as-is
            $sr = 0; $sg = 0; $sb = 0; $n = 0
            for ($dy = -$kr; $dy -le $kr; $dy++) {
                $yy = $y + $dy
                if ($yy -lt 0 -or $yy -ge $h) { continue }
                $row = $yy * $w
                for ($dx = -$kr; $dx -le $kr; $dx++) {
                    $xx = $x + $dx
                    if ($xx -lt 0 -or $xx -ge $w) { continue }
                    $q = $src[$row + $xx]
                    if ((Get-A $q) -lt $script:ALPHA_T) { continue }  # ignore transparent neighbours
                    $wgt = 1
                    if ($dx -eq 0 -and $dy -eq 0) { $wgt = 1 + $centerBoost }
                    $sr += (Get-R $q) * $wgt
                    $sg += (Get-G $q) * $wgt
                    $sb += (Get-B $q) * $wgt
                    $n += $wgt
                }
            }
            if ($n -eq 0) { $out[$idx] = $p; continue }
            $out[$idx] = Pack-ARGB $a ([int]($sr / $n)) ([int]($sg / $n)) ([int]($sb / $n))
        }
    }
    return @{ W = $w; H = $h; Buf = $out }
}

# ---------------------------------------------------------------------------
# (b) Median filter NxN (alpha-aware). Excellent for line de-noising: merges
#     fine lines, preserves the strong outline edges.
# ---------------------------------------------------------------------------
function Invoke-Median {
    param($Img, [int]$Size)   # 3 or 5
    $w = $Img.W; $h = $Img.H; $src = $Img.Buf
    $out = New-Object int[] ($w * $h)
    $r = [int][math]::Floor($Size / 2)   # 3->1, 5->2 (avoid banker's rounding of [int])
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $idx = $y * $w + $x
            $p = $src[$idx]
            $a = (Get-A $p)
            if ($a -lt $script:ALPHA_T) { $out[$idx] = $p; continue }
            $rs = New-Object System.Collections.ArrayList
            $gs = New-Object System.Collections.ArrayList
            $bs = New-Object System.Collections.ArrayList
            for ($dy = -$r; $dy -le $r; $dy++) {
                $yy = $y + $dy
                if ($yy -lt 0 -or $yy -ge $h) { continue }
                $row = $yy * $w
                for ($dx = -$r; $dx -le $r; $dx++) {
                    $xx = $x + $dx
                    if ($xx -lt 0 -or $xx -ge $w) { continue }
                    $q = $src[$row + $xx]
                    if ((Get-A $q) -lt $script:ALPHA_T) { continue }
                    [void]$rs.Add((Get-R $q)); [void]$gs.Add((Get-G $q)); [void]$bs.Add((Get-B $q))
                }
            }
            if ($rs.Count -eq 0) { $out[$idx] = $p; continue }
            $rs.Sort(); $gs.Sort(); $bs.Sort()
            $m = [int]($rs.Count / 2)
            $out[$idx] = Pack-ARGB $a $rs[$m] $gs[$m] $bs[$m]
        }
    }
    return @{ W = $w; H = $h; Buf = $out }
}

# ---------------------------------------------------------------------------
# (c) Morphological close on the DARK ink: dilate-then-erode the dark line
#     pixels. Thickens + merges thin lines, then pulls back slightly so lines
#     don't get too fat. Operates within the opaque mask only (never paints the
#     transparent background). "Dark" = luminance below DarkThresh.
#     We grow darkness by taking the MIN luminance over the neighbourhood
#     (greyscale dilation of ink = erosion of brightness), constrained to
#     opaque pixels, then optionally a MAX pass (erode ink) for the close.
# ---------------------------------------------------------------------------
function Invoke-DarkMorph {
    param($Img, [int]$Radius = 1, [switch]$Close)
    $w = $Img.W; $h = $Img.H; $src = $Img.Buf

    # Pass 1: greyscale dilation of ink (min over neighbourhood), opaque-only.
    $tmp = New-Object int[] ($w * $h)
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $idx = $y * $w + $x
            $p = $src[$idx]
            $a = (Get-A $p)
            if ($a -lt $script:ALPHA_T) { $tmp[$idx] = $p; continue }
            # find the darkest opaque neighbour, carry its RGB
            $bestLum = 99999; $bp = $p
            for ($dy = -$Radius; $dy -le $Radius; $dy++) {
                $yy = $y + $dy
                if ($yy -lt 0 -or $yy -ge $h) { continue }
                $row = $yy * $w
                for ($dx = -$Radius; $dx -le $Radius; $dx++) {
                    $xx = $x + $dx
                    if ($xx -lt 0 -or $xx -ge $w) { continue }
                    $q = $src[$row + $xx]
                    if ((Get-A $q) -lt $script:ALPHA_T) { continue }
                    $lum = (Get-R $q) + (Get-G $q) + (Get-B $q)
                    if ($lum -lt $bestLum) { $bestLum = $lum; $bp = $q }
                }
            }
            # keep original alpha, take darkest neighbour's colour
            $tmp[$idx] = Pack-ARGB $a (Get-R $bp) (Get-G $bp) (Get-B $bp)
        }
    }
    if (-not $Close) { return @{ W = $w; H = $h; Buf = $tmp } }

    # Pass 2: greyscale erosion of ink (max over neighbourhood) => morphological close.
    $out = New-Object int[] ($w * $h)
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $idx = $y * $w + $x
            $p = $tmp[$idx]
            $a = (Get-A $p)
            if ($a -lt $script:ALPHA_T) { $out[$idx] = $p; continue }
            $bestLum = -1; $bp = $p
            for ($dy = -$Radius; $dy -le $Radius; $dy++) {
                $yy = $y + $dy
                if ($yy -lt 0 -or $yy -ge $h) { continue }
                $row = $yy * $w
                for ($dx = -$Radius; $dx -le $Radius; $dx++) {
                    $xx = $x + $dx
                    if ($xx -lt 0 -or $xx -ge $w) { continue }
                    $q = $tmp[$row + $xx]
                    if ((Get-A $q) -lt $script:ALPHA_T) { continue }
                    $lum = (Get-R $q) + (Get-G $q) + (Get-B $q)
                    if ($lum -gt $bestLum) { $bestLum = $lum; $bp = $q }
                }
            }
            $out[$idx] = Pack-ARGB $a (Get-R $bp) (Get-G $bp) (Get-B $bp)
        }
    }
    return @{ W = $w; H = $h; Buf = $out }
}

# ---------------------------------------------------------------------------
# (d) Downscale to fraction then upscale back (high-quality bicubic / bilinear).
#     Resampling naturally softens fine detail. Alpha handled by GDI+ with
#     premultiply-safe HighQuality interpolation; we then HARD-RESTORE the
#     original alpha mask (snap to 0/255 from the source) so the silhouette is
#     identical to the original and the background is exactly transparent.
# ---------------------------------------------------------------------------
function Invoke-DownUp {
    param([string]$SrcPath, $SrcImg, [double]$Fraction, [string]$Mode = 'HighQualityBicubic')

    $orig = New-Object System.Drawing.Bitmap($SrcPath)
    $w = $orig.Width; $h = $orig.Height
    $sw = [int][math]::Max(1, [math]::Round($w * $Fraction))
    $sh = [int][math]::Max(1, [math]::Round($h * $Fraction))

    $small = New-Object System.Drawing.Bitmap($sw, $sh, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g1 = [System.Drawing.Graphics]::FromImage($small)
    $g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::$Mode
    $g1.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g1.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $g1.DrawImage($orig, (New-Object System.Drawing.Rectangle(0, 0, $sw, $sh)))
    $g1.Dispose()

    $big = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g2 = [System.Drawing.Graphics]::FromImage($big)
    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::$Mode
    $g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g2.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $g2.DrawImage($small, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)))
    $g2.Dispose()

    # Pull RGB from resampled, but restore the ORIGINAL alpha (binary mask).
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $od = $orig.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bd = $big.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cnt = $w * $h
    $obuf = New-Object int[] $cnt; $bbuf = New-Object int[] $cnt
    [System.Runtime.InteropServices.Marshal]::Copy($od.Scan0, $obuf, 0, $cnt)
    [System.Runtime.InteropServices.Marshal]::Copy($bd.Scan0, $bbuf, 0, $cnt)
    $orig.UnlockBits($od); $big.UnlockBits($bd)

    $out = New-Object int[] $cnt
    for ($i = 0; $i -lt $cnt; $i++) {
        $oa = (Get-A $obuf[$i])
        if ($oa -lt $script:ALPHA_T) {
            $out[$i] = $obuf[$i]   # keep original transparent pixel verbatim
        } else {
            # opaque in original: use resampled RGB, force original (opaque) alpha
            $out[$i] = Pack-ARGB $oa (Get-R $bbuf[$i]) (Get-G $bbuf[$i]) (Get-B $bbuf[$i])
        }
    }
    $orig.Dispose(); $small.Dispose(); $big.Dispose()
    return @{ W = $w; H = $h; Buf = $out }
}

# ---------------------------------------------------------------------------
# (e) Light sharpen (unsharp-ish 3x3), alpha-aware. Used after a softening pass
#     to recover a little crispness without bringing back scratchiness.
# ---------------------------------------------------------------------------
function Invoke-Sharpen {
    param($Img, [double]$Amount = 0.5)
    $w = $Img.W; $h = $Img.H; $src = $Img.Buf
    $out = New-Object int[] ($w * $h)
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $idx = $y * $w + $x
            $p = $src[$idx]
            $a = (Get-A $p)
            if ($a -lt $script:ALPHA_T) { $out[$idx] = $p; continue }
            # local mean of opaque neighbours
            $sr = 0; $sg = 0; $sb = 0; $n = 0
            for ($dy = -1; $dy -le 1; $dy++) {
                $yy = $y + $dy; if ($yy -lt 0 -or $yy -ge $h) { continue }
                $row = $yy * $w
                for ($dx = -1; $dx -le 1; $dx++) {
                    $xx = $x + $dx; if ($xx -lt 0 -or $xx -ge $w) { continue }
                    $q = $src[$row + $xx]; if ((Get-A $q) -lt $script:ALPHA_T) { continue }
                    $sr += (Get-R $q); $sg += (Get-G $q); $sb += (Get-B $q); $n++
                }
            }
            if ($n -eq 0) { $out[$idx] = $p; continue }
            $mr = $sr / $n; $mg = $sg / $n; $mb = $sb / $n
            $nr = [int]((Get-R $p) + ($Amount * ((Get-R $p) - $mr)))
            $ng = [int]((Get-G $p) + ($Amount * ((Get-G $p) - $mg)))
            $nb = [int]((Get-B $p) + ($Amount * ((Get-B $p) - $mb)))
            $out[$idx] = Pack-ARGB $a $nr $ng $nb
        }
    }
    return @{ W = $w; H = $h; Buf = $out }
}

# ===========================================================================
# DRIVER (runs when the script is executed directly, not dot-sourced)
# ===========================================================================
if ($MyInvocation.InvocationName -ne '.') {
    $dir = 'C:\Users\danie\OneDrive\Coding\Asynchronous Training\brain-imgs'
    $outDir = Join-Path $dir 'cleaned'
    if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

    $reason   = Join-Path $dir 'brain-reason.png'
    $relate   = Join-Path $dir 'brain-relate.png'
    $regulate = Join-Path $dir 'brain-regulate.png'

    function Save([object]$img, [string]$name) {
        $path = Join-Path $outDir $name
        Write-ArgbBuffer $img $path
        Write-Output ('  wrote {0}' -f $name)
    }

    Write-Output '=== PARAMETER SWEEP on brain-reason.png ==='

    $rImg = Read-ArgbBuffer $reason

    # (a) Blur sweep
    Save (Invoke-Blur $rImg 0.6) 'brain-reason__blur0.6.png'
    Save (Invoke-Blur $rImg 1.0) 'brain-reason__blur1.0.png'
    Save (Invoke-Blur $rImg 1.5) 'brain-reason__blur1.5.png'

    # (b) Median sweep
    Save (Invoke-Median $rImg 3) 'brain-reason__median3.png'
    Save (Invoke-Median $rImg 5) 'brain-reason__median5.png'

    # (c) Morphology sweep
    Save (Invoke-DarkMorph $rImg 1)        'brain-reason__dilate1.png'
    Save (Invoke-DarkMorph $rImg 1 -Close) 'brain-reason__close1.png'

    # (d) Downscale-up sweep
    Save (Invoke-DownUp $reason $rImg 0.55) 'brain-reason__downup55.png'
    Save (Invoke-DownUp $reason $rImg 0.60) 'brain-reason__downup60.png'
    Save (Invoke-DownUp $reason $rImg 0.65) 'brain-reason__downup65.png'

    # (e) Combos
    $m3 = Invoke-Median $rImg 3
    Save (Invoke-Sharpen $m3 0.5) 'brain-reason__median3_sharpen.png'
    $du = Invoke-DownUp $reason $rImg 0.60
    Save (Invoke-Median $du 3) 'brain-reason__downup60_median3.png'
    $b10 = Invoke-Blur $rImg 1.0
    Save (Invoke-Median $b10 3) 'brain-reason__blur1.0_median3.png'

    Write-Output ''
    Write-Output '=== APPLY promising techniques to ALL THREE brains ==='

    $targets = @(
        @{ Name = 'brain-reason';   Path = $reason },
        @{ Name = 'brain-relate';   Path = $relate },
        @{ Name = 'brain-regulate'; Path = $regulate }
    )

    foreach ($t in $targets) {
        Write-Output ('-- {0} --' -f $t.Name)
        $img = Read-ArgbBuffer $t.Path

        # median 3x3  (top candidate: merges fine lines, keeps outline)
        Save (Invoke-Median $img 3) ('{0}__median3.png' -f $t.Name)

        # median 5x5  (stronger merge for very busy cerebellum)
        Save (Invoke-Median $img 5) ('{0}__median5.png' -f $t.Name)

        # downscale-up 60% (soft, natural)
        Save (Invoke-DownUp $t.Path $img 0.60) ('{0}__downup60.png' -f $t.Name)

        # combo: downup60 then median3 (soft + merged)  -- the "clean but detailed" bet
        $du = Invoke-DownUp $t.Path $img 0.60
        Save (Invoke-Median $du 3) ('{0}__downup60_median3.png' -f $t.Name)

        # combo: median3 then light sharpen (merged but a touch crisp)
        $m3 = Invoke-Median $img 3
        Save (Invoke-Sharpen $m3 0.5) ('{0}__median3_sharpen.png' -f $t.Name)

        # blur 1.0 (gentle all-over softening)
        Save (Invoke-Blur $img 1.0) ('{0}__blur1.0.png' -f $t.Name)
    }

    Write-Output ''
    Write-Output 'DONE.'
}
