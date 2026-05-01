$content = Get-Content 'c:\Users\Admint\Desktop\mg cactosoft\app.js' -Raw
$open = ($content.ToCharArray() | Where-Object { $_ -eq 40 }).Count
$close = ($content.ToCharArray() | Where-Object { $_ -eq 41 }).Count
Write-Output "OpenParen: $open"
Write-Output "CloseParen: $close"
