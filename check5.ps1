$content = Get-Content 'c:\Users\Admint\Desktop\mg cactosoft\app.js' -Raw
$dquotes = ($content.ToCharArray() | Where-Object { $_ -eq 34 }).Count
Write-Output "DoubleQuotes: $dquotes"
