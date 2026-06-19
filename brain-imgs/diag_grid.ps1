Add-Type -AssemblyName System.Drawing
$base = 'C:\Users\danie\OneDrive\Coding\Asynchronous Training\brain-imgs'
$diag = "$base\_diag"
if (-not (Test-Path $diag)) { New-Item -ItemType Directory $diag | Out-Null }

function GridIt($srcRel, $outName) {
    $img = [System.Drawing.Bitmap]::FromFile("$base\$srcRel")
    $w = $img.Width; $h = $img.Height
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    # dark backdrop so transparent shows, then the image
    $g.Clear([System.Drawing.Color]::FromArgb(255,20,30,45))
    $g.DrawImage($img, 0, 0, $w, $h)
    $penMinor = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(90,255,80,80)), 1
    $penMajor = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(170,255,120,60)), 1
    $font = New-Object System.Drawing.Font('Arial', 7)
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220,255,220,120))
    for ($x = 0; $x -le $w; $x += 20) {
        $p = if ($x % 40 -eq 0) { $penMajor } else { $penMinor }
        $g.DrawLine($p, $x, 0, $x, $h)
        if ($x % 40 -eq 0) { $g.DrawString("$x", $font, $brush, $x, 0) }
    }
    for ($y = 0; $y -le $h; $y += 20) {
        $p = if ($y % 40 -eq 0) { $penMajor } else { $penMinor }
        $g.DrawLine($p, 0, $y, $w, $y)
        if ($y % 40 -eq 0) { $g.DrawString("$y", $font, $brush, 0, $y) }
    }
    $g.Dispose()
    $bmp.Save("$diag\$outName", [System.Drawing.Imaging.ImageFormat]::Png)
    $img.Dispose(); $bmp.Dispose()
    Write-Host "Saved $outName ($w x $h)"
}

# detect blue blob bbox/centroid on the relate brain
function BlueBox($srcRel) {
    $img = [System.Drawing.Bitmap]::FromFile("$base\$srcRel")
    $minX = 9999; $minY = 9999; $maxX = -1; $maxY = -1; $sumX = 0; $sumY = 0; $n = 0
    for ($y = 0; $y -lt $img.Height; $y++) {
        for ($x = 0; $x -lt $img.Width; $x++) {
            $c = $img.GetPixel($x, $y)
            if ($c.A -gt 120 -and $c.B -gt 95 -and ($c.B - $c.R) -gt 25 -and ($c.B - $c.G) -gt 15) {
                if ($x -lt $minX) { $minX = $x }; if ($y -lt $minY) { $minY = $y }
                if ($x -gt $maxX) { $maxX = $x }; if ($y -gt $maxY) { $maxY = $y }
                $sumX += $x; $sumY += $y; $n++
            }
        }
    }
    $img.Dispose()
    if ($n -gt 0) {
        $cx = [math]::Round($sumX / $n); $cy = [math]::Round($sumY / $n)
        Write-Host "BLUE bbox: x $minX..$maxX  y $minY..$maxY  centroid ($cx,$cy)  count $n"
    } else { Write-Host "No blue detected" }
}

GridIt 'cleaned\brain-relate__median5.png'   'relate_grid.png'
GridIt 'cleaned\brain-regulate__median5.png' 'regulate_grid.png'
GridIt 'cleaned\brain-reason__median5.png'   'reason_grid.png'
BlueBox 'cleaned\brain-relate__median5.png'
