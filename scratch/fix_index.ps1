$line = (Get-Content index.html | Select-String -Pattern "const App" | Select-Object -First 1).LineNumber
if ($line -eq $null) { $line = 1138 }
$content = Get-Content index.html
$head = $content[0..($line-2)]
$clean = Get-Content scratch\clean_components.js
$footer = '        const Input = ({ label, placeholder, type = "text" }) => (<div className="space-y-2"><label className="block text-xs font-black text-slate-500 uppercase tracking-tighter">{label}</label><input type={type} placeholder={placeholder} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all placeholder-slate-400 text-slate-900 font-medium" /></div>); const root = ReactDOM.createRoot(document.getElementById("root")); root.render(<App />); </script> </body> </html>'
$total = $head + $clean + $footer
$total | Set-Content index.html -Encoding utf8
