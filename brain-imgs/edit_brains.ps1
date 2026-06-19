Add-Type -AssemblyName System.Drawing
$base = 'C:\Users\danie\OneDrive\Coding\Asynchronous Training\brain-imgs'
$work = "$base\_work"
if (-not (Test-Path $work)) { New-Item -ItemType Directory $work | Out-Null }

# ----- tunable params -----
$cbRx = 25; $cbRy = 25          # cerebellum radius
$cbClearInset = 4               # how far inside the boundary to clear hatching
# cerebellum centre per image (relate is 210 wide -> shift right)
$cbCentres = @{ 'brain-reason'=@(177,121); 'brain-relate'=@(180,121); 'brain-regulate'=@(177,121) }

$lineColor = [System.Drawing.Color]::FromArgb(225,45,45,48)   # dark outline
$blueFill  = [System.Drawing.Color]::FromArgb(205,70,140,235) # limbic band
$blueDeep  = [System.Drawing.Color]::FromArgb(255,38,96,205)  # limbic edge / amygdala
$blueFaint = [System.Drawing.Color]::FromArgb(110,90,160,240) # thalamus

function ProcessBrain($name, $isRelate) {
    $src = "$base\cleaned\${name}__median5.png"
    $img = [System.Drawing.Bitmap]::FromFile($src)
    $w = $img.Width; $h = $img.Height
    $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g0 = [System.Drawing.Graphics]::FromImage($bmp)
    $g0.DrawImage($img, 0, 0, $w, $h); $g0.Dispose(); $img.Dispose()

    $c = $cbCentres[$name]; $cbX = $c[0]; $cbY = $c[1]

    # --- 1. clear cerebellum interior hatching (keep thin original rim) ---
    $irx = $cbRx - $cbClearInset; $iry = $cbRy - $cbClearInset
    for ($y = [Math]::Max(0,$cbY-$cbRy); $y -lt [Math]::Min($h,$cbY+$cbRy); $y++) {
        for ($x = [Math]::Max(0,$cbX-$cbRx); $x -lt [Math]::Min($w,$cbX+$cbRx); $x++) {
            $dx = ($x - $cbX) / $irx; $dy = ($y - $cbY) / $iry
            if (($dx*$dx + $dy*$dy) -le 1.0) { $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0,0,0,0)) }
        }
    }

    # --- 2. (relate only) erase the old blue blob ---
    if ($isRelate) {
        for ($y = 60; $y -lt 130; $y++) {
            for ($x = 45; $x -lt 160; $x++) {
                if ($x -ge $w -or $y -ge $h) { continue }
                $p = $bmp.GetPixel($x, $y)
                if ($p.A -gt 80 -and $p.B -gt 90 -and ($p.B - $p.R) -gt 20 -and ($p.B - $p.G) -gt 10) {
                    $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0,0,0,0))
                }
            }
        }
    }

    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    # --- 3. cerebellum clean outline (lower-right arc; top-left meets cerebrum) ---
    $penCb = New-Object System.Drawing.Pen ($lineColor), 2.0
    $orx = $cbRx - 1; $ory = $cbRy - 1
    $g.DrawArc($penCb, $cbX-$orx, $cbY-$ory, 2*$orx, 2*$ory, -35, 250)
    # a couple of faint folia hints (very few, not hatching)
    $penFol = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120,90,90,95)), 1.2
    $g.DrawArc($penFol, $cbX-$orx+5, $cbY-$ory+6, 2*$orx-10, 2*$ory-12, 10, 150)
    $g.DrawArc($penFol, $cbX-$orx+8, $cbY-$ory+12,2*$orx-16, 2*$ory-22, 5, 160)

    # --- 4. (relate only) draw anatomical limbic C ---
    if ($isRelate) {
        # thalamus (faint filled oval in centre)
        $thBrush = New-Object System.Drawing.SolidBrush ($blueFaint)
        $g.FillEllipse($thBrush, 92, 84, 26, 16)
        # limbic ring: thick blue arc, gap at lower-left (front-down)
        $penLimb = New-Object System.Drawing.Pen ($blueFill), 11.0
        $penLimb.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
        $penLimb.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round
        $lrx = 39; $lry = 25; $lcx = 102; $lcy = 90
        # GDI angles: 0=right,90=down,270=up. Gap centred ~165 (lower-left): draw 200 -> +290
        $g.DrawArc($penLimb, $lcx-$lrx, $lcy-$lry, 2*$lrx, 2*$lry, 200, 290)
        # amygdala blob at the front/lower tip of the opening
        $amBrush = New-Object System.Drawing.SolidBrush ($blueDeep)
        $g.FillEllipse($amBrush, 64, 99, 16, 14)
    }

    $g.Dispose()
    $bmp.Save("$work\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "wrote _work\$name.png"
}

ProcessBrain 'brain-reason'   $false
ProcessBrain 'brain-relate'   $true
ProcessBrain 'brain-regulate' $false
Write-Host 'done'
