
        const App = () => {
            const [role, setRole] = useState(null);
            const [view, setView] = useState('dashboard');
            const [isLogged, setIsLogged] = useState(false);
            const [appLang, setAppLang] = useState('ENG');
            const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
            const [sharedDocs, setSharedDocs] = useState([
                {n: "Syllabus_2024.pdf", u: "Admin", s: "2.4 MB"},
                {n: "DS_Unit_1.pdf", u: "Dr. Priya", s: "1.5 MB"}
            ]);
            const [dailyTimetable, setDailyTimetable] = useState([
                {t: "09:00 AM", s: "Data Structures", r: "L204", updated: false},
                {t: "10:00 AM", s: "Algorithms", r: "L205", updated: false},
                {t: "11:00 AM", s: "Operating Systems", r: "Lab 3", updated: false},
                {t: "01:00 PM", s: "Database Mgmt", r: "L301", updated: false},
                {t: "02:00 PM", s: "Software Engineering", r: "L102", updated: false}
            ]);
            const [isSwapAccepted, setIsSwapAccepted] = useState(false);
            const [atRiskStudents] = useState([
                {id: 101, name: "Rahul S.", att: 62, marks: 38},
                {id: 104, name: "Sneha P.", att: 85, marks: 32},
                {id: 107, name: "Amit K.", att: 68, marks: 45}
            ]);

            const handleLogin = (selectedRole, lang) => {
                setRole(selectedRole);
                setAppLang(lang);
                setIsLogged(true);
            };

            const user = role === 'admin' ? {name:"Administrator", role:"admin", photo:"https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} : 
                         role === 'student' ? SAMPLE_STUDENT : SAMPLE_TEACHER;

            if (!isLogged) return <LoginView onLogin={handleLogin} />;

            const sideBarClasses = `md:w-72 bg-white md:border-r border-slate-200 flex flex-col shadow-xl absolute md:relative z-40 h-full w-full md:block transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`;

            return (
                <div className="flex h-screen bg-emerald-50/30 font-outfit overflow-hidden text-slate-900 relative">
                    {role === 'teacher' && (
                        <div className="fixed bottom-24 right-8 z-50 flex flex-col space-y-4 pointer-events-none md:bottom-8">
                            {[
                                {i:'check-square', l:'Att.', v:'takeAttendance', c:'bg-emerald-600'},
                                {i:'alert-triangle', l:'Emerg.', v:'parentMessage', c:'bg-rose-600'},
                                {i:'award', l:'Marks', v:'exam', c:'bg-slate-900'}
                            ].map((b,i)=>(
                                <button key={i} onClick={()=>setView(b.v)} className={`pointer-events-auto w-14 h-14 md:w-16 md:h-16 ${b.c} text-white rounded-full shadow-2xl flex flex-col items-center justify-center backdrop-blur-xl border border-white/20 hover:scale-110 active:scale-95 transition-all animate-bounce shadow-emerald-500/20`} style={{animationDelay: `${i*0.2}s`}}>
                                    <Icon name={b.i} size={18} />
                                    <span className="text-[6px] md:text-[7px] font-black uppercase mt-1">{b.l}</span>
                                </button>
                            ))}
                        </div>
                    )}
                    <aside className={sideBarClasses}>
                        <div className="flex items-center justify-between p-6">
                            <div className="flex items-center space-x-4 px-2">
                                <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-lg flex-shrink-0">
                                    <img src="./logo.png" className="w-full h-full object-contain" alt="Logo" />
                                </div>
                                <h1 className="font-bold text-xl leading-none whitespace-nowrap">SSPSIT <br/><span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-tighter">Institute of Tech</span></h1>
                            </div>
                        </div>
                        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar px-6" onClick={() => setIsMobileMenuOpen(false)}>
                            <SidebarItem active={view === 'dashboard'} icon="layout-dashboard" label={appLang==='MAR'?'डॅशबोर्ड':appLang==='HIN'?'डैशबोर्ड':'Dashboard'} onClick={() => setView('dashboard')} />
                            {role === 'student' && (
                                <>
                                    <SidebarItem active={view === 'attendance'} icon="check-square" label={appLang==='MAR'?'उपस्थिती':appLang==='HIN'?'उपस्थिति':'Attendance'} onClick={() => setView('attendance')} />
                                    <SidebarItem active={view === 'documents'} icon="file-text" label={appLang==='MAR'?'कागदपत्रे':appLang==='HIN'?'दस्तावेज़':'Documents'} onClick={() => setView('documents')} />
                                    <SidebarItem active={view === 'results'} icon="award" label={appLang==='MAR'?'निकाल':appLang==='HIN'?'परिणाम':'Results'} onClick={() => setView('results')} />
                                    <SidebarItem active={view === 'progress'} icon="trending-up" label={appLang==='MAR'?'प्रगती':appLang==='HIN'?'प्रगति':'Progress'} onClick={() => setView('progress')} />
                                    <SidebarItem active={view === 'schedule'} icon="calendar" label={appLang==='MAR'?'वेळापत्रक':appLang==='HIN'?'समय सारणी':'Schedule'} onClick={() => setView('schedule')} />
                                    <SidebarItem active={view === 'contacts'} icon="phone" label={appLang==='MAR'?'कर्मचारी संपर्क':appLang==='HIN'?'कर्मचारी संपर्क':'Staff Contacts'} onClick={() => setView('contacts')} />
                                    <SidebarItem active={view === 'profile'} icon="user-circle" label={appLang==='MAR'?'आपल्याबद्दल':appLang==='HIN'?'आपके बारे में':'About You'} onClick={() => setView('profile')} />
                                </>
                            )}
                            {role === 'teacher' && (
                                <>
                                    <SidebarItem active={view === 'takeAttendance'} icon="check-square" label={appLang==='MAR'?'उपस्थिती':'Take Attendance'} onClick={() => setView('takeAttendance')} />
                                    <SidebarItem active={view === 'registration'} icon="user-plus" label={appLang==='MAR'?'विद्यार्थी नोंदणी':'Register Student'} onClick={() => setView('registration')} />
                                    <SidebarItem active={view === 'upload'} icon="upload-cloud" label={appLang==='MAR'?'साधने अपलोड':'Upload Resources'} onClick={() => setView('upload')} />
                                    <SidebarItem active={view === 'exam'} icon="award" label={appLang==='MAR'?'परीक्षा व्यवस्थापन':'Exam Management'} onClick={() => setView('exam')} />
                                    <SidebarItem active={view === 'planning'} icon="book-open" label={appLang==='MAR'?'अध्यापन योजना':'Teaching Plan'} onClick={() => setView('planning')} />
                                    <SidebarItem active={view === 'schedule'} icon="calendar" label={appLang==='MAR'?'वेळापत्रक':'Weekly Schedule'} onClick={() => setView('schedule')} />
                                    <SidebarItem active={view === 'idGenerator'} icon="credit-card" label={appLang==='MAR'?'ई-आयडी जनरेटर':'Digital ID Tool'} onClick={() => setView('idGenerator')} />
                                    <SidebarItem active={view === 'parentMessage'} icon="megaphone" label={appLang==='MAR'?'पालक संदेश':'Parent Messaging'} onClick={() => setView('parentMessage')} />
                                    <SidebarItem active={view === 'meetings'} icon="video" label={appLang==='MAR'?'मीटिंग हब':'Meeting Hub'} onClick={() => setView('meetings')} />
                                    <SidebarItem active={view === 'syllabus'} icon="book" label={appLang==='MAR'?'अभ्यासक्रम':'DBATU Syllabus'} onClick={() => setView('syllabus')} />
                                    <SidebarItem active={view === 'classManagement'} icon="users" label={appLang==='MAR'?'वर्ग व्यवस्थापन':'Class Hub'} onClick={() => setView('classManagement')} />
                                    <SidebarItem active={view === 'profile'} icon="user-circle" label={appLang==='MAR'?'आपल्याबद्दल':'About You'} onClick={() => setView('profile')} />
                                </>
                            )}
                            {role === 'admin' && (
                                <>
                                    <SidebarItem active={view === 'approvals'} icon="shield-check" label={appLang==='MAR'?'स्टाफ मंजूरी':appLang==='HIN'?'स्टाफ अनुमोदन':'Staff Approvals'} onClick={() => setView('approvals')} />
                                    <SidebarItem active={view === 'departments'} icon="grid" label={appLang==='MAR'?'विभाग हब':appLang==='HIN'?'विभाग हब':'Department Hub'} onClick={() => setView('departments')} />
                                    <SidebarItem active={view === 'dbatu'} icon="book-open" label={appLang==='MAR'?'DBATU मानके':appLang==='HIN'?'DBATU मानक':'DBATU Standards'} onClick={() => setView('dbatu')} />
                                    <SidebarItem active={view === 'meetings'} icon="video" label={appLang==='MAR'?'मीटिंग हब':appLang==='HIN'?'मीटिंग हब':'Meeting Hub'} onClick={() => setView('meetings')} />
                                    <SidebarItem active={view === 'broadcast'} icon="megaphone" label={appLang==='MAR'?'सूचना':appLang==='HIN'?'वैश्विक सूचना':'Global Notice'} onClick={() => setView('broadcast')} />
                                </>
                            )}
                        </nav>
                        <div className="p-6 mt-auto">
                            <button onClick={() => setIsLogged(false)} className="w-full flex items-center justify-center space-x-3 text-rose-500 bg-rose-50 hover:bg-rose-100 p-4 rounded-2xl transition-colors font-black uppercase text-xs tracking-widest shadow-sm">
                                <Icon name="log-out" size={16} /><span>{appLang === 'MAR' ? 'लॉगआउट' : appLang === 'HIN' ? 'लॉगआउट' : 'Logout'}</span>
                            </button>
                        </div>
                    </aside>

                    <main className="flex-1 flex flex-col overflow-hidden bg-transparent">
                        <header className="h-20 border-b border-slate-200 flex items-center justify-between px-6 md:px-8 bg-white/80 backdrop-blur-md z-10 shadow-sm flex-shrink-0">
                            <div className="flex items-center space-x-4">
                                <button className="md:hidden p-3 bg-white border border-slate-200 text-slate-900 rounded-xl shadow-sm" onClick={() => setIsMobileMenuOpen(true)}>
                                    <Icon name="menu" />
                                </button>
                                <h2 className="text-xl md:text-2xl font-black capitalize text-slate-900 leading-none">
                                    {view === 'dashboard' ? (appLang === 'MAR' ? 'डॅशबोर्ड' : appLang === 'HIN' ? 'डैशबोर्ड' : 'Dashboard') : view}
                                </h2>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:flex bg-slate-100 p-1 rounded-xl">
                                    {['ENG', 'MAR', 'HIN'].map(l => (
                                        <button key={l} onClick={()=>setAppLang(l)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${appLang === l ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-emerald-600'}`}>{l}</button>
                                    ))}
                                </div>
                                <div className="px-3 py-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center shadow-sm">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_10px_#10b981]"></span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{role}</span>
                                </div>
                            </div>
                        </header>
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in space-y-6 md:space-y-8 pb-24 md:pb-8">
                            {role === 'student' ? <StudentContent view={view} setView={setView} user={user} sharedDocs={sharedDocs} appLang={appLang} dailyTimetable={dailyTimetable} isSwapAccepted={isSwapAccepted} /> : 
                             role === 'teacher' ? <TeacherContent view={view} setView={setView} user={user} sharedDocs={sharedDocs} setSharedDocs={setSharedDocs} appLang={appLang} dailyTimetable={dailyTimetable} setDailyTimetable={setDailyTimetable} isSwapAccepted={isSwapAccepted} setIsSwapAccepted={setIsSwapAccepted} atRiskStudents={atRiskStudents} /> :
                             <AdminContent view={view} setView={setView} user={user} appLang={appLang} />}
                        </div>
                    </main>
                </div>
            );
        };

        const LoginView = ({ onLogin }) => {
            const [role, setRole] = useState('student');
            const [lang, setLang] = useState('ENG');
            return (
                <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-emerald-900">
                    <img src="./college_building.jpg" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 z-0" alt="College Background" />
                    <div className="absolute inset-0 bg-slate-900/50 z-0 pointer-events-none"></div>
                    <div className="absolute top-6 right-6 z-20 flex space-x-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
                        {['ENG', 'MAR', 'HIN'].map(l => (
                            <button key={l} onClick={()=>setLang(l)} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${lang === l ? 'bg-emerald-600 text-white shadow-lg' : 'text-white hover:bg-white/20'}`}>{l}</button>
                        ))}
                    </div>
                    <div className="bg-white/90 backdrop-blur-xl border border-emerald-500/10 w-full max-w-md p-10 rounded-[3rem] shadow-2xl relative z-10">
                        <div className="text-center mb-8">
                            <div className="w-28 h-28 flex items-center justify-center mx-auto mb-6 drop-shadow-2xl"><img src="./logo.png" className="w-full h-full object-contain" /></div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">SSPSIT Portal</h1>
                            <p className="text-slate-500 mt-2 font-medium uppercase text-xs tracking-widest font-black">{lang === 'MAR' ? 'संस्थात्मक परिसंस्था' : lang === 'HIN' ? 'संस्थागत पारिस्थितिकी' : 'Institutional Ecosystem'}</p>
                        </div>
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
                            {['student', 'teacher', 'admin'].map(r => (
                                <button key={r} onClick={() => setRole(r)} className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${role === r ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-500'}`}>{r === 'student' && lang === 'MAR' ? 'विद्यार्थी' : r === 'teacher' && lang === 'MAR' ? 'शिक्षक' : r === 'admin' && lang === 'MAR' ? 'अॅडमिन' : r === 'student' && lang === 'HIN' ? 'छात्र' : r === 'teacher' && lang === 'HIN' ? 'शिक्षक' : r === 'admin' && lang === 'HIN' ? 'एडमिन' : r}</button>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <input placeholder={lang === 'MAR' ? "आयडी प्रविष्ट करा" : lang === 'HIN' ? "आईडी दर्ज करें" : "Enter ID"} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder-slate-400 font-medium text-slate-900" />
                            <input type="password" placeholder={lang === 'MAR' ? "पासवर्ड प्रविष्ट करा" : lang === 'HIN' ? "पासवर्ड दर्ज करें" : "Enter Password"} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder-slate-400 font-medium text-slate-900" />
                            <button onClick={() => onLogin(role, lang)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-2xl shadow-emerald-600/40 transition-all transform hover:-translate-y-1 mt-4 uppercase tracking-widest text-lg">{lang === 'MAR' ? 'पोर्टल सुरू करा' : lang === 'HIN' ? 'पोर्टल शुरू करें' : 'Initialize Portal'}</button>
                        </div>
                    </div>
                </div>
            );
        };
