import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, LayoutDashboard, CheckSquare, FileText, Award, 
  TrendingUp, Calendar, UserCircle, LogOut, Bell, Search, 
  Clock, MapPin, Laptop, Activity, Download, BookOpen, 
  Users, UploadCloud, UserPlus, Image as ImageIcon, Edit3,
  CheckCircle, Trash2, Edit2, Mail, Phone, ChevronRight
} from 'lucide-react';

// --- MOCK DATA ---
const SAMPLE_STUDENT = {
  name: "Aman Sharma",
  id: "BT2021001",
  year: "3rd Year",
  branch: "Computer Science",
  degree: "Bachelor of Technology",
  cgpa: 8.6,
  email: "aman.sharma@sspsit.edu.in",
  phone: "+91 91234 56789",
  parentPhone: "+91 98765 43210",
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
  classTeacher: "Dr. Priya Singh",
  teacherContact: "+91 89654 32109"
};

const SAMPLE_TEACHER = {
  name: "Dr. Priya Singh",
  id: "FAC-CS-042",
  qualification: "Ph.D. in Computer Science",
  position: "Associate Professor",
  designation: "Class Teacher (CSE 3rd Year)",
  email: "priya.singh@sspsit.edu.in",
  phone: "+91 89654 32109",
  subjects: ["Data Structures", "Algorithms", "Database Management"],
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
};

const SUBJECTS = [
  "Data Structures", "Algorithms", "Web Development", 
  "Operating Systems", "Computer Networks", "Database Management"
];

// --- COMPONENTS ---

