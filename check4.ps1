$content = Get-Content 'c:\Users\Admint\Desktop\mg cactosoft\app.js' -Raw
$open = ($content.ToCharArray() | Where-Object { $_ -eq 91 }).Count
$close = ($content.ToCharArray() | Where-Object { $_ -eq 93 }).Count
Write-Output "OpenBracket: $open"
Write-Output "CloseBracket: $close"
