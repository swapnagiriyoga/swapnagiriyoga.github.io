# Builds the two logo assets from the supplied banner:
#   logo.png        - background keyed out, for light surfaces
#   logo-light.png  - ink remapped to pale lavender, for dark surfaces
Add-Type -AssemblyName System.Drawing

$source = 'C:\Users\sammu\Downloads\logo2.png'
$dir    = 'C:\Users\sammu\OneDrive\Desktop\claude code\projects\swapnagiri-yoga\src\assets'

# ---- 1. Key out the background -------------------------------------------
$srcImg = New-Object System.Drawing.Bitmap($source)
$w = [int]$srcImg.Width; $h = [int]$srcImg.Height
# The PNG is 24bpp, so copy into a true ARGB surface or written alpha is discarded.
$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp); $g.DrawImage($srcImg, 0, 0, $w, $h); $g.Dispose(); $srcImg.Dispose()

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

# Keep only the monogram and the wordmark. Everything else in the banner -
# the wave band, the lotus/swoosh, the corner mandala - is background dressing.
$ax0 = [int]($w * 0.045); $ax1 = [int]($w * 0.335); $ay0 = [int]($h * 0.015); $ay1 = [int]($h * 0.85)
$bx0 = [int]($w * 0.335); $bx1 = [int]($w * 0.975); $by0 = [int]($h * 0.23);  $by1 = [int]($h * 0.615)

# A background wave sweeps up into the monogram's lower-left. There the wave
# sits near luminance 190 while the monogram ink is 90-150, so that corner
# gets a tighter threshold rather than a hard rectangular cut.
$wx = [int]($w * 0.17); $wy = [int]($h * 0.69)

$bg = 246.0
for ($y = 0; $y -lt $h; $y++) {
  $row = $y * $stride
  $inA = ($y -ge $ay0 -and $y -lt $ay1); $inB = ($y -ge $by0 -and $y -lt $by1)
  $corner = ($y -gt $wy)
  for ($x = 0; $x -lt $w; $x++) {
    $i = $row + $x * 4
    $keep = ($inA -and $x -ge $ax0 -and $x -lt $ax1) -or ($inB -and $x -ge $bx0 -and $x -lt $bx1)
    if (-not $keep) { $bytes[$i + 3] = 0; continue }

    if ($corner -and $x -lt $wx) { $hi = 172.0; $lo = 148.0 } else { $hi = 240.0; $lo = 212.0 }

    $lum = ([int]$bytes[$i] + [int]$bytes[$i + 1] + [int]$bytes[$i + 2]) / 3.0
    if ($lum -ge $hi) { $bytes[$i + 3] = 0; continue }
    if ($lum -le $lo) { $a = 1.0 } else { $a = ($hi - $lum) / ($hi - $lo) }
    $bytes[$i + 3] = [byte][math]::Round(255 * $a)
    # Unpremultiply against the light background so edges carry no pale fringe.
    for ($k = 0; $k -lt 3; $k++) {
      $v = ([double]$bytes[$i + $k] - (1.0 - $a) * $bg) / $a
      if ($v -lt 0) { $v = 0 } elseif ($v -gt 255) { $v = 255 }
      $bytes[$i + $k] = [byte][math]::Round($v)
    }
  }
}
[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$bmp.UnlockBits($data)

# ---- 2. Trim to content and resize ---------------------------------------
$minX = $w; $minY = $h; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $h; $y += 2) {
  for ($x = 0; $x -lt $w; $x += 2) {
    if ($bmp.GetPixel($x, $y).A -gt 12) {
      if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
$pad = 8
$minX = [math]::Max(0, $minX - $pad); $minY = [math]::Max(0, $minY - $pad)
$maxX = [math]::Min($w - 1, $maxX + $pad); $maxY = [math]::Min($h - 1, $maxY + $pad)
$cw = $maxX - $minX + 1; $ch = $maxY - $minY + 1
$crop = $bmp.Clone((New-Object System.Drawing.Rectangle($minX, $minY, $cw, $ch)), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmp.Dispose()

$nw = 820; $nh = [int][math]::Round($ch * $nw / $cw)
$out = New-Object System.Drawing.Bitmap($nw, $nh, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($out)
$g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($crop, (New-Object System.Drawing.Rectangle(0, 0, $nw, $nh)))
$g.Dispose(); $crop.Dispose()
$out.Save("$dir\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# ---- 3. Light variant for dark surfaces ----------------------------------
$rect2 = New-Object System.Drawing.Rectangle(0, 0, $nw, $nh)
$d2 = $out.LockBits($rect2, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$b2 = New-Object byte[] ($d2.Stride * $nh)
[System.Runtime.InteropServices.Marshal]::Copy($d2.Scan0, $b2, 0, $b2.Length)
$loR = 199.0; $loG = 125.0; $loB = 255.0   # #C77DFF, for the lighter ink
$hiR = 246.0; $hiG = 236.0; $hiB = 255.0   # #F6ECFF, for the darkest ink
for ($i = 0; $i -lt $b2.Length; $i += 4) {
  if ($b2[$i + 3] -eq 0) { continue }
  $lum = ([int]$b2[$i] + [int]$b2[$i + 1] + [int]$b2[$i + 2]) / 3.0
  $t = 1.0 - [math]::Min(1.0, $lum / 230.0)
  $b2[$i]     = [byte][math]::Round($loB + ($hiB - $loB) * $t)
  $b2[$i + 1] = [byte][math]::Round($loG + ($hiG - $loG) * $t)
  $b2[$i + 2] = [byte][math]::Round($loR + ($hiR - $loR) * $t)
}
[System.Runtime.InteropServices.Marshal]::Copy($b2, 0, $d2.Scan0, $b2.Length)
$out.UnlockBits($d2)
$out.Save("$dir\logo-light.png", [System.Drawing.Imaging.ImageFormat]::Png)
$out.Dispose()

Write-Output "Built logo.png and logo-light.png at ${nw}x${nh}"
