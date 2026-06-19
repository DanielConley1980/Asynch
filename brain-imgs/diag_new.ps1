Add-Type -AssemblyName System.Drawing
$base = 'C:\Users\danie\OneDrive\Coding\Asynchronous Training\brain-imgs'
$src = "$base\_new\clip.png"
$img = [System.Drawing.Bitmap]::FromFile($src)
$w = $img.Width; $h = $img.Height

# grid overlay
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, 0, 0, $w, $h)
$penMaj = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(150,255,120,0)), 1
$font = New-Object System.Drawing.Font('Arial', 8)
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,255,40,200))
for ($x = 0; $x -le $w; $x += 40) { $g.DrawLine($penMaj, $x, 0, $x, $h); $g.DrawString("$x", $font, $brush, $x, 0) }
for ($y = 0; $y -le $h; $y += 40) { $g.DrawLine($penMaj, 0, $y, $w, $y); $g.DrawString("$y", $font, $brush, 0, $y) }
$g.Dispose()
if (-not (Test-Path "$base\_diag")) { New-Item -ItemType Directory "$base\_diag" | Out-Null }
$bmp.Save("$base\_diag\clip_grid.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "clip is ${w}x${h}; grid saved"

# sample a spread of points to learn region colours
$pts = @{
  'cortex_top'    = @(120, 40)
  'cortex_left'   = @(60, 140)
  'central_red'   = @(150, 90)
  'central_red2'  = @(180, 110)
  'brainstem'     = @(190, 250)
  'brainstem2'    = @(175, 210)
  'cerebellum'    = @(300, 150)
  'cerebellum2'   = @(280, 130)
  'bg_corner'     = @(5, 5)
}
foreach ($k in $pts.Keys) {
  $p = $pts[$k]
  if ($p[0] -lt $w -and $p[1] -lt $h) {
    $c = $img.GetPixel($p[0], $p[1])
    "{0,-12} ({1},{2}) = R{3} G{4} B{5} A{6}" -f $k, $p[0], $p[1], $c.R, $c.G, $c.B, $c.A
  }
}
$img.Dispose()
