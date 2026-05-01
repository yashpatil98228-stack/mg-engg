$content = Get-Content 'c:\Users\Admint\Desktop\mg cactosoft\app.js' -Raw
# Remove all comments
$content = $content -replace '(?s)/\*.*?\*/', ''
$content = $content -replace '//.*', ''
# Remove all strings
$content = $content -replace '(?s)`.*?`', '""'
$content = $content -replace "'[^']*'", '""'
$content = $content -replace '"[^"]*"', '""'

# Now print all lines that contain if, else, {, or }
$lines = $content -split "`r`n"
for ($i=0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i].Trim()
    if ($line -match 'if|else|\{|\}') {
        Write-Output "Line $($i+1): $line"
    }
}
