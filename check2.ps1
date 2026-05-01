$lines = Get-Content 'c:\Users\Admint\Desktop\mg cactosoft\app.js'
for ($i=0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    # Remove escaped single quotes
    $cleanLine = $line -replace "\\'", ""
    $quotes = ($cleanLine.ToCharArray() | Where-Object { $_ -eq 39 }).Count
    if ($quotes % 2 -ne 0) {
        Write-Output "Line $($i+1): $line"
    }
}