const CircularProgress = ({ percentage, label, colorClass = "text-emerald-600", size = 120 }) => {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
          <circle
            cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-slate-900">{percentage}%</div>
      </div>
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white border border-emerald-500/10 p-5 rounded-2xl flex items-center space-x-4 shadow-sm">
    <div className={`p-3 rounded-xl ${color} bg-opacity-10 ${color.replace('bg-', 'text-')}`}><Icon size={22} /></div>
    <div>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all font-bold ${active ? 'sidebar-item-active shadow-md' : 'text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'}`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

// --- MAIN APP ---

export default function App() {
  const [role, setRole] = useState(null); // 'student' or 'teacher'
  const [view, setView] = useState('dashboard');
  const [isLogged, setIsLogged] = useState(false);
  const [apiOk, setApiOk] = useState(null); // null | boolean
  const [appLang, setAppLang] = useState('ENG');
  const [sharedDocs, setSharedDocs] = useState([
    { n: "Unit_1_Overview.pdf", u: "Computer Networks", s: "1.2 MB" },
    { n: "Lab_Manual_DS.pdf", u: "Data Structures", s: "2.4 MB" }
  ]);

  const handleLogin = (selectedRole, lang = 'ENG') => {
    setRole(selectedRole);
    setAppLang(lang);
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    setRole(null);
    setView('dashboard');
  };

  if (!isLogged) return <LoginView onLogin={handleLogin} />;

  const user = role === 'student' ? SAMPLE_STUDENT : SAMPLE_TEACHER;

  return (
    <div className="flex h-screen bg-white font-outfit overflow-hidden text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 space-y-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 flex-shrink-0 animate-float drop-shadow-md">
            <img src="/logo.png" alt="ASC College Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-bold text-xl leading-none">SSPSIT <br/><span className="text-xs text-emerald-600 font-black uppercase tracking-tighter">Institute of Tech</span></h1>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-500/10">
          <img src={user.photo} className="w-12 h-12 rounded-full border-2 border-emerald-500/50" alt="profile" />
          <div className="overflow-hidden">
            <p className="font-bold truncate text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{role === 'student' ? user.id : user.position}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
          {role === 'student' ? (
            <>
              <SidebarItem active={view === 'dashboard'} icon={LayoutDashboard} label={appLang === 'MAR' ? 'डॅशबोर्ड' : appLang === 'HIN' ? 'डैशबोर्ड' : 'Dashboard'} onClick={() => setView('dashboard')} />
              <SidebarItem active={view === 'attendance'} icon={CheckSquare} label={appLang === 'MAR' ? 'उपस्थिती' : appLang === 'HIN' ? 'उपस्थिति' : 'Attendance'} onClick={() => setView('attendance')} />
              <SidebarItem active={view === 'documents'} icon={FileText} label={appLang === 'MAR' ? 'कागदपत्रे' : appLang === 'HIN' ? 'दस्तावेज़' : 'Documents'} onClick={() => setView('documents')} />
              <SidebarItem active={view === 'results'} icon={Award} label={appLang === 'MAR' ? 'निकाल' : appLang === 'HIN' ? 'परिणाम' : 'Results'} onClick={() => setView('results')} />
              <SidebarItem active={view === 'progress'} icon={TrendingUp} label={appLang === 'MAR' ? 'प्रगती' : appLang === 'HIN' ? 'प्रगति' : 'Progress'} onClick={() => setView('progress')} />
              <SidebarItem active={view === 'schedule'} icon={Calendar} label={appLang === 'MAR' ? 'वेळापत्रक' : appLang === 'HIN' ? 'समय सारणी' : 'Schedule'} onClick={() => setView('schedule')} />
              <SidebarItem active={view === 'profile'} icon={UserCircle} label={appLang === 'MAR' ? 'आपल्याबद्दल' : appLang === 'HIN' ? 'आपके बारे में' : 'About You'} onClick={() => setView('profile')} />
            </>
          ) : (
            <>
              <SidebarItem active={view === 'dashboard'} icon={LayoutDashboard} label={appLang === 'MAR' ? 'डॅशबोर्ड' : appLang === 'HIN' ? 'डैशबोर्ड' : 'Dashboard'} onClick={() => setView('dashboard')} />
              <SidebarItem active={view === 'takeAttendance'} icon={Users} label={appLang === 'MAR' ? 'उपस्थिती नोंद' : appLang === 'HIN' ? 'उपस्थिति लें' : 'Take Attendance'} onClick={() => setView('takeAttendance')} />
              <SidebarItem active={view === 'upload'} icon={UploadCloud} label={appLang === 'MAR' ? 'साधने अपलोड' : appLang === 'HIN' ? 'संसाधन अपलोड' : 'Upload Files'} onClick={() => setView('upload')} />
              <SidebarItem active={view === 'registration'} icon={UserPlus} label={appLang === 'MAR' ? 'विद्यार्थी नोंदणी' : appLang === 'HIN' ? 'छात्र पंजीकरण' : 'Student Reg'} onClick={() => setView('registration')} />
              <SidebarItem active={view === 'profile'} icon={UserCircle} label={appLang === 'MAR' ? 'आपल्याबद्दल' : appLang === 'HIN' ? 'आपके बारे में' : 'About You'} onClick={() => setView('profile')} />
            </>
          )}
        </nav>

        <button onClick={handleLogout} className="flex items-center space-x-3 text-rose-400 hover:bg-rose-500/10 p-4 rounded-xl transition-all font-medium">
          <LogOut size={20} /><span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-emerald-50/30">
        <header className="h-20 border-b border-slate-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md z-10 shadow-sm">
          <div className="flex items-center space-x-6">
            <div>
              <h2 className="text-2xl font-bold capitalize text-slate-900">{view.replace(/([A-Z])/g, ' $1')}</h2>
              <p className="text-slate-500 text-sm">{appLang === 'MAR' ? 'स्वागत आहे' : appLang === 'HIN' ? 'स्वागत है' : 'Welcome back'}, {user.name.split(' ')[0]}</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['ENG', 'MAR', 'HIN'].map(l => (
                <button key={l} onClick={() => setAppLang(l)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${appLang === l ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-emerald-600'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg border border-slate-100 bg-white">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  apiOk === null ? 'bg-slate-300' : apiOk ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              <span className="text-xs font-bold text-slate-500">
                API: {apiOk === null ? 'Checking' : apiOk ? 'Online' : 'Offline'}
              </span>
            </div>
            <button className="p-2 text-slate-400 hover:text-emerald-600 bg-white border border-slate-100 rounded-lg relative transition-colors">
              <Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-emerald-600 bg-white border border-slate-100 rounded-lg transition-colors"><Search size={20} /></button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-fade-in space-y-8">
            {role === 'student' ? <StudentContent view={view} setView={setView} user={user} appLang={appLang} sharedDocs={sharedDocs} /> : <TeacherContent view={view} setView={setView} user={user} appLang={appLang} sharedDocs={sharedDocs} setSharedDocs={setSharedDocs} />}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- LOGIN VIEW ---

function LoginView({ onLogin }) {
  const [role, setRole] = useState('student');
  const [lang, setLang] = useState('ENG');
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-emerald-900">
      <img src="./college_building.jpg" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 z-0" alt="College Building" />
      <div className="absolute inset-0 bg-slate-900/40 z-0"></div>
      
      <div className="absolute top-6 right-6 z-20 flex space-x-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
        {['ENG', 'MAR', 'HIN'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${lang === l ? 'bg-emerald-600 text-white shadow-lg' : 'text-white hover:bg-white/20'}`}>{l}</button>
        ))}
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-emerald-500/10 w-full max-w-md p-10 rounded-[3rem] shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-28 h-28 flex items-center justify-center mx-auto mb-6 animate-float drop-shadow-2xl">
            <img src="/logo.png" alt="ASC College Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">SSPSIT Portal</h1>
          <p className="text-slate-500 mt-2 font-medium uppercase text-xs tracking-widest font-black">{lang === 'MAR' ? 'संस्थात्मक परिसंस्था' : lang === 'HIN' ? 'संस्थागत पारिस्थितिकी' : 'Institutional Ecosystem'}</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
          {['student', 'teacher'].map(r => (
            <button key={r} onClick={() => setRole(r)} className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${role === r ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-500'}`}>
              {r === 'student' && lang === 'MAR' ? 'विद्यार्थी' : r === 'teacher' && lang === 'MAR' ? 'शिक्षक' : r === 'student' && lang === 'HIN' ? 'छात्र' : r === 'teacher' && lang === 'HIN' ? 'शिक्षक' : r}
            </button>
          ))}
        </div>
        <div className="space-y-5">
          <Input label={lang === 'MAR' ? 'आयडी' : lang === 'HIN' ? 'आईडी' : 'Access ID'} placeholder={role === 'student' ? 'BT2021001' : 'FAC-CS-042'} />
          <Input label={lang === 'MAR' ? 'पासवर्ड' : lang === 'HIN' ? 'पासवर्ड' : 'Key'} type="password" placeholder="••••••••" />
          <button onClick={() => onLogin(role, lang)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-2xl shadow-emerald-600/40 transition-all transform hover:-translate-y-1 mt-6 text-lg uppercase tracking-wider">
            {lang === 'MAR' ? 'लॉगिन' : lang === 'HIN' ? 'लॉगिन' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- PORTAL CONTENT COMPONENTS ---

function StudentContent({ view, setView, user, appLang, sharedDocs }) {
  if (view === 'dashboard') return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CircularProgress percentage={78} label={appLang === 'MAR' ? 'सिद्धांत उपस्थिती' : 'Theory Attendance'} />
        <CircularProgress percentage={85} label={appLang === 'MAR' ? 'प्रात्यक्षिक उपस्थिती' : 'Practical Attendance'} />
        <CircularProgress percentage={81} label={appLang === 'MAR' ? 'एकूण सरासरी' : 'Overall Average'} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard icon={CheckSquare} label={appLang === 'MAR' ? 'उपस्थिती' : 'Attendance'} value="81%" color="bg-emerald-600" />
        <StatCard icon={TrendingUp} label={appLang === 'MAR' ? 'सीजीपीए' : 'Current CGPA'} value="8.6" color="bg-emerald-600" />
        <StatCard icon={FileText} label={appLang === 'MAR' ? 'असाइनमेंट' : 'Assignments'} value="12/14" color="bg-amber-600" />
        <StatCard icon={Calendar} label={appLang === 'MAR' ? 'पुढील परीक्षा' : 'Next Exam'} value="4 Days" color="bg-rose-600" />
      </div>
    </>
  );

  if (view === 'documents') return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{appLang === 'MAR' ? 'कागदपत्रे' : appLang === 'HIN' ? 'दस्तावेज़' : 'Documents Repository'}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sharedDocs.map((doc, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-emerald-500/10 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText size={28} />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">{doc.n}</h4>
            <p className="text-xs text-slate-400 uppercase font-bold">{doc.u} • {doc.s}</p>
            <div className="mt-4 flex justify-end">
              <Download size={18} className="text-emerald-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <div className="text-slate-500 font-bold italic bg-emerald-100/50 p-10 rounded-3xl border border-dashed border-emerald-200">View Module: <span className="text-emerald-700">{view}</span> is ready for deployment.</div>;
}

function TeacherContent({ view, setView, user, appLang, sharedDocs, setSharedDocs }) {
  if (view === 'dashboard') return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Calendar} label={appLang === 'MAR' ? 'एकूण तास' : 'Total Classes'} value="124" color="bg-emerald-600" />
        <StatCard icon={Users} label={appLang === 'MAR' ? 'सक्रिय विद्यार्थी' : 'Active Students'} value="842" color="bg-emerald-600" />
        <StatCard icon={CheckCircle} label={appLang === 'MAR' ? 'सरासरी उपस्थिती' : 'Avg Attendance'} value="84%" color="bg-emerald-600" />
        <StatCard icon={UploadCloud} label={appLang === 'MAR' ? 'फायली' : 'Docs Uploaded'} value={sharedDocs.length} color="bg-amber-600" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div onClick={() => setView('takeAttendance')} className="bg-white border border-emerald-500/10 p-8 rounded-[2.5rem] cursor-pointer hover:bg-emerald-50 transition-all text-center shadow-sm group">
          <div className="bg-emerald-600/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
            <Users size={40} />
          </div>
          <h3 className="font-black text-xl text-slate-900">{appLang === 'MAR' ? 'उपस्थिती घ्या' : 'Take Attendance'}</h3>
          <p className="text-slate-500 text-sm mt-2">Mark daily presence</p>
        </div>
        <div onClick={() => setView('upload')} className="bg-white border border-emerald-500/10 p-8 rounded-[2.5rem] cursor-pointer hover:bg-emerald-50 transition-all text-center shadow-sm group">
          <div className="bg-emerald-600/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
            <UploadCloud size={40} />
          </div>
          <h3 className="font-black text-xl text-slate-900">{appLang === 'MAR' ? 'फायली अपलोड' : 'Upload Files'}</h3>
          <p className="text-slate-500 text-sm mt-2">Share study materials</p>
        </div>
        <div onClick={() => setView('registration')} className="bg-white border border-emerald-500/10 p-8 rounded-[2.5rem] cursor-pointer hover:bg-emerald-50 transition-all text-center shadow-sm group">
          <div className="bg-emerald-600/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
            <UserPlus size={40} />
          </div>
          <h3 className="font-black text-xl text-slate-900">{appLang === 'MAR' ? 'विद्यार्थी नोंदणी' : 'Register Student'}</h3>
          <p className="text-slate-500 text-sm mt-2">Add new enrollment</p>
        </div>
      </div>
    </>
  );

  if (view === 'upload') return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-[3rem] border border-emerald-500/10 shadow-xl space-y-8">
      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{appLang === 'MAR' ? 'साधने अपलोड करा' : 'Upload Academic Resources'}</h3>
      <div className="border-4 border-dashed border-emerald-100 bg-emerald-50/20 h-64 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition-all group">
        <UploadCloud size={48} className="text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
        <p className="font-bold text-slate-600">{appLang === 'MAR' ? 'फाइल निवडा' : 'Select PDF or Document'}</p>
        <p className="text-xs text-slate-400 mt-2">Max Size: 25MB</p>
      </div>
      <button 
        onClick={() => {
          setSharedDocs([...sharedDocs, { n: "New_Syllabus_Update.pdf", u: "Faculty Resource", s: "1.5 MB" }]);
          alert("Document synced to student portal!");
          setView('dashboard');
        }}
        className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-lg hover:bg-emerald-700 transition-all uppercase tracking-widest"
      >
        {appLang === 'MAR' ? 'सर्वांना पाठवा' : 'Broadcast to Students'}
      </button>
    </div>
  );

  return <div className="text-slate-500 font-bold italic bg-emerald-100/50 p-10 rounded-3xl border border-dashed border-emerald-200">Management Module: <span className="text-emerald-700">{view}</span> in progress.</div>;
}

const Input = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="block text-xs font-black text-slate-500 uppercase tracking-tighter">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all placeholder-slate-400 text-slate-900 font-medium" 
    />
  </div>
);
