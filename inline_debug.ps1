$html = Get-Content 'C:\Users\Admint\Desktop\mg cactosoft\index.html' -Raw
$js = Get-Content 'C:\Users\Admint\Desktop\mg cactosoft\app.js' -Raw
$html = $html -replace '<script src="app.js"></script>', "<script>`n$js`n</script>"
Set-Content -Path 'C:\Users\Admint\Desktop\mg cactosoft\index_debug.html' -Value $html
Start-Process "msedge.exe" "file:///C:/Users/Admint/Desktop/mg%20cactosoft/index_debug.html"
