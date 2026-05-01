$content = Get-Content 'c:\Users\Admint\Desktop\mg cactosoft\app.js' -Raw
$open = ($content.ToCharArray() | Where-Object { $_ -eq 123 }).Count
$close = ($content.ToCharArray() | Where-Object { $_ -eq 125 }).Count
$ticks = ($content.ToCharArray() | Where-Object { $_ -eq 96 }).Count
$quotes = ($content.ToCharArray() | Where-Object { $_ -eq 39 }).Count
$dquotes = ($content.ToCharArray() | Where-Object { $_ -eq 34 }).Count
Write-Output "OpenBrace: $open"
Write-Output "CloseBrace: $close"
Write-Output "Backticks: $ticks"
Write-Output "SingleQuotes: $quotes"
Write-Output "DoubleQuotes: $dquotes"
