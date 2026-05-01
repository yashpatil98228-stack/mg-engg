// Academic Architecture Definition
const AcademicData = {
    years: ["1st Year (FE)", "2nd Year (SE)", "3rd Year (TE)", "4th Year (BE)"],
    branches: [
        { code: "COM", name: "Computer Engineering" },
        { code: "IT", name: "Information Technology" },
        { code: "AI", name: "Artificial Intelligence" },
        { code: "EC", name: "Electronics & Communication" },
        { code: "MECH", name: "Mechanical Engineering" },
        { code: "CIVIL", name: "Civil Engineering" }
    ],
    mapping: {
        "1st Year (FE)": {
            "COM": { semesters: [1, 2], subjects: { 1: ["Engg. Math I", "Physics", "Mechanics"], 2: ["Math II", "Chemistry", "Graphics"] } },
            "IT": { semesters: [1, 2], subjects: { 1: ["Engg. Math I", "Physics", "Mechanics"], 2: ["Math II", "Chemistry", "Graphics"] } }
        },
        "2nd Year (SE)": {
            "IT": { semesters: [3, 4], subjects: { 3: ["Data Structures", "Digital Logic", "Math III"], 4: ["Computer Org", "DBMS", "Software Engg"] } },
            "COM": { semesters: [3, 4], subjects: { 3: ["Discrete Math", "DSGT", "DLDA"], 4: ["Theory of Comp", "OS", "Computer Networks"] } }
        },
        "3rd Year (TE)": {
            "IT": { semesters: [5, 6], subjects: { 5: ["Web Tech", "IP", "Cryptography"], 6: ["Cloud Computing", "BI", "Data Science"] } },
            "AI": { semesters: [5, 6], subjects: { 5: ["ML Basics", "Neural Networks", "NLP"], 6: ["Deep Learning", "Robotics", "AI Ethics"] } }
        }
    }
};

const State = {
    currentUser: JSON.parse(localStorage.getItem('sspsit_session')) || null,
    currentView: 'dashboard',
    settings: {
        attendanceEditLimitDays: 7
    },
    notifications: []
};

// Mock Database
const DB = {
    stats: { 
        students: 2075, 
        teachers: 500, 
        staff: 75,
        revenue: "₹ 5.8 Cr",
        staffPresence: "98%",
        pendingDocs: 24
    },
    notices: [
        { id: 1, message: "Welcome to SSPSIT Digital Portal - Academic Year 2026-27", target: "All", date: "2026-01-01" }
    ],
    
    // Role Assignments [Admin Controlled]
    roleAssignments: {
        classTeachers: { "FCL-001": "IT-2nd Year (SE)-A", "FCL-002": "COM-3rd Year (TE)-B" },
        parentTeachers: { "FCL-001": ["BT2020CS001", "BT2020CS002"] }
    },

    teacherDetails: {
        "FCL-001": {
            name: "Prof. Rahul Verma",
            designation: "Assistant Professor",
            dept: "Information Technology",
            id: "FCL-001",
            assignment: "Class Teacher (IT-2nd Year) | Mentor",
            photo: "https://ui-avatars.com/api/?name=Rahul+Verma&background=2ECC71&color=fff&size=200"
        }
    },

    teacherSchedule: {
        "FCL-001": [
            { time: "09:00 AM", subject: "Data Structures", branch: "IT", year: "2nd Year (SE)", div: "A", room: "CR-101" },
            { time: "10:15 AM", subject: "Object Oriented Programming", branch: "COM", year: "2nd Year (SE)", div: "B", room: "CR-202" },
            { time: "11:30 AM", subject: "Discrete Mathematics", branch: "IT", year: "2nd Year (SE)", div: "A", room: "Lab-01" },
            { time: "01:00 PM", subject: "ML Basics", branch: "AI", year: "3rd Year (TE)", div: "B", room: "CR-304" },
            { time: "02:15 PM", subject: "Software Engineering", branch: "IT", year: "3rd Year (TE)", div: "C", room: "CR-105" },
            { time: "03:30 PM", subject: "Cloud Computing", branch: "IT", year: "4th Year (BE)", div: "A", room: "CR-401" },
            { time: "04:45 PM", subject: "Cyber Security Seminar", branch: "IT", year: "4th Year (BE)", div: "A", room: "Audit-1" }
        ]
    },

    swapRequests: [
        { id: 1, from: "Prof. Patil", subject: "Data Structures", date: "Monday", time: "10:00 AM", status: "pending", type: "take", targetClass: "CS-3A" },
        { id: 2, from: "Dr. Sharma", subject: "Machine Learning", date: "Wednesday", time: "02:00 PM", status: "pending", type: "give", targetClass: "IT-4B" }
    ],

    studentDetails: {
        name: "Rahul Patil",
        id: "BT2020CS045",
        prn: "2020110345",
        seatNo: "S20459",
        branchCode: "IT",
        branchName: "Information Technology",
        year: "2nd Year (SE)",
        semester: 4,
        div: "A",
        dob: "15/08/2004",
        fatherName: "Suresh Patil",
        motherName: "Suntia Patil",
        admissionDate: "20/07/2020",
        address: "Shivaji Nagar, Chopda, Dist: Jalgaon, Pin: 425107",
        photo: "https://ui-avatars.com/api/?name=Rahul+Patil&background=2ECC71&color=fff&size=200&font-size=0.4",
        attendance: [
            { subject: "Data Structures", p: 85, lastMarked: "2026-04-28" },
            { subject: "Digital Logic", p: 72, lastMarked: "2026-04-29" },
            { subject: "Math III", p: 90, lastMarked: "2026-04-30" }
        ],
        results: [
            { subject: "Engg. Math I", internal: 24, external: 65, grade: "A" },
            { subject: "Physics", internal: 18, external: 55, grade: "B" }
        ],
        schedule: [
            { time: "09:00 AM", subject: "Data Structures", room: "CR-101" },
            { time: "10:15 AM", subject: "Digital Logic", room: "CR-102" },
            { time: "11:30 AM", subject: "Math III", room: "Lab-04" }
        ],
        theoryAttendance: 85,
        practicalAttendance: 90,
        overallAttendance: 87
    },
    studentsList: Array.from({ length: 2075 }, (_, i) => {
        const branchObj = AcademicData.branches[i % AcademicData.branches.length];
        const year = AcademicData.years[i % AcademicData.years.length];
        return {
            id: `BT2024${branchObj.code}${(i + 1).toString().padStart(4, '0')}`,
            name: `Student Name ${i + 1}`,
            att: 65 + Math.floor(Math.random() * 30),
            marks: i % 3 === 0 ? 'A' : (i % 3 === 1 ? 'B' : 'C'),
            branch: branchObj.code,
            year: year,
            class: `${branchObj.code}-${year.split(' ')[0]}-A`,
            semester: (AcademicData.years.indexOf(year) * 2) + 1
        };
    }),
    staffList: [
        { id: "FCL-001", name: "Prof. Rahul Verma", category: "Teaching Staff", role: "Assistant Professor", dept: "IT" },
        { id: "FCL-002", name: "Dr. S. Sharma", category: "Teaching Staff", role: "HOD", dept: "Mechanical" },
        { id: "FCL-003", name: "Prof. Amit Patil", category: "Teaching Staff", role: "Sr. Lecturer", dept: "AI" },
        { id: "STF-101", name: "Mr. S. K. Patil", category: "Office/Clerks", role: "Head Clerk", dept: "Admin" },
        { id: "STF-102", name: "Mrs. V. Wani", category: "Office/Clerks", role: "Junior Clerk", dept: "Admin" },
        { id: "STF-103", name: "Mrs. S. J. Deshmukh", category: "Office/Clerks", role: "Accountant", dept: "Finance" },
        { id: "STF-104", name: "Mr. R. D. Borse", category: "Office/Clerks", role: "Scholarship Clerk", dept: "OFFICE" },
        { id: "STF-201", name: "Mr. V. Joshi", category: "Non-Teaching Staff", role: "Lab Assistant", dept: "IT" },
        { id: "STF-202", name: "Mr. R. Gane", category: "Non-Teaching Staff", role: "Peon", dept: "Maintenance" },
        { id: "STF-203", name: "Mr. K. R. Mali", category: "Non-Teaching Staff", role: "Security Head", dept: "Security" },
        { id: "STF-204", name: "Mr. P. S. More", category: "Non-Teaching Staff", role: "Electrician", dept: "Maintenance" },
        { id: "MGT-001", name: "Hon. B. C. Patil", category: "Management", role: "Chairman", dept: "Management" },
        { id: "MGT-002", name: "Hon. D. S. Patil", category: "Management", role: "Secretary", dept: "Trust" }
    ],
    staffTasks: {
        "STF-101": { role: "Office Head Clerk", task: "Handle Scholarship Forms", status: "Task Pending" },
        "STF-103": { role: "Accountant", task: "Finalize Tution Fee Reports", status: "Task Pending" },
        "STF-104": { role: "Scholarship Clerk", task: "Submit MahaDBT Data to University", status: "Task Completed" },
        "STF-201": { role: "Lab Assistant", task: "Verify Hardware Inventory in AI Lab", status: "Task Pending" },
        "STF-203": { role: "Security Head", task: "Monitor Campus CCTV Surveillance", status: "Task Completed" },
        "STF-204": { role: "Electrician", task: "Repair AC Units in Room 304", status: "Task Pending" }
    },
    documentRequests: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        studentId: `BT2026REG${String(i + 1).padStart(4, '0')}`,
        studentName: ["Abhishek Patil", "Sneha Wani", "Rahul More", "Priya Kulkarni", "Amit Sharma", "Neha Deshmukh"][i % 6] + " " + (i + 1),
        type: ["Bonafide Certificate", "Leaving Certificate (LC)", "Transcript", "Fee Structure Proof"][i % 4],
        reason: ["Scholarship Application", "Education Loan", "Passport Verification", "Bus Pass", "Higher Studies", "Internship Admission"][i % 6],
        date: "2026-05-01",
        status: i < 15 ? "Pending" : (i < 30 ? "Processing" : (i < 45 ? "Ready for Collection" : "Collected")),
        branch: ["Computer", "IT", "AI", "Civil", "Mechanical"][i % 5] + " Engineering",
        year: "2026"
    })),
    feeRecords: {
        "BT2020CS045": { total: 85000, paid: 85000, status: "Paid", lastUpdate: "2024-09-15" },
        "BT2020CS046": { total: 85000, paid: 40000, status: "Pending", lastUpdate: "2024-10-10" }
    },
    queries: [
        { id: 1, from: "BT2020CS045", name: "Rahul Patil", role: "student", message: "Regarding scholarship document submission date.", date: "2026-05-01", reply: "", status: "Open" }
    ]
};

// App Initialization
function initApp() {
    renderApp();
}

function renderApp() {
    const root = document.getElementById('app-root');
    if (!State.currentUser) {
        root.innerHTML = getLoginHTML();
        setupLoginListeners();
    } else {
        root.innerHTML = getDashboardLayout();
        setupDashboardListeners();
        renderMainContent();
        checkNewAssignments();
    }
}

function checkNewAssignments() {
    if (State.currentUser.role === 'teacher' && !State.congratsShown) {
        const isClassTeacher = DB.roleAssignments.classTeachers[State.currentUser.id];
        if (isClassTeacher) {
            showModal(`
                <div class="p-4 text-center">
                    <i class="fa-solid fa-gift text-primary fa-bounce" style="font-size:3rem; margin-bottom:20px;"></i>
                    <h2 class="text-dark">Congratulations!</h2>
                    <p class="text-muted mt-2">The Administration has appointed you as the <br><strong>Class Teacher of ${isClassTeacher}</strong>.</p>
                    <p style="font-size:0.85rem; color:var(--primary-green); font-weight:700; margin-top:15px;">A new 'Class Master' panel has been enabled in your dashboard.</p>
                    <button class="primary-btn mt-4 w-100" onclick="closeModal()">Proceed to Dashboard</button>
                </div>
            `);
            State.congratsShown = true;
        }
    }
}

function assignRole(teacherId, roleType, value) {
    if (roleType === 'class') {
        DB.roleAssignments.classTeachers[teacherId] = value;
        // Auto-update teacher details for profile sync
        if (DB.teacherDetails[teacherId]) {
            DB.teacherDetails[teacherId].assignment = `Class Teacher (${value}) | Senior Faculty`;
        }
        showToast(`Congratulations! Post officially assigned to ${teacherId}.`);
    } else if (roleType === 'parent') {
        DB.roleAssignments.parentTeachers[teacherId] = value; // assuming value is array of student IDs
        if (DB.teacherDetails[teacherId]) {
            DB.teacherDetails[teacherId].assignment += ` | Parent Teacher Mentor`;
        }
    }
    renderApp(); // Refresh UI to reflect changes if admin is viewing
}

function assignStaffTask(staffId, role, task) {
    DB.staffTasks[staffId] = {
        role: role,
        task: task,
        status: "Task Pending"
    };
    
    // Update staffList role for directory sync
    const staff = DB.staffList.find(s => s.id === staffId);
    if (staff) staff.role = role;
    
    showToast(`Success! Role and Task assigned to ${staffId}`);
    renderApp();
}

function postNotice(message, target) {
    const id = DB.notices.length + 1;
    DB.notices.push({
        id: id,
        message: message,
        target: target,
        date: new Date().toLocaleDateString()
    });
    showToast(`Notice broadcasted to ${target}!`);
    renderApp();
}

function updateTaskStatus(staffId, status) {
    if (DB.staffTasks[staffId]) {
        DB.staffTasks[staffId].status = status;
        showToast(`Status updated to ${status}`);
        renderApp();
    }
}

function removeStaffTask(staffId) {
    delete DB.staffTasks[staffId];
    showToast(`Task/Role removed for ${staffId}`);
    renderApp();
}

function registerStaff(data) {
    // Add to staffList for directory
    DB.staffList.push({
        id: data.id,
        name: data.name,
        category: data.category,
        role: data.category === 'Teaching Staff' ? 'Faculty' : data.category,
        dept: data.dept,
        photo: data.photo
    });
    
    // Add to teacherDetails for login/profile sync
    DB.teacherDetails[data.id] = {
        name: data.name,
        designation: data.category === 'Teaching Staff' ? 'Faculty Member' : data.category,
        dept: data.dept,
        id: data.id,
        assignment: "New Appointee",
        photo: data.photo
    };
    
    showToast(`Staff Member ${data.name} Registered Successfully!`);
    renderApp();
}

function getUserPhoto() {
    if (!State.currentUser) return 'logo.png';
    const id = State.currentUser.id;
    if (State.currentUser.role === 'teacher' || State.currentUser.role === 'admin') {
        return (DB.teacherDetails[id] || {}).photo || `https://ui-avatars.com/api/?name=${id}&background=2ECC71&color=fff`;
    } else {
        return DB.studentDetails.photo;
    }
}

function getUserName() {
    if (!State.currentUser) return 'Guest';
    const id = State.currentUser.id;
    if (State.currentUser.role === 'teacher' || State.currentUser.role === 'admin') {
        return (DB.teacherDetails[id] || {}).name || id;
    } else {
        return DB.studentDetails.name;
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2ECC71;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 9999;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `;
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- LOGIN MODULE ---
function getLoginHTML() {
    return `
        <div class="login-wrapper">
            <div class="login-card glass-panel floating">
                <div class="login-logo-container entry-animation-logo">
                    <img src="logo.png" alt="SSPSIT Logo" class="login-logo-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/100?text=Logo';">
                </div>
                <h2 class="mb-1 text-center text-primary entry-animation-text" style="font-size: 1.5rem;">SSPSIT PORTAL</h2>
                <p class="mb-4 text-muted entry-animation-subtext" style="letter-spacing:1px; font-size:0.85rem; font-weight: 500;">Smt. Sharadchandrika Suresh Patil Institute of Technology, Chopda</p>
                
                <form id="login-form" class="entry-animation-form">
                    <div class="form-group mb-3">
                        <label>Select Role</label>
                        <div class="form-icon-group">
                            <i class="fa-solid fa-user-shield input-icon"></i>
                            <select id="role-select" class="form-control">
                                <option value="student">Student Portal</option>
                                <option value="teacher">Faculty Axis</option>
                                <option value="admin">Admin Master</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Identification Number</label>
                        <div class="form-icon-group">
                            <i class="fa-solid fa-id-card input-icon"></i>
                            <input type="text" id="login-id" class="form-control" placeholder="Enter ID" required>
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <label>Security Key</label>
                        <div class="form-icon-group">
                            <i class="fa-solid fa-lock input-icon"></i>
                            <input type="password" id="login-pass" class="form-control" placeholder="Enter Password" required>
                        </div>
                        <div style="text-align: right; margin-top: 8px;">
                            <a href="#" onclick="showForgotPasswordModal()" style="color: var(--primary-green); font-size: 0.8rem; text-decoration: none; font-weight: 700; transition: 0.3s;">Forgot Password?</a>
                        </div>
                    </div>
                    <button type="submit" class="primary-btn w-100">Login to Dashboard</button>
                </form>
            </div>
        </div>
    `;
}

function setupLoginListeners() {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.getElementById('role-select').value;
        const id = document.getElementById('login-id').value;
        const pass = document.getElementById('login-pass').value;
        
        // Strict Role-Based Detection
        let userMatch = null;
        if (role === 'admin' && id.toUpperCase() === 'ADMIN01') userMatch = { role: 'admin', id: id };
        else if (role === 'teacher') {
            // Check if it's a Teacher or a Clerk (Integrated login)
            if (DB.teacherDetails[id]) userMatch = { role: 'teacher', id: id };
            else if (id === 'STF-101' || id === 'STF-102') userMatch = { role: 'clerk', id: id };
        }
        else if (role === 'student' && id.toUpperCase() === 'BT2020CS045') userMatch = { role: 'student', id: id };

        if (userMatch) {
            State.currentUser = userMatch;
            State.currentView = 'dashboard';
            localStorage.setItem('sspsit_session', JSON.stringify(userMatch));
            renderApp();
        } else {
            alert('ACCESS DENIED: Invalid Credentials or Unauthorized Role Selection.');
        }
    });
}

function showForgotPasswordModal() {
    showModal(`
        <div class="p-4" id="recovery-container" style="max-width:400px;">
            <h3 class="text-primary mb-3"><i class="fa-solid fa-key"></i> Recovery Center</h3>
            <p class="text-muted mb-4" style="font-size:0.9rem;">Access the institutional credential recovery system via SMS verification.</p>
            <div class="form-group mb-4">
                <label>Registered Mobile Number</label>
                <div class="form-icon-group">
                    <i class="fa-solid fa-phone-volume input-icon"></i>
                    <input type="tel" id="recovery-phone" class="form-control" placeholder="Enter 10-digit number" maxlength="10">
                </div>
            </div>
            <div class="flex gap-2">
                <button class="primary-btn w-100" onclick="handleCredentialRecovery()">
                    <i class="fa-solid fa-paper-plane"></i> Verify & Send
                </button>
                <button class="primary-btn danger w-100" style="padding:10px;" onclick="closeModal()">Back</button>
            </div>
        </div>
    `);
}

window.handleCredentialRecovery = () => {
    const phone = document.getElementById('recovery-phone').value;
    if (phone.length < 10) return alert('Please enter a valid 10-digit mobile number');

    const container = document.getElementById('recovery-container');
    container.innerHTML = `
        <div class="text-center p-4" style="padding: 60px 20px;">
            <div style="width: 50px; height: 50px; border: 5px solid rgba(46, 204, 113, 0.2); border-top: 5px solid var(--primary-green); border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
            <h4 class="text-primary">Sending SMS...</h4>
            <p class="text-muted mt-2" style="font-size:0.85rem;">Communicating with SSPSIT Secure Database</p>
        </div>
    `;

    setTimeout(() => {
        container.innerHTML = `
            <div class="text-center p-4">
                <div style="width:70px; height:70px; background:rgba(46, 204, 113, 0.1); color:var(--primary-green); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; font-size:2rem;">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <h3 class="text-dark">SMS Triggered!</h3>
                <p class="text-muted mt-3" style="font-size:0.9rem;">Your Login Credentials (ID & Password) have been sent to your registered mobile number: <strong>[XXXXX-XX${phone.slice(-3)}]</strong>.</p>
                <p class="text-muted mt-2" style="font-size:0.8rem;">Please check your SMS inbox and login again.</p>
                <button class="primary-btn mt-4 w-100" onclick="closeModal()">Return to Login</button>
            </div>
        `;
    }, 2500);
};

// --- DASHBOARD LAYOUT ---
function getDashboardLayout() {
    return `
        <div class="dashboard-layout">
            <aside class="sidebar glass-panel" id="sidebar">
                <div class="sidebar-header" style="text-align: center; padding: 20px 10px;">
                    <div style="width: 80px; height: 80px; margin: 0 auto 15px; border-radius: 50%; border: 3px solid var(--primary-green); padding: 3px; background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <img src="${getUserPhoto()}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" onerror="this.src='https://via.placeholder.com/80?text=User';">
                    </div>
                    <h2 class="text-dark" style="font-size: 1.1rem; font-weight: 800; margin-bottom: 2px;">${getUserName()}</h2>
                    <p style="font-size: 0.7rem; color: var(--primary-green); font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">${State.currentUser.role} PORTAL</p>
                </div>
                <ul class="nav-menu" id="nav-menu">
                    ${getNavItems()}
                </ul>
                <div style="padding:20px; margin-top:auto; border-top: 1px solid var(--border-soft);">
                    <div class="mb-3">
                        <a class="nav-link ${State.currentView === 'profile' ? 'active' : ''}" data-view="profile" style="background: var(--primary-green) !important; color: white !important; border-radius: 8px; justify-content: center;">
                            <i class="fa-solid fa-user-circle"></i> ABOUT YOU
                        </a>
                    </div>
                    <button id="logout-btn" class="primary-btn danger w-100 mb-3" style="font-size:0.9rem;"><i class="fa-solid fa-power-off"></i> Logout</button>
                    <div style="text-align: center; border-top: 1px solid var(--border-soft); padding-top: 15px;">
                        <p style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Powered by</p>
                        <strong style="font-size: 0.9rem; color: var(--primary-green); letter-spacing: 1px;">CACTOSOFT</strong>
                    </div>
                </div>
            </aside>
            <main class="main-content">
                <header class="topbar">
                    <div class="flex align-center gap-3">
                        <button class="mobile-toggle" id="mobile-toggle"><i class="fa-solid fa-bars"></i></button>
                        <div class="college-brand">
                            <span style="font-size: 1.2rem; color: var(--text-dark); font-weight: 800; line-height: 1.1;">Smt. Sharadchandrika Suresh Patil Institute of Technology, Chopda</span>
                        </div>
                    </div>
                    <div class="flex align-center gap-4">
                        ${State.currentUser.role === 'teacher' ? `
                            <div class="hidden-mobile" style="text-align: right; border-left: 1px solid var(--border-soft); padding-left: 15px;">
                                <div class="text-dark" style="font-weight: 800; font-size: 1.1rem;">${(DB.teacherDetails[State.currentUser.id] || {}).name || State.currentUser.id}</div>
                                <div class="text-muted" style="font-size: 0.85rem; font-weight: 600;">ID: ${State.currentUser.id} | <span class="text-primary">${(DB.teacherDetails[State.currentUser.id] || {}).assignment || 'Faculty'}</span></div>
                            </div>
                        ` : ''}
                        <div class="user-info" style="cursor: pointer;" onclick="State.currentView='profile'; renderApp();">
                            <div class="avatar" style="box-shadow: 0 4px 10px rgba(46, 204, 113, 0.2);">
                                <img src="${getUserPhoto()}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                    </div>
                </header>
                <div class="mb-4">
                    <h2 class="text-dark" style="text-transform:capitalize; font-size: 1.8rem; font-weight: 700;" id="page-title">${State.currentView.replace('-', ' ')}</h2>
                </div>
                ${getNoticeMarquee()}
                <div id="main-view" class="view-container"></div>
            </main>
        </div>
    `;
}

function getNoticeMarquee() {
    const role = State.currentUser.role;
    const activeNotices = DB.notices.filter(n => n.target === 'All' || n.target.toLowerCase().includes(role));
    
    if (activeNotices.length === 0) return '';
    
    return `
        <div style="background: var(--bg-white); border-bottom: 1px solid var(--border-soft); padding: 10px 0; overflow: hidden; position: relative;">
            <div style="display: flex; align-items: center;">
                <div style="background: #E74C3C; color: white; padding: 5px 15px; font-weight: 800; font-size: 0.75rem; z-index: 10; box-shadow: 5px 0 10px rgba(0,0,0,0.1); white-space: nowrap;">LATEST NOTICES</div>
                <marquee scrollamount="5" style="font-weight: 600; color: var(--text-dark); font-size: 0.9rem;">
                    ${activeNotices.map(n => `<span style="margin-right: 50px;"><i class="fa-solid fa-bullhorn text-primary"></i> ${n.message} [${n.date}]</span>`).join('')}
                </marquee>
            </div>
        </div>
    `;
}

function getNavItems() {
    const role = State.currentUser.role;
    let items = [];
    if (role === 'admin') {
        items = [
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'Analytics' },
            { id: 'users', icon: 'fa-users', label: 'User Mgmt' },
            { id: 'user-access', icon: 'fa-user-lock', label: 'User Access' },
            { id: 'broadcaster', icon: 'fa-bullhorn', label: 'Broadcaster' },
            { id: 'academic-control', icon: 'fa-graduation-cap', label: 'Academic Control' },
            { id: 'staff-performance', icon: 'fa-chart-line', label: 'Staff Performance' },
            { id: 'register-staff', icon: 'fa-user-tie', label: 'Register Staff' },
            { id: 'staff-master', icon: 'fa-people-roof', label: 'Staff Master' },
            { id: 'roles', icon: 'fa-user-shield', label: 'Role Assigner' },
            { id: 'settings', icon: 'fa-gears', label: 'System Settings' },
            { id: 'meetings', icon: 'fa-handshake', label: 'Meeting Hub' },
            { id: 'admin-queries', icon: 'fa-comment-dots', label: 'User Queries' },
            { id: 'profile', icon: 'fa-user-circle', label: 'About You' }
        ];
    } else if (role === 'clerk') {
        items = [
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'Office Overview' },
            { id: 'certificate-hub', icon: 'fa-file-shield', label: 'Certificate Hub' },
            { id: 'fee-tracker', icon: 'fa-money-bill-transfer', label: 'Fee Tracker' },
            { id: 'exam-desk', icon: 'fa-pen-to-square', label: 'Exam Desk' },
            { id: 'scholarship-desk', icon: 'fa-hand-holding-dollar', label: 'Scholarship Desk' },
            { id: 'help-queries', icon: 'fa-circle-question', label: 'Send Query' },
            { id: 'profile', icon: 'fa-user-circle', label: 'About You' }
        ];
    } else if (role === 'teacher') {
        const isClassTeacher = DB.roleAssignments.classTeachers[State.currentUser.id];
        const isParentTeacher = DB.roleAssignments.parentTeachers[State.currentUser.id];
        items = [
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'Overview' },
            { id: 'countdown', icon: 'fa-stopwatch-20', label: 'Exam Countdown' },
            { id: 'attendance', icon: 'fa-clipboard-user', label: 'Smart Attendance' },
            { id: 'results', icon: 'fa-file-signature', label: 'Results Mgmt' },
            { id: 'weekly-schedule', icon: 'fa-calendar-week', label: 'Weekly Timetable' },
            { id: 'uploads', icon: 'fa-cloud-arrow-up', label: 'Upload Engine' },
            { id: 'swap', icon: 'fa-right-left', label: 'Lecture Swap' },
            { id: 'at-risk', icon: 'fa-triangle-exclamation', label: 'At-Risk Analysis' },
            (isClassTeacher || isParentTeacher) ? { id: 'register-student', icon: 'fa-user-plus', label: 'Register Student' } : null,
            { id: 'help-queries', icon: 'fa-circle-question', label: 'Send Query' },
            { id: 'profile', icon: 'fa-address-card', label: 'About You' }
        ].filter(Boolean);
    } else {
        items = [
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'My Progress' },
            { id: 'attendance', icon: 'fa-user-check', label: 'Attendance Log' },
            { id: 'countdown', icon: 'fa-stopwatch', label: 'Exam Countdown' },
            { id: 'schedule', icon: 'fa-calendar-days', label: 'Daily Schedule' },
            { id: 'library', icon: 'fa-book-open', label: 'Digital Library' },
            { id: 'results', icon: 'fa-graduation-cap', label: 'Result Portal' },
            { id: 'idcard', icon: 'fa-id-badge', label: 'E-ID Card' },
            { id: 'contacts', icon: 'fa-address-book', label: 'Faculty Contacts' },
            { id: 'documents', icon: 'fa-file-invoice', label: 'Document Desk' },
            { id: 'fees', icon: 'fa-indian-rupee-sign', label: 'Fee Structure' },
            { id: 'help-queries', icon: 'fa-circle-question', label: 'Send Query' },
            { id: 'profile', icon: 'fa-user-circle', label: 'About You', isSpecial: true }
        ];
    }
    
    return items.map(item => `
        <li class="nav-item">
            <a class="nav-link ${State.currentView === item.id ? 'active' : ''} ${item.isSpecial ? 'special-nav' : ''}" data-view="${item.id}">
                <i class="fa-solid ${item.icon}"></i> ${item.label}
            </a>
        </li>
    `).join('');
}

function setupDashboardListeners() {
    document.getElementById('logout-btn').addEventListener('click', () => {
        State.currentUser = null;
        renderApp();
    });

    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    if(mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
            State.currentView = e.currentTarget.getAttribute('data-view');
            document.getElementById('page-title').innerText = State.currentView.replace('-', ' ');
            renderMainContent();
            if(window.innerWidth <= 1024) sidebar.classList.remove('active');
        });
    });
}

// --- CONTENT RENDERING ---
function renderMainContent() {
    const container = document.getElementById('main-view');
    const role = State.currentUser.role;
    const view = State.currentView;

    let html = '';

    // Admin Views
    if (role === 'admin') {
        if (view === 'dashboard') {
            html = `
                <!-- Admin Insight Cards -->
                <div class="grid-4 mb-4" style="gap: 20px;">
                    <div class="glass-panel stat-card floating" style="animation-delay: 0s; border-bottom: 4px solid #F1C40F !important;">
                        <div class="stat-info">
                            <p class="text-muted" style="font-weight:700; font-size:0.75rem; text-transform:uppercase;">Total College Strength</p>
                            <h3 style="color: #F1C40F;">2,075</h3>
                            <div style="width:100%; height:4px; background:#eee; border-radius:2px; margin-top:8px;"><div style="width:100%; height:100%; background:#F1C40F; border-radius:2px;"></div></div>
                        </div>
                        <div class="stat-icon" style="background: rgba(241, 196, 15, 0.1); color: #F1C40F;"><i class="fa-solid fa-users-viewfinder"></i></div>
                    </div>
                    <div class="glass-panel stat-card floating" style="animation-delay: 0.1s; border-bottom: 4px solid var(--primary-green) !important;">
                        <div class="stat-info">
                            <p class="text-muted" style="font-weight:700; font-size:0.75rem; text-transform:uppercase;">Overall Attendance</p>
                            <h3 class="text-primary">94.2%</h3>
                            <div style="width:100%; height:4px; background:#eee; border-radius:2px; margin-top:8px;"><div style="width:94%; height:100%; background:var(--primary-green); border-radius:2px;"></div></div>
                        </div>
                        <div class="stat-icon"><i class="fa-solid fa-calendar-check"></i></div>
                    </div>
                    <div class="glass-panel stat-card floating" style="animation-delay: 0.2s; border-bottom: 4px solid #3498DB !important;">
                        <div class="stat-info">
                            <p class="text-muted" style="font-weight:700; font-size:0.75rem; text-transform:uppercase;">Faculty Swap Requests</p>
                            <h3 style="color: #3498DB;">12 Pending</h3>
                            <div style="width:100%; height:4px; background:#eee; border-radius:2px; margin-top:8px;"><div style="width:40%; height:100%; background:#3498DB; border-radius:2px;"></div></div>
                        </div>
                        <div class="stat-icon" style="background: rgba(52, 152, 219, 0.1); color: #3498DB;"><i class="fa-solid fa-shuffle"></i></div>
                    </div>
                    <div class="glass-panel stat-card floating" style="animation-delay: 0.3s; border-bottom: 4px solid #E74C3C !important;">
                        <div class="stat-info">
                            <p class="text-muted" style="font-weight:700; font-size:0.75rem; text-transform:uppercase;">Office Tasks Status</p>
                            <h3 style="color: #E74C3C;">85% Done</h3>
                            <div style="width:100%; height:4px; background:#eee; border-radius:2px; margin-top:8px;"><div style="width:85%; height:100%; background:#E74C3C; border-radius:2px;"></div></div>
                        </div>
                        <div class="stat-icon" style="background: rgba(231, 76, 60, 0.1); color: #E74C3C;"><i class="fa-solid fa-list-check"></i></div>
                    </div>
                </div>

                <!-- Admin Quick Master Actions -->
                <div class="mb-4">
                    <h4 class="text-dark mb-3"><i class="fa-solid fa-bolt-lightning text-warning"></i> Institutional Quick Actions</h4>
                    <div class="grid-4" style="gap: 15px;">
                        <button class="glass-panel p-3 text-center action-btn" onclick="showModal('<div class=\\'p-4 text-center\\'><h3>EMERGENCY BROADCAST</h3><p>Sending critical alert to 2000+ devices...</p><button class=\\'primary-btn mt-3\\' onclick=\\'closeModal()\\'>Initiate</button></div>')" style="border:1px solid rgba(231, 76, 60, 0.3) !important;">
                            <i class="fa-solid fa-tower-broadcast text-danger mb-2" style="font-size:1.5rem;"></i>
                            <div style="font-size:0.8rem; font-weight:800;">Emergency Broadcast</div>
                        </button>
                        <button class="glass-panel p-3 text-center action-btn" onclick="alert('Generating Comprehensive Academic Audit...')" style="border:1px solid rgba(52, 152, 219, 0.3) !important;">
                            <i class="fa-solid fa-file-shield text-blue mb-2" style="font-size:1.5rem;"></i>
                            <div style="font-size:0.8rem; font-weight:800;">Academic Audit</div>
                        </button>
                        <button class="glass-panel p-3 text-center action-btn" onclick="alert('Synchronizing 500 Faculty Attendance Records...')" style="border:1px solid rgba(46, 204, 113, 0.3) !important;">
                            <i class="fa-solid fa-user-clock text-primary mb-2" style="font-size:1.5rem;"></i>
                            <div style="font-size:0.8rem; font-weight:800;">Staff Bio-Sync</div>
                        </button>
                        <button class="glass-panel p-3 text-center action-btn" onclick="alert('Initiating Cloud Backup for Institutional Data...')" style="border:1px solid rgba(155, 89, 182, 0.3) !important;">
                            <i class="fa-solid fa-cloud-arrow-up text-purple mb-2" style="font-size:1.5rem;"></i>
                            <div style="font-size:0.8rem; font-weight:800;">Cloud Backup</div>
                        </button>
                    </div>
                </div>

                <div class="grid-2 mb-4" style="gap: 25px;">
                    <!-- Universal Notice Board Tool -->
                    <div class="glass-panel p-4">
                        <h4 class="text-dark mb-3"><i class="fa-solid fa-bullhorn text-primary"></i> Broadcast Universal Notice</h4>
                        <div class="form-group">
                            <label>Notice Message</label>
                            <textarea class="form-control" id="notice-msg" rows="3" placeholder="Type your announcement here..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Target Audience</label>
                            <select class="form-control" id="notice-target">
                                <option value="All">All Users</option>
                                <option value="Student">Students Only</option>
                                <option value="Teacher">Faculty & Staff Only</option>
                            </select>
                        </div>
                        <button class="primary-btn w-100" onclick="handleNoticePost()">
                            <i class="fa-solid fa-paper-plane"></i> Broadcast Notice
                        </button>
                    </div>

                    <!-- Academic Analytics Visualization -->
                    <div class="glass-panel p-4">
                        <h4 class="text-dark mb-4"><i class="fa-solid fa-chart-column text-primary"></i> Result Analysis (Branch-wise)</h4>
                        <div style="height: 200px; display: flex; align-items: flex-end; justify-content: space-between; padding: 10px; border-bottom: 2px solid var(--border-soft);">
                            ${AcademicData.branches.map((b, i) => `
                                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                                    <div style="width: 30px; background: var(--primary-green); height: ${60 + (i * 8)}%; border-radius: 4px 4px 0 0; position: relative;">
                                        <span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; font-weight: 800;">${60 + (i * 8)}%</span>
                                    </div>
                                    <span style="font-size: 0.65rem; font-weight: 700;">${b.code}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="text-center mt-3">
                            <span class="text-muted" style="font-size: 0.8rem;"><i class="fa-solid fa-circle-info"></i> Data reflects average passing % for Semester I</span>
                        </div>
                    </div>
                </div>

                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-list-check text-primary"></i> Live Institutional Feed</h3>
                        <span class="badge badge-green" style="animation: pulse 2s infinite;"><i class="fa-solid fa-circle"></i> SYSTEM LIVE</span>
                    </div>
                    <div class="table-container" style="max-height: 250px; overflow-y: auto;">
                        <table>
                            <thead>
                                <tr><th>Timestamp</th><th>Initiator</th><th>Activity Description</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Just Now</td><td><strong>ADM-MASTER</strong></td><td>Broadcasted Notice to 1,500 Students</td><td><span class="badge badge-green">Sent</span></td></tr>
                                <tr><td>5 Mins ago</td><td><strong>FCL-045</strong></td><td>Uploaded Results for IT-Branch (Sem III)</td><td><span class="badge badge-blue">Processing</span></td></tr>
                                <tr><td>12 Mins ago</td><td><strong>STF-104</strong></td><td>Completed Task: MahaDBT Submission</td><td><span class="badge badge-green">Verified</span></td></tr>
                                <tr><td>45 Mins ago</td><td><strong>SYS-BOT</strong></td><td>Auto-Generated Weekly Revenue Audit</td><td><span class="badge badge-green">Success</span></td></tr>
                                <tr><td>1 Hour ago</td><td><strong>FCL-112</strong></td><td>Attendance Conflict Resolved (Mech Dept)</td><td><span class="badge badge-blue">Logged</span></td></tr>
                                <tr><td>2 Hours ago</td><td><strong>STU-892</strong></td><td>Document Request: Transcript (Pending)</td><td><span class="badge badge-red">Urgent</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-center mt-3">
                        <button class="primary-btn" style="padding:6px 12px; font-size:0.8rem;" onclick="alert('Accessing Full System Audit Logs...')">View Full Audit Log</button>
                    </div>
                </div>
            `;
        } else if (view === 'users') {
            html = `
                <div class="grid-3 mb-4">
                    <div class="glass-panel stat-card floating" style="animation-delay: 0s;">
                        <div class="stat-info">
                            <p class="text-muted" style="font-weight:700; font-size:0.75rem; text-transform:uppercase;">Total Registered Users</p>
                            <h3>2,075</h3>
                            <div style="width:100%; height:4px; background:#eee; border-radius:2px; margin-top:8px;"><div style="width:100%; height:100%; background:var(--primary-green); border-radius:2px;"></div></div>
                        </div>
                        <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
                    </div>
                    <div class="glass-panel stat-card floating" style="animation-delay: 0.1s;">
                        <div class="stat-info">
                            <p class="text-muted" style="font-weight:700; font-size:0.75rem; text-transform:uppercase;">Active Students</p>
                            <h3 class="text-primary">1,500</h3>
                            <div style="width:100%; height:4px; background:#eee; border-radius:2px; margin-top:8px;"><div style="width:75%; height:100%; background:var(--primary-green); border-radius:2px;"></div></div>
                        </div>
                        <div class="stat-icon"><i class="fa-solid fa-user-graduate"></i></div>
                    </div>
                    <div class="glass-panel stat-card floating" style="animation-delay: 0.2s;">
                        <div class="stat-info">
                            <p class="text-muted" style="font-weight:700; font-size:0.75rem; text-transform:uppercase;">Faculty & Support Staff</p>
                            <h3 style="color:var(--secondary-blue);">575</h3>
                            <div style="width:100%; height:4px; background:#eee; border-radius:2px; margin-top:8px;"><div style="width:28%; height:100%; background:var(--secondary-blue); border-radius:2px;"></div></div>
                        </div>
                        <div class="stat-icon" style="background: rgba(52, 152, 219, 0.1); color: var(--secondary-blue);"><i class="fa-solid fa-chalkboard-user"></i></div>
                    </div>
                </div>

                <div class="glass-panel p-4">
                    <div class="flex justify-between mb-4 align-center">
                        <div>
                            <h3 class="text-dark"><i class="fa-solid fa-address-book text-primary"></i> Global User Directory</h3>
                            <p class="text-muted">Managing credentials for all <strong>2,075</strong> members (500 Faculty, 1500 Students, 75 Staff).</p>
                        </div>
                        <div class="flex gap-2">
                            <div class="form-icon-group" style="width:350px;">
                                <i class="fa-solid fa-magnifying-glass input-icon"></i>
                                <input type="text" class="form-control" placeholder="Search by ID, Name or Department...">
                            </div>
                            <button class="primary-btn"><i class="fa-solid fa-file-csv"></i> Bulk Export</button>
                        </div>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr><th>User ID</th><th>Full Name</th><th>Role</th><th>Dept/Branch</th><th>Access</th><th>Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                ${[...Array(8)].map((_, i) => {
                                    const isFaculty = i < 4;
                                    const names = isFaculty ? ["Dr. Amit Patil", "Prof. Sunita Wani", "Mr. R. K. More", "Dr. V. J. Pawar"] : ["Rahul Patil", "Snehal Deshmukh", "Vikas More", "Priya Wani"];
                                    return `
                                        <tr>
                                            <td><strong class="text-dark">${isFaculty ? 'FCL-50' + i : 'STU-150' + i}</strong></td>
                                            <td>${isFaculty ? names[i] : names[i-4] || names[i]}</td>
                                            <td><span class="badge ${isFaculty ? 'badge-blue' : 'badge-green'}">${isFaculty ? 'Faculty' : 'Student'}</span></td>
                                            <td>${isFaculty ? 'COM / IT' : 'Third Year AI'}</td>
                                            <td><strong>${isFaculty ? 'Full access' : 'Standard'}</strong></td>
                                            <td><span class="badge badge-green">Active</span></td>
                                            <td><button class="badge badge-blue" onclick="alert('Accessing Security Protocol for User ID...')"><i class="fa-solid fa-user-gear"></i></button></td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-between align-center mt-4 p-3" style="background:rgba(46, 204, 113, 0.05); border-radius:10px; border:1px solid var(--border-soft);">
                        <p class="text-muted" style="font-size:0.85rem; font-weight:700;">Showing 8 out of 2,075 total members</p>
                        <div class="flex gap-2">
                            <button class="badge" disabled>Prev</button>
                            <button class="badge badge-green">1</button>
                            <button class="badge">2</button>
                            <button class="badge">3</button>
                            <span>...</span>
                            <button class="badge">260</button>
                            <button class="badge badge-blue">Next</button>
                        </div>
                    </div>
                </div>
            `;
        } else if (view === 'meetings') {
            html = `
                <div class="glass-panel p-4" style="max-width:600px; margin:0 auto;">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-video text-primary"></i> Schedule Meeting (Hub)</h3>
                    <form id="meeting-form">
                        <div class="form-group">
                            <label>Meeting Type</label>
                            <select class="form-control"><option>Faculty Meeting</option><option>Parent-Teacher Meet</option><option>HOD Council</option></select>
                        </div>
                        <div class="form-group">
                            <label>Date & Time</label>
                            <input type="datetime-local" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Agenda</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <button type="submit" class="primary-btn w-100" style="margin-top:10px;" onclick="event.preventDefault(); alert('Meeting Scheduled! Notification Triggers Activated.');">Send Invites & Schedule</button>
                    </form>
                </div>
            `;
        } else if (view === 'operations') {
            html = `
                <div class="glass-panel p-4 mb-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-users-gear text-primary"></i> Non-Teaching & Support Staff Hub</h3>
                        <button class="primary-btn"><i class="fa-solid fa-plus"></i> Add New Staff</button>
                    </div>
                    <p class="text-muted mb-4" style="font-weight: 600; font-size: 0.9rem;">Duty Allocation & Task Manager</p>
                    
                    <div class="grid-3 mb-4" style="gap: 20px;">
                        <!-- Category: Administrative Office -->
                        <div style="background:var(--bg-light); padding: 20px; border-radius: 12px; border: 1px solid var(--border-soft); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <div class="flex justify-between mb-2">
                                <h4 class="text-dark">Admin Office</h4>
                                <span class="badge badge-blue">Clerks</span>
                            </div>
                            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 15px;">Document Request Hub Integrated.</p>
                            <div style="background: #fff; padding: 10px; border-left: 3px solid var(--primary-green); border-radius: 4px; font-size: 0.85rem; margin-bottom: 10px;">
                                <strong>Pending:</strong> 2 Bonafide Certificates
                            </div>
                            <button class="primary-btn w-100" style="padding: 10px; font-size: 0.85rem;">Process Requests</button>
                        </div>

                        <!-- Category: Library Staff -->
                        <div style="background:var(--bg-light); padding: 20px; border-radius: 12px; border: 1px solid var(--border-soft); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <div class="flex justify-between mb-2">
                                <h4 class="text-dark">Library Staff</h4>
                                <span class="badge badge-green">Librarians</span>
                            </div>
                            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 15px;">Book Issue & Return Logs.</p>
                            <div style="background: #fff; padding: 10px; border-left: 3px solid #f1c40f; border-radius: 4px; font-size: 0.85rem; margin-bottom: 10px;">
                                <strong>Shift:</strong> 09:00 AM - 05:00 PM
                            </div>
                            <button class="primary-btn w-100" style="padding: 10px; font-size: 0.85rem; background: var(--text-dark); border-color: var(--text-dark);">View Logs</button>
                        </div>

                        <!-- Category: Housekeeping -->
                        <div style="background:var(--bg-light); padding: 20px; border-radius: 12px; border: 1px solid var(--border-soft); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <div class="flex justify-between mb-2">
                                <h4 class="text-dark">Housekeeping</h4>
                                <span class="badge" style="background: #e0e0e0; color: #333;">Maintenance</span>
                            </div>
                            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 15px;">Daily clean-up task dispatcher.</p>
                            <div style="background: #fff; padding: 10px; border-left: 3px solid #e74c3c; border-radius: 4px; font-size: 0.85rem; margin-bottom: 10px;">
                                <strong>Active:</strong> Clean Lab 204
                            </div>
                            <button class="primary-btn w-100" style="padding: 10px; font-size: 0.85rem;" onclick="showModal('<div class=\\'p-4 text-center\\'><h3 class=\\'text-dark mb-3\\'>Task Dispatched</h3><p class=\\'text-muted\\'>Housekeeping staff notified via portal.</p><button class=\\'primary-btn mt-3\\' onclick=\\'closeModal()\\'>OK</button></div>')">Dispatch Task</button>
                        </div>
                    </div>

                    <h4 class="text-dark mb-3"><i class="fa-solid fa-clock-rotate-left text-primary"></i> Attendance & Shift Tracker</h4>
                    <div class="table-container responsive-table">
                        <table style="width: 100%;">
                            <thead>
                                <tr><th>Staff Name</th><th>Role</th><th>Shift Timing</th><th>Status</th><th>Contact</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Staff Name"><strong>Mr. S. K. Patil</strong></td>
                                    <td data-label="Role"><span style="font-weight: 600;">Head Clerk</span></td>
                                    <td data-label="Shift Timing">09:30 AM - 05:30 PM</td>
                                    <td data-label="Status"><span class="badge badge-green">On Duty</span></td>
                                    <td data-label="Contact"><a href="tel:+919876543200" style="color: var(--primary-green);"><i class="fa-solid fa-phone"></i> Call</a></td>
                                </tr>
                                <tr>
                                    <td data-label="Staff Name"><strong>Mr. V. Joshi</strong></td>
                                    <td data-label="Role"><span style="font-weight: 600;">Security Head</span></td>
                                    <td data-label="Shift Timing">08:00 PM - 08:00 AM</td>
                                    <td data-label="Status"><span class="badge badge-blue">Night Shift</span></td>
                                    <td data-label="Contact"><a href="tel:+919876543201" style="color: var(--primary-green);"><i class="fa-solid fa-phone"></i> Call</a></td>
                                </tr>
                                <tr>
                                    <td data-label="Staff Name"><strong>Mrs. A. Wani</strong></td>
                                    <td data-label="Role"><span style="font-weight: 600;">Lab Assistant (CS)</span></td>
                                    <td data-label="Shift Timing">10:00 AM - 04:00 PM</td>
                                    <td data-label="Status"><span class="badge" style="background: #e74c3c; color: white;">On Leave</span></td>
                                    <td data-label="Contact"><a href="tel:+919876543202" style="color: var(--primary-green);"><i class="fa-solid fa-phone"></i> Call</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            window.handleNoticePost = () => {
                const msg = document.getElementById('notice-msg').value;
                const target = document.getElementById('notice-target').value;
                if (!msg) return alert('Please enter a message');
                postNotice(msg, target);
                document.getElementById('notice-msg').value = '';
            };
        } else if (view === 'register-staff') {
            html = `
                <div class="grid-2 mb-4" style="gap:25px;">
                    <!-- Registration Form -->
                    <div class="glass-panel p-4">
                        <h3 class="text-dark mb-4"><i class="fa-solid fa-user-tie text-primary"></i> Onboard New Staff Member</h3>
                        <form id="staff-reg-form" onsubmit="handleStaffReg(event)">
                            <div class="form-group mb-3">
                                <label>Staff Full Name</label>
                                <input type="text" class="form-control" id="reg-staff-name" placeholder="Enter Full Name" required>
                            </div>
                            <div class="grid-2 mb-3" style="gap:10px;">
                                <div class="form-group">
                                    <label>Employee ID / Username</label>
                                    <input type="text" class="form-control" id="reg-staff-id" placeholder="FCL-XXX or STF-XXX" required>
                                </div>
                                <div class="form-group">
                                    <label>Access Password</label>
                                    <input type="password" class="form-control" id="reg-staff-pass" placeholder="Set Password" required>
                                </div>
                            </div>
                            <div class="grid-2 mb-3" style="gap:10px;">
                                <div class="form-group">
                                    <label>Staff Category</label>
                                    <select class="form-control" id="reg-staff-cat">
                                        <option>Teaching Staff</option>
                                        <option>Non-Teaching Staff</option>
                                        <option>Office/Clerk</option>
                                        <option>Management</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Department</label>
                                    <select class="form-control" id="reg-staff-dept">
                                        <option>COM</option><option>IT</option><option>AI</option>
                                        <option>MECH</option><option>CIVIL</option><option>OFFICE</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group mb-4">
                                <label>Professional Photo</label>
                                <div style="border: 2px dashed var(--border-soft); padding: 20px; text-align: center; border-radius: 12px; background: var(--bg-light); cursor: pointer;" onclick="document.getElementById('reg-staff-photo').click()">
                                    <input type="file" id="reg-staff-photo" style="display:none;" onchange="previewStaffPhoto(this)">
                                    <div id="photo-preview-zone">
                                        <i class="fa-solid fa-cloud-arrow-up text-primary" style="font-size:2rem; margin-bottom:10px;"></i>
                                        <p class="text-muted" style="font-size:0.85rem;">Click to Upload Staff Photo</p>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="primary-btn w-100">Finalize Registration</button>
                        </form>
                    </div>

                    <!-- Quick Preview Card -->
                    <div class="glass-panel p-4" style="text-align: center;">
                        <h4 class="text-dark mb-4">Profile Preview</h4>
                        <div style="width: 150px; height: 150px; margin: 0 auto 20px; border-radius: 50%; border: 4px solid var(--primary-green); overflow: hidden; background: #eee;">
                            <img id="reg-preview-img" src="https://via.placeholder.com/150?text=Photo" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <h3 id="reg-preview-name" class="text-dark">---</h3>
                        <p id="reg-preview-cat" class="text-primary" style="font-weight:700;">Category</p>
                        <div class="mt-4 p-3" style="background:var(--bg-light); border-radius:10px; text-align:left;">
                            <p style="font-size:0.85rem; margin-bottom:5px;"><strong>ID:</strong> <span id="reg-preview-id">---</span></p>
                            <p style="font-size:0.85rem;"><strong>Dept:</strong> <span id="reg-preview-dept">---</span></p>
                        </div>
                    </div>
                </div>

                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-address-book text-primary"></i> Master Staff Directory</h3>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr><th>Photo</th><th>Name & ID</th><th>Category</th><th>Department</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                ${DB.staffList.map(s => `
                                    <tr>
                                        <td><img src="${s.photo || 'https://via.placeholder.com/40'}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-green);"></td>
                                        <td>
                                            <div class="text-dark" style="font-weight:700;">${s.name}</div>
                                            <div class="text-muted" style="font-size:0.75rem;">${s.id}</div>
                                        </td>
                                        <td><span class="badge badge-blue">${s.category}</span></td>
                                        <td><strong>${s.dept}</strong></td>
                                        <td><span class="badge badge-green">Active</span></td>
                                        <td>
                                            <div class="flex gap-2">
                                                <button class="badge badge-blue" onclick="alert('Editing ${s.name}')"><i class="fa-solid fa-pen"></i></button>
                                                <button class="badge badge-red" onclick="alert('Staff account locked/archived.')"><i class="fa-solid fa-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            window.previewStaffPhoto = (input) => {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        document.getElementById('reg-preview-img').src = e.target.result;
                        window.currentRegPhoto = e.target.result;
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            };

            window.handleStaffReg = (e) => {
                e.preventDefault();
                const data = {
                    name: document.getElementById('reg-staff-name').value,
                    id: document.getElementById('reg-staff-id').value,
                    pass: document.getElementById('reg-staff-pass').value,
                    category: document.getElementById('reg-staff-cat').value,
                    dept: document.getElementById('reg-staff-dept').value,
                    photo: window.currentRegPhoto || `https://ui-avatars.com/api/?name=${document.getElementById('reg-staff-name').value}&background=2ECC71&color=fff`
                };
                registerStaff(data);
            };

            // Real-time preview listeners
            setTimeout(() => {
                ['name', 'id', 'cat', 'dept'].forEach(field => {
                    const el = document.getElementById(`reg-staff-${field}`);
                    if (el) {
                        el.addEventListener('input', () => {
                            const previewEl = document.getElementById(`reg-preview-${field}`);
                            if(previewEl) previewEl.innerText = el.value || '---';
                        });
                    }
                });
            }, 100);
        } else if (view === 'staff-master') {
            const categories = ["Teaching Staff", "Non-Teaching Staff", "Office/Clerks", "Management"];
            const selectedCat = window.currentStaffCat || "Teaching Staff";
            const filteredStaff = DB.staffList.filter(s => s.category === selectedCat);

            html = `
                <div class="glass-panel p-4 mb-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-people-roof text-primary"></i> Staff Master Control Center</h3>
                    
                    <div class="grid-2 mb-4" style="gap: 25px;">
                        <!-- Assignment Section -->
                        <div class="glass-panel p-4" style="background: rgba(46, 204, 113, 0.02); border: 1px dashed var(--primary-green) !important;">
                            <h4 class="text-dark mb-3"><i class="fa-solid fa-user-plus text-primary"></i> Assign Role & Duty</h4>
                            <div class="form-group">
                                <label>Select Staff Member</label>
                                <select class="form-control" id="staff-select">
                                    <option value="">Choose Staff...</option>
                                    ${DB.staffList.map(s => `<option value="${s.id}">${s.name} (${s.id} - ${s.category})</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Designation / Role</label>
                                <input type="text" class="form-control" id="staff-role" placeholder="e.g. Class Teacher - SE IT">
                            </div>
                            <div class="form-group">
                                <label>Daily Task / Duty</label>
                                <textarea class="form-control" id="staff-task" rows="3" placeholder="Describe the specific task..."></textarea>
                            </div>
                            <button class="primary-btn w-100" onclick="handleStaffAssignment()">
                                <i class="fa-solid fa-paper-plane"></i> Assign Post & Notify
                            </button>
                        </div>

                        <!-- Quick Statistics -->
                        <div class="grid-2" style="gap: 15px;">
                            <div class="glass-panel p-3 text-center" style="background: white;">
                                <h4 class="text-muted" style="font-size:0.8rem;">Active Tasks</h4>
                                <h2 class="text-primary">${Object.keys(DB.staffTasks).length}</h2>
                            </div>
                            <div class="glass-panel p-3 text-center" style="background: white;">
                                <h4 class="text-muted" style="font-size:0.8rem;">Pending</h4>
                                <h2 style="color: #F1C40F;">${Object.values(DB.staffTasks).filter(t => t.status === 'Task Pending').length}</h2>
                            </div>
                            <div class="glass-panel p-3 text-center" style="background: white;">
                                <h4 class="text-muted" style="font-size:0.8rem;">Completed</h4>
                                <h2 style="color: #2ECC71;">${Object.values(DB.staffTasks).filter(t => t.status === 'Task Completed').length}</h2>
                            </div>
                            <div class="glass-panel p-3 text-center" style="background: white;">
                                <h4 class="text-muted" style="font-size:0.8rem;">Total Staff</h4>
                                <h2 class="text-dark">${DB.staffList.length}</h2>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-2 mb-4" style="overflow-x: auto; padding-bottom: 5px;">
                        ${categories.map(cat => `
                            <button class="primary-btn ${selectedCat === cat ? '' : 'danger'}" 
                                    style="white-space:nowrap; font-size:0.85rem; padding: 10px 15px; background: ${selectedCat === cat ? 'var(--primary-green)' : 'rgba(46, 204, 113, 0.1)'}; color: ${selectedCat === cat ? 'white' : 'var(--primary-green)'}; border: 1px solid var(--primary-green);"
                                    onclick="window.currentStaffCat='${cat}'; renderApp();">
                                ${cat}
                            </button>
                        `).join('')}
                    </div>

                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Staff ID</th>
                                    <th>Full Name</th>
                                    <th>Primary Role</th>
                                    <th>Assigned Task</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredStaff.map(s => {
                                    const task = DB.staffTasks[s.id];
                                    return `
                                        <tr>
                                            <td><strong>${s.id}</strong></td>
                                            <td>${s.name}</td>
                                            <td><span class="badge badge-blue">${task ? task.role : s.role}</span></td>
                                            <td><span class="text-muted" style="font-size:0.85rem;">${task ? task.task : 'No specific task assigned'}</span></td>
                                            <td>
                                                ${task ? `
                                                    <span class="badge ${task.status === 'Task Completed' ? 'badge-green' : 'badge-red'}" style="cursor:pointer;" onclick="updateTaskStatus('${s.id}', '${task.status === 'Task Completed' ? 'Task Pending' : 'Task Completed'}')">
                                                        ${task.status}
                                                    </span>
                                                ` : '<span class="text-muted">-</span>'}
                                            </td>
                                            <td>
                                                <div class="flex gap-2">
                                                    <button class="badge badge-blue" onclick="editStaffAssignment('${s.id}')"><i class="fa-solid fa-pen"></i></button>
                                                    ${task ? `<button class="badge badge-red" onclick="removeStaffTask('${s.id}')"><i class="fa-solid fa-trash"></i></button>` : ''}
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            window.handleStaffAssignment = () => {
                const id = document.getElementById('staff-select').value;
                const role = document.getElementById('staff-role').value;
                const task = document.getElementById('staff-task').value;
                if (!id || !role || !task) return alert('Please fill all fields');
                assignStaffTask(id, role, task);
            };

            window.editStaffAssignment = (id) => {
                const staff = DB.staffList.find(s => s.id === id);
                const task = DB.staffTasks[id];
                document.getElementById('staff-select').value = id;
                document.getElementById('staff-role').value = task ? task.role : staff.role;
                document.getElementById('staff-task').value = task ? task.task : '';
                document.getElementById('staff-select').scrollIntoView({ behavior: 'smooth' });
            };

        } else if (view === 'roles') {
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between mb-4 align-center">
                        <div>
                            <h3 class="text-dark"><i class="fa-solid fa-user-shield text-primary"></i> Institution-Wide Role Assigner</h3>
                            <p class="text-muted">Currently managing assignments for <strong>500 Faculty Members</strong> across all departments.</p>
                        </div>
                        <div class="flex gap-2">
                            <div class="form-icon-group" style="width:300px;">
                                <i class="fa-solid fa-magnifying-glass input-icon"></i>
                                <input type="text" class="form-control" placeholder="Search for Faculty (1 of 500)...">
                            </div>
                            <button class="primary-btn"><i class="fa-solid fa-file-export"></i> Master Export</button>
                        </div>
                    </div>
                    
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr><th>Staff Name & ID</th><th>Category</th><th>Current Role / Designation</th><th>Assign New Role</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                <!-- Showing Representative Samples of 500 Faculty -->
                                ${[...Array(10)].map((_, i) => {
                                    const facultyId = 'FCL-50' + (i + 1);
                                    const facultyName = ['Prof. Rahul Verma', 'Dr. S. Sharma', 'Prof. Amit Patil', 'Dr. Snehal Patil', 'Prof. Vikas More', 'Dr. Priya Wani', 'Prof. K. R. Mali', 'Dr. S. J. Deshmukh', 'Prof. R. D. Borse', 'Dr. P. S. More'][i] || 'Faculty Member ' + (i+1);
                                    const currentTask = DB.staffTasks[facultyId] || {};
                                    return `
                                        <tr>
                                            <td>
                                                <div class="text-dark" style="font-weight:700;">${facultyName}</div>
                                                <div class="text-muted" style="font-size:0.75rem;">${facultyId}</div>
                                            </td>
                                            <td><span class="badge badge-green">Teaching Staff</span></td>
                                            <td><strong class="text-primary">${currentTask.role || 'Senior Lecturer'}</strong></td>
                                            <td>
                                                <input type="text" class="form-control" id="role-input-${facultyId}" placeholder="Update Role (e.g. HOD)" style="font-size:0.85rem;">
                                            </td>
                                            <td>
                                                <button class="primary-btn" style="padding:6px 12px; font-size:0.8rem;" onclick="handleRoleAssign('${facultyId}')">
                                                    <i class="fa-solid fa-check-double"></i> Assign
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-between align-center mt-4 p-3" style="background:rgba(46, 204, 113, 0.05); border-radius:10px; border:1px solid var(--border-soft);">
                        <p class="text-muted" style="font-size:0.85rem; font-weight:700;">Showing 10 of 500 Master Faculty Members</p>
                        <div class="flex gap-2">
                            <button class="badge" disabled>Prev</button>
                            <button class="badge badge-green">1</button>
                            <button class="badge">2</button>
                            <button class="badge">3</button>
                            <span>...</span>
                            <button class="badge">50</button>
                            <button class="badge badge-blue">Next</button>
                        </div>
                    </div>
                </div>
            `;
            
            window.handleRoleAssign = (staffId) => {
                const roleInput = document.getElementById(`role-input-${staffId}`).value;
                if (!roleInput) return alert('Please enter a role name');
                
                if (!DB.staffTasks[staffId]) {
                    DB.staffTasks[staffId] = { role: roleInput, task: "Awaiting Duty Assignment", status: "Task Pending" };
                } else {
                    DB.staffTasks[staffId].role = roleInput;
                }
                
                if (DB.teacherDetails[staffId]) {
                    DB.teacherDetails[staffId].assignment = roleInput;
                }
                
                showToast(`Role '${roleInput}' assigned successfully!`);
                renderApp();
            };
        } else if (view === 'broadcaster') {
            html = `
                <div class="glass-panel p-4" style="max-width:700px; margin:0 auto;">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-bullhorn text-primary"></i> Universal Broadcaster</h3>
                        <span class="badge badge-blue">Floating Sticky Note Engine</span>
                    </div>
                    <div class="form-group mb-4">
                        <label>Broadcast Message</label>
                        <textarea class="form-control" id="broadcast-msg" rows="4" placeholder="Type your institutional message here..."></textarea>
                    </div>
                    <div class="form-group mb-4">
                        <label>Target Audience</label>
                        <select class="form-control" id="broadcast-target">
                            <option value="All">All Users</option>
                            <option value="Staff">Staff Only</option>
                            <option value="Student">Students Only</option>
                        </select>
                    </div>
                    <div class="p-3 mb-4" style="background:rgba(46, 204, 113, 0.05); border-radius:12px; border:1px solid var(--primary-green);">
                        <p style="font-size:0.85rem; color:var(--text-dark);"><i class="fa-solid fa-circle-info"></i> This message will appear as a <strong>Floating Sticky Note</strong> on the recipient's dashboard.</p>
                    </div>
                    <button class="primary-btn w-100" onclick="handleUniversalBroadcast()">
                        <i class="fa-solid fa-paper-plane"></i> Send Master Broadcast
                    </button>
                </div>
            `;
            window.handleUniversalBroadcast = () => {
                const msg = document.getElementById('broadcast-msg').value;
                const target = document.getElementById('broadcast-target').value;
                if (!msg) return alert('Please enter a message');
                
                showToast(`Universal Broadcast sent to ${target}!`);
                document.getElementById('broadcast-msg').value = '';
            };
        } else if (view === 'academic-control') {
            html = `
                <div class="glass-panel p-4" style="max-width:600px; margin:0 auto;">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-graduation-cap text-primary"></i> Academic Term Control</h3>
                    <div class="form-group mb-4">
                        <label>Current Semester Setting</label>
                        <div class="flex gap-3">
                            <button class="primary-btn w-100" style="background:var(--primary-green);" onclick="alert('Current Term set to ODD Semester')">ODD Semester</button>
                            <button class="primary-btn w-100" style="background:var(--bg-light); color:var(--text-dark); border:1px solid var(--border-soft);" onclick="alert('Current Term set to EVEN Semester')">EVEN Semester</button>
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <label>Attendance Edit Limit (Days)</label>
                        <div class="flex gap-3 align-center">
                            <input type="number" class="form-control" value="7" id="aca-limit-days">
                            <span class="text-muted">Days</span>
                        </div>
                        <p class="text-muted mt-2" style="font-size:0.8rem;">Maximum days allowed for faculty to edit previous attendance records.</p>
                    </div>
                    <button class="primary-btn w-100" onclick="alert('Term and Attendance configurations saved!')">Sync Academic Rules</button>
                </div>
            `;
        } else if (view === 'staff-performance') {
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-chart-line text-primary"></i> Staff Performance Overview</h3>
                        <button class="primary-btn" onclick="alert('Exporting performance audit...')"><i class="fa-solid fa-file-pdf"></i> Audit Report</button>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr><th>Staff Name</th><th>Last Login</th><th>Designation</th><th>Work Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                ${[...Array(10)].map((_, i) => {
                                    const names = ["Dr. Amit Patil", "Prof. Sunita Wani", "Mr. R. K. More", "Dr. V. J. Pawar", "Prof. Rahul Verma", "Dr. S. Sharma", "Prof. Amit Patil", "Dr. Snehal Patil", "Prof. Vikas More", "Dr. Priya Wani"];
                                    const isCompleted = i % 2 === 0;
                                    return `
                                        <tr>
                                            <td><strong class="text-dark">${names[i]}</strong></td>
                                            <td><span class="text-muted" style="font-size:0.85rem;">Today, 08:${30 + i} AM</span></td>
                                            <td><span class="badge badge-blue">${['HOD', 'Sr. Lecturer', 'Clerk', 'Lab Asst'][i % 4]}</span></td>
                                            <td><span class="badge ${isCompleted ? 'badge-green' : 'badge-red'}">${isCompleted ? 'Completed' : 'Pending'}</span></td>
                                            <td><button class="badge badge-blue" onclick="alert('Viewing detailed metrics for ${names[i]}')">View Metrics</button></td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else if (view === 'user-access') {
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <div>
                            <h3 class="text-dark"><i class="fa-solid fa-user-lock text-primary"></i> Master User Access Control</h3>
                            <p class="text-muted">Master dashboard for managing login permissions for all 2,075 members.</p>
                        </div>
                        <div class="flex gap-2">
                            <div class="form-icon-group" style="width:300px;">
                                <i class="fa-solid fa-magnifying-glass input-icon"></i>
                                <input type="text" class="form-control" placeholder="Search by Name or ID...">
                            </div>
                            <button class="primary-btn danger" onclick="alert('CRITICAL: Emergency System-Wide User Lock initiated!')"><i class="fa-solid fa-lock"></i> Global Lock</button>
                        </div>
                    </div>

                    <div class="table-container">
                        <table>
                            <thead>
                                <tr><th>User Identity</th><th>Role</th><th>Department</th><th>Access Status</th><th>Security Actions</th></tr>
                            </thead>
                            <tbody>
                                ${[...Array(15)].map((_, i) => {
                                    const isFaculty = i < 5;
                                    const userId = isFaculty ? 'FCL-50' + (i + 1) : 'STU-150' + (i + 1);
                                    const name = isFaculty ? ['Prof. Rahul Verma', 'Dr. S. Sharma', 'Prof. Amit Patil', 'Dr. Snehal Patil', 'Prof. Vikas More'][i] : 'Student User ' + (i+1);
                                    return `
                                        <tr>
                                            <td>
                                                <div class="text-dark" style="font-weight:700;">${name}</div>
                                                <div class="text-muted" style="font-size:0.75rem;">${userId}</div>
                                            </td>
                                            <td><span class="badge ${isFaculty ? 'badge-blue' : 'badge-green'}">${isFaculty ? 'Faculty' : 'Student'}</span></td>
                                            <td>${isFaculty ? 'IT / COM' : 'First Year AI'}</td>
                                            <td><span class="badge badge-green" id="access-status-${userId}">Active</span></td>
                                            <td>
                                                <div class="flex gap-2">
                                                    <button class="badge badge-red" onclick="toggleUserBlock('${userId}', '${name}')">Block Access</button>
                                                    <button class="badge badge-blue" onclick="alert('Modifying encryption keys for ${name}...')">Edit Access</button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-between align-center mt-4 p-3" style="background:rgba(231, 76, 60, 0.05); border-radius:10px; border:1px solid var(--border-soft);">
                        <p class="text-muted" style="font-size:0.85rem; font-weight:700;">Institutional Accounts Managed: 2,075</p>
                        <div class="flex gap-2">
                            <button class="badge" disabled>Prev</button>
                            <button class="badge badge-blue">1</button>
                            <button class="badge">2</button>
                            <span>...</span>
                            <button class="badge">260</button>
                            <button class="badge badge-blue">Next</button>
                        </div>
                    </div>
                </div>
            `;
            window.toggleUserBlock = (userId, name) => {
                const statusEl = document.getElementById(`access-status-${userId}`);
                const isBlocked = statusEl.textContent === 'Blocked';
                
                if (isBlocked) {
                    statusEl.textContent = 'Active';
                    statusEl.className = 'badge badge-green';
                    showToast(`Access Restored for ${name}`);
                } else {
                    if (confirm(`SECURITY ALERT: Revoke portal access for ${name}?`)) {
                        statusEl.textContent = 'Blocked';
                        statusEl.className = 'badge badge-red';
                        showToast(`Access Revoked for ${name}`);
                    }
                }
            };
        } else if (view === 'settings') {
            html = `
                <div class="glass-panel p-4" style="max-width:500px;">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-gears text-primary"></i> Global System Settings</h3>
                    <div class="form-group mb-4">
                        <label>Attendance Edit Limit (Days)</label>
                        <div class="flex gap-3 align-center">
                            <input type="number" class="form-control" value="${State.settings.attendanceEditLimitDays}" id="limit-days">
                            <span>Days</span>
                        </div>
                        <p class="text-muted mt-2" style="font-size:0.8rem;">Teachers cannot edit attendance records older than this limit.</p>
                    </div>
                    <div class="form-group mb-4">
                        <label>Master Firewall Status</label>
                        <div class="flex justify-between align-center p-3" style="background:var(--bg-light); border-radius:10px;">
                            <span class="badge badge-green"><i class="fa-solid fa-shield-halved"></i> Active Protection</span>
                            <button class="badge badge-red" onclick="alert('CRITICAL: Institutional Access Lockdown Initiated. All non-admin sessions will be terminated.')">Initiate Lockdown</button>
                        </div>
                    </div>
                    <button class="primary-btn w-100" onclick="State.settings.attendanceEditLimitDays = document.getElementById('limit-days').value; alert('System Core Settings Updated!')">Save Core Changes</button>
                </div>
            `;
            window.toggleUserBlock = (userId, name) => {
                const statusEl = document.getElementById(`status-${userId}`);
                const isBlocked = statusEl.textContent === 'Blocked';
                if (isBlocked) {
                    statusEl.textContent = 'Active';
                    statusEl.className = 'badge badge-green';
                    showToast(`Access Restored for ${name}`);
                } else {
                    if (confirm(`SECURITY ALERT: Revoke portal access for ${name}?`)) {
                        statusEl.textContent = 'Blocked';
                        statusEl.className = 'badge badge-red';
                        showToast(`Access Revoked for ${name}`);
                    }
                }
            };
        } else if (view === 'admin-queries') {
            html = `
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-comment-dots text-primary"></i> Institutional Query Management</h3>
                    <div class="table-container">
                        <table>
                            <thead><tr><th>From User</th><th>Role</th><th>Query Message</th><th>Status</th><th>Action</th></tr></thead>
                            <tbody>
                                ${DB.queries.map(q => `
                                    <tr>
                                        <td><strong>${q.name}</strong><br><small class="text-muted">${q.from}</small></td>
                                        <td><span class="badge badge-blue">${q.role}</span></td>
                                        <td style="max-width:250px;"><p style="font-size:0.85rem;">${q.message}</p></td>
                                        <td><span class="badge ${q.status === 'Open' ? 'badge-red' : 'badge-green'}">${q.status}</span></td>
                                        <td>
                                            ${q.status === 'Open' ? `<button class="primary-btn" style="padding:5px 10px; font-size:0.75rem;" onclick="replyToQuery(${q.id})">Reply Now</button>` : `<span class="text-muted">Replied</span>`}
                                        </td>
                                    </tr>
                                    ${q.reply ? `<tr><td colspan="5" style="background:rgba(46, 204, 113, 0.05); padding-left:40px;"><i class="fa-solid fa-reply"></i> <strong class="text-primary">Admin Reply:</strong> ${q.reply}</td></tr>` : ''}
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            window.replyToQuery = (id) => {
                const reply = prompt("Enter your reply to this query:");
                if (reply) {
                    const query = DB.queries.find(q => q.id === id);
                    query.reply = reply;
                    query.status = "Resolved";
                    showToast("Reply sent successfully!");
                    renderApp();
                }
            };
        } else {
            html = `<div class="glass-panel p-4 text-center" style="padding:60px;"><h2 class="text-muted">Module Operational</h2><p class="text-muted mt-2">Awaiting specific directives.</p></div>`;
        }
    } else if (role === 'clerk') {
        if (view === 'dashboard') {
            html = `
                <div class="grid-4 mb-4">
                    <div class="glass-panel stat-card floating">
                        <div class="stat-info">
                            <p class="text-muted">Certificate Requests</p>
                            <h3>5</h3>
                            <p style="font-size:0.7rem; color:var(--badge-red); font-weight:700;">Pending Action</p>
                        </div>
                        <div class="stat-icon" style="background:rgba(231, 76, 60, 0.1); color:var(--badge-red);"><i class="fa-solid fa-file-invoice"></i></div>
                    </div>
                    <div class="glass-panel stat-card floating">
                        <div class="stat-info">
                            <p class="text-muted">Unpaid Fees</p>
                            <h3>10</h3>
                            <p style="font-size:0.7rem; color:var(--badge-red); font-weight:700;">Due Notifications</p>
                        </div>
                        <div class="stat-icon" style="background:rgba(231, 76, 60, 0.1); color:var(--badge-red);"><i class="fa-solid fa-money-bill-wave"></i></div>
                    </div>
                    <div class="glass-panel stat-card floating">
                        <div class="stat-info">
                            <p class="text-muted">Exam Eligibility</p>
                            <h3>94%</h3>
                            <p style="font-size:0.7rem; color:var(--primary-green); font-weight:700;">Verified</p>
                        </div>
                        <div class="stat-icon"><i class="fa-solid fa-user-check"></i></div>
                    </div>
                    <div class="glass-panel stat-card floating">
                        <div class="stat-info">
                            <p class="text-muted">Admin Queries</p>
                            <h3>${DB.queries.filter(q => q.from === State.currentUser.id).length}</h3>
                            <p style="font-size:0.7rem; color:var(--secondary-blue); font-weight:700;">Communication Hub</p>
                        </div>
                        <div class="stat-icon" style="background:rgba(52, 152, 219, 0.1); color:var(--secondary-blue);"><i class="fa-solid fa-message"></i></div>
                    </div>
                </div>

                <div class="grid-2 mb-4" style="gap:25px;">
                    <div class="glass-panel p-4">
                        <h3 class="text-dark mb-4"><i class="fa-solid fa-bolt-lightning text-primary"></i> Clerk Service Hub</h3>
                        <div class="grid-2" style="gap:15px;">
                            <button class="glass-panel p-3 text-center action-btn" onclick="State.currentView='certificate-hub'; renderApp();">
                                <i class="fa-solid fa-file-shield text-primary mb-2" style="font-size:1.5rem;"></i>
                                <div style="font-size:0.8rem; font-weight:800;">Certificate Hub</div>
                            </button>
                            <button class="glass-panel p-3 text-center action-btn" onclick="State.currentView='fee-tracker'; renderApp();">
                                <i class="fa-solid fa-money-bill-transfer text-blue mb-2" style="font-size:1.5rem;"></i>
                                <div style="font-size:0.8rem; font-weight:800;">Fee Tracker</div>
                            </button>
                            <button class="glass-panel p-3 text-center action-btn" onclick="State.currentView='exam-desk'; renderApp();">
                                <i class="fa-solid fa-pen-to-square text-orange mb-2" style="font-size:1.5rem;"></i>
                                <div style="font-size:0.8rem; font-weight:800;">Exam Desk</div>
                            </button>
                            <button class="glass-panel p-3 text-center action-btn" onclick="State.currentView='help-queries'; renderApp();">
                                <i class="fa-solid fa-paper-plane text-green mb-2" style="font-size:1.5rem;"></i>
                                <div style="font-size:0.8rem; font-weight:800;">Admin Queries</div>
                            </button>
                        </div>
                        <div class="mt-4">
                            <button class="primary-btn w-100" style="background:var(--text-dark);" onclick="State.currentView='help-queries'; renderApp();">
                                <i class="fa-solid fa-message"></i> Go to Messaging Box
                            </button>
                        </div>
                    </div>

                    <div class="glass-panel p-4">
                        <h3 class="text-dark mb-4"><i class="fa-solid fa-magnifying-glass text-primary"></i> Student Quick Search</h3>
                        <div class="form-icon-group mb-4">
                            <i class="fa-solid fa-user-tag input-icon"></i>
                            <input type="text" class="form-control" placeholder="Enter Student ID or PRN...">
                        </div>
                        <p class="text-muted" style="font-size:0.85rem;">Enter details to pull up institutional profiles, financial history, and document status.</p>
                        <div class="p-3 mt-4" style="background:rgba(46, 204, 113, 0.05); border-radius:12px; border:1px solid var(--primary-green);">
                            <p style="font-size:0.8rem; color:var(--text-dark);"><i class="fa-solid fa-shield-halved"></i> <strong>RBAC Policy:</strong> Clerks have full access to Administrative & Financial records. Academic marks editing is restricted.</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (view === 'certificate-hub') {
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-file-shield text-primary"></i> Certificate Issuance Hub</h3>
                        <div class="flex gap-2">
                            <span class="badge badge-red">${DB.documentRequests.filter(r => r.status === 'Pending').length} Pending</span>
                            <span class="badge badge-blue">${DB.documentRequests.filter(r => r.status === 'Processing').length} Processing</span>
                        </div>
                    </div>
                    <div class="table-container" style="max-height: 600px; overflow-y: auto;">
                        <table>
                            <thead style="position: sticky; top: 0; background: var(--bg-white); z-index: 10;">
                                <tr><th>Student & Class</th><th>Request Type</th><th>Reason for Certificate</th><th>Applied Date</th><th>Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                ${DB.documentRequests.map(r => `
                                    <tr>
                                        <td><strong>${r.studentName}</strong><br><small class="text-muted">${r.studentId} | ${r.branch}</small></td>
                                        <td><span class="badge badge-blue">${r.type}</span></td>
                                        <td style="max-width:180px;"><p style="font-size:0.8rem; color:var(--text-dark);">${r.reason}</p></td>
                                        <td>${r.date}</td>
                                        <td><span class="badge ${r.status === 'Pending' ? 'badge-red' : (r.status === 'Processing' ? 'badge-orange' : 'badge-green')}">${r.status}</span></td>
                                        <td>
                                            <div class="flex gap-2">
                                                ${r.status === 'Ready for Collection' ? `
                                                    <button class="badge badge-blue" onclick="handleDocAction(${r.id}, 'Collected')">Mark Collected</button>
                                                ` : (r.status === 'Collected' ? `<span class="text-muted">Handed Over</span>` : `
                                                    <button class="badge badge-green" onclick="handleDocAction(${r.id}, 'Approved')">Update</button>
                                                    <button class="badge badge-red" onclick="handleDocAction(${r.id}, 'Rejected')">Reject</button>
                                                `)}
                                                <button class="badge badge-blue" onclick="alert('Generating Official PDF for ${r.studentName} with Reason: ${r.reason}...')"><i class="fa-solid fa-print"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            window.handleDocAction = (id, action) => {
                const req = DB.documentRequests.find(r => r.id === id);
                if (req) {
                    if (action === 'Approved') {
                        const choice = prompt("Select Status Update for Student:\n1. Processing\n2. Ready for Collection", "2");
                        if (choice === "1") req.status = "Processing";
                        else if (choice === "2") req.status = "Ready for Collection";
                        showToast(`Document set to ${req.status}`);
                    } else if (action === 'Rejected') {
                        req.status = "Rejected";
                        showToast("Document Rejected");
                    } else if (action === 'Collected') {
                        req.status = "Collected (History)";
                        showToast("Marked as Collected");
                    }
                    renderApp();
                }
            };
        } else if (view === 'fee-tracker') {
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-money-bill-transfer text-primary"></i> Fee Audit & Tracking (Institutional Record)</h3>
                        <div class="form-icon-group" style="width:300px;">
                            <i class="fa-solid fa-magnifying-glass input-icon"></i>
                            <input type="text" class="form-control" placeholder="Search by ID or Name..." id="fee-search" onkeyup="filterFeeTable()">
                        </div>
                    </div>
                    <div class="table-container" style="max-height: 600px; overflow-y: auto;">
                        <table id="clerk-fee-table">
                            <thead><tr><th>Student Details</th><th>Class & Branch</th><th>Total Amount</th><th>Balance</th><th>Status</th><th>Action</th></tr></thead>
                            <tbody>
                                ${DB.studentsList.map(s => {
                                    const fee = DB.feeRecords[s.id] || { total: 85000, paid: Math.floor(Math.random() * 85000), status: Math.random() > 0.5 ? "Paid" : "Pending" };
                                    return `
                                        <tr class="fee-row">
                                            <td><strong>${s.name}</strong><br><small class="text-muted">${s.id}</small></td>
                                            <td><span class="badge badge-blue">${s.class}</span></td>
                                            <td>₹ ${fee.total}</td>
                                            <td>₹ ${fee.total - fee.paid}</td>
                                            <td><span class="badge ${fee.status === 'Paid' ? 'badge-green' : 'badge-red'}">${fee.status}</span></td>
                                            <td><button class="badge badge-blue" onclick="handleFeeUpdate('${s.id}')">Update</button></td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <script>
                    window.filterFeeTable = () => {
                        const input = document.getElementById("fee-search");
                        const filter = input.value.toUpperCase();
                        const rows = document.querySelectorAll(".fee-row");
                        rows.forEach(row => {
                            const text = row.innerText.toUpperCase();
                            row.style.display = text.includes(filter) ? "" : "none";
                        });
                    };
                </script>
            `;
            window.handleFeeUpdate = (id) => {
                if (!DB.feeRecords[id]) DB.feeRecords[id] = { total: 85000, paid: 0, status: "Pending" };
                const fee = DB.feeRecords[id];
                if (fee.status === 'Paid') {
                    fee.status = 'Pending';
                    fee.paid = 40000;
                } else {
                    fee.status = 'Paid';
                    fee.paid = 85000;
                }
                showToast(`Fee Status Updated for ${id}`);
                renderApp();
            };
        } else if (view === 'exam-desk') {
            html = `
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-pen-to-square text-primary"></i> Exam Eligibility Desk</h3>
                    <div class="p-3 mb-4" style="background:var(--bg-light); border-radius:12px;">
                        <p class="text-muted" style="font-size:0.85rem;">Verify attendance and fee status to approve semester exam hall tickets.</p>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead><tr><th>Student</th><th>Attendance</th><th>Fee Status</th><th>Eligibility</th></tr></thead>
                            <tbody>
                                ${DB.studentsList.slice(5, 12).map(s => `
                                    <tr>
                                        <td><strong>${s.name}</strong></td>
                                        <td><span class="text-dark" style="font-weight:700;">${s.att}%</span></td>
                                        <td><span class="badge badge-green">Paid</span></td>
                                        <td><button class="badge badge-green" onclick="alert('Hall Ticket Released for ${s.name}')">Verify & Release</button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else if (view === 'scholarship-desk') {
            html = `
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-hand-holding-dollar text-primary"></i> Scholarship Management</h3>
                    <div class="grid-2 mb-4" style="gap:20px;">
                        <div class="glass-panel p-3" style="border-left:4px solid var(--primary-green) !important;">
                            <h4 class="text-dark">MahaDBT Requests</h4>
                            <h3>14</h3>
                        </div>
                        <div class="glass-panel p-3" style="border-left:4px solid var(--secondary-blue) !important;">
                            <h4 class="text-dark">Central Scholarship</h4>
                            <h3>8</h3>
                        </div>
                    </div>
                    <button class="primary-btn w-100" onclick="alert('Opening Document Verification Interface...')">Start Document Audit</button>
                </div>
            `;
        } else if (view === 'profile') {
            html = `
                <div class="glass-panel p-4 text-center">
                    <img src="https://ui-avatars.com/api/?name=Clerk+User&background=2ECC71&color=fff&size=200" style="width:120px; border-radius:50%; margin-bottom:15px;">
                    <h3 class="text-dark">Institutional Office Clerk</h3>
                    <p class="text-muted">Admin & Finance Department</p>
                </div>
            `;
        }
    } else if (role === 'teacher') {
        const schedule = DB.teacherSchedule[State.currentUser.id] || [];
        const isClassTeacher = DB.roleAssignments.classTeachers[State.currentUser.id];
        const isParentTeacher = DB.roleAssignments.parentTeachers[State.currentUser.id];
        
        if (view === 'dashboard') {
            const swapReqs = DB.swapRequests.filter(r => r.status === 'pending');
            html = `
                <!-- Premium Congratulatory Banner -->
                ${isClassTeacher || isParentTeacher ? `
                    <div class="glass-panel p-4 mb-4" style="border: 2px solid var(--primary-green); background: linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(255, 255, 255, 1) 100%); box-shadow: 0 10px 30px rgba(46,204,113,0.15); position:relative; overflow:hidden;">
                        <div style="position:absolute; right:-20px; top:-20px; opacity:0.1; font-size:8rem; color:var(--primary-green); transform:rotate(-15deg);"><i class="fa-solid fa-award"></i></div>
                        <div class="flex align-center gap-4">
                            <div class="floating" style="width:80px; height:80px; background:var(--primary-green); border-radius:20px; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 20px rgba(46,204,113,0.4);">
                                <i class="fa-solid fa-medal" style="font-size: 3rem; color: white;"></i>
                            </div>
                            <div>
                                <h2 class="text-dark" style="margin-bottom:5px; font-size:1.8rem; letter-spacing:-0.5px;">Congratulations, Faculty Member!</h2>
                                <p class="text-muted" style="font-size: 1.1rem; line-height:1.5;">
                                    We are pleased to inform you that you have been officially appointed as 
                                    <span class="text-primary" style="font-weight:800;">${isClassTeacher ? `Class Teacher for ${isClassTeacher}` : ''} ${isParentTeacher ? ` & Mentor for PT Group` : ''}</span>. 
                                    Your dedication is highly valued by the institution.
                                </p>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <div class="grid-2 mb-4" style="gap:25px;">
                    <!-- Daily Schedule Timeline -->
                    <div class="glass-panel p-4">
                        <div class="flex justify-between align-center mb-4">
                            <h3 class="text-dark"><i class="fa-solid fa-clock-rotate-left text-primary"></i> Daily Schedule</h3>
                            <span class="badge badge-green">${schedule.length} Lectures</span>
                        </div>
                        
                        <div class="timeline" style="border-left: 2px dashed var(--primary-green); margin-left: 15px; padding-left: 25px;">
                            ${schedule.map(s => `
                                <div class="timeline-item mb-4" style="position:relative;">
                                    <div style="position:absolute; left:-34px; top:0; width:16px; height:16px; border-radius:50%; background:var(--primary-green); border:3px solid white; box-shadow:0 0 10px rgba(46,204,113,0.3);"></div>
                                    <div class="flex justify-between align-center mb-1">
                                        <span class="text-primary" style="font-weight:800; font-size:0.9rem;"><i class="fa-solid fa-clock"></i> ${s.time}</span>
                                        <span class="badge badge-blue" style="font-size:0.65rem;">ROOM: ${s.room}</span>
                                    </div>
                                    <h4 class="text-dark" style="margin-bottom:2px;">${s.subject}</h4>
                                    <p class="text-muted" style="font-size:0.8rem;">${s.branch} - ${s.year} (Div ${s.div || 'A'})</p>
                                </div>
                            `).join('')}
                            ${schedule.length === 0 ? '<p class="text-muted text-center py-4">No lectures scheduled for today</p>' : ''}
                        </div>
                    </div>

                    <!-- Swap Requests Feed -->
                    <div class="glass-panel p-4">
                        <h3 class="text-dark mb-4"><i class="fa-solid fa-right-left text-primary"></i> Faculty Swap Requests</h3>
                        ${swapReqs.length > 0 ? swapReqs.map(r => `
                            <div style="padding:15px; background:rgba(52, 152, 219, 0.05); border-radius:10px; border:1px solid rgba(52, 152, 219, 0.2); margin-bottom:12px;">
                                <div class="flex justify-between align-center mb-2">
                                    <strong class="text-dark">${r.from}</strong>
                                    <span class="badge ${r.type === 'take' ? 'badge-red' : 'badge-green'}" style="font-size:0.65rem; text-transform:uppercase;">${r.type === 'take' ? 'Wants to Take' : 'Wants to Give'}</span>
                                </div>
                                <p class="text-muted mb-3" style="font-size:0.85rem;">
                                    ${r.type === 'take' 
                                        ? `Wants to <strong>TAKE</strong> your <strong>${r.targetClass}</strong> lecture (${r.subject}) on ${r.date} at ${r.time}.`
                                        : `Wants to <strong>GIVE</strong> their <strong>${r.targetClass}</strong> lecture (${r.subject}) to you on ${r.date} at ${r.time}.`}
                                </p>
                                <div class="flex gap-2">
                                    <button class="primary-btn" style="padding:6px 12px; font-size:0.8rem; background:var(--primary-green); border-color:var(--primary-green);" onclick="alert('Request Accepted!')">Accept</button>
                                    <button class="primary-btn danger" style="padding:6px 12px; font-size:0.8rem;" onclick="alert('Request Declined!')">Decline</button>
                                </div>
                            </div>
                        `).join('') : '<p class="text-muted text-center py-4">No incoming requests</p>'}
                    </div>
                </div>
            `;
        } else if (view === 'countdown') {
            html = `
                <!-- Exam Settings Widget for Teachers -->
                <div class="glass-panel p-4 mb-4" style="border: 1px solid var(--primary-green); border-left: 6px solid var(--primary-green);">
                    <div class="flex justify-between align-center" style="gap: 20px; flex-wrap: wrap;">
                        <div>
                            <h3 class="text-dark mb-1"><i class="fa-solid fa-clock-rotate-left fa-spin text-primary" style="--fa-animation-duration: 8s;"></i> DBATU Exam Countdown Setup</h3>
                            <p class="text-muted" style="font-size: 0.9rem;">Set or update the target date for the upcoming university examination. Select specific years/classes or broadcast globally to all student portals.</p>
                        </div>
                        <button class="primary-btn" onclick="openExamSettingsModal()" style="background: var(--primary-green); border-color: var(--primary-green); padding: 12px 20px; font-size: 1rem;"><i class="fa-solid fa-stopwatch-20"></i> Set Countdown for Exam</button>
                    </div>
                </div>
            `;
        } else if (view === 'attendance') {
            html = `
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-clipboard-user text-primary"></i> Attendance Hub</h3>
                    
                    <div class="grid-2 mb-4" style="gap:15px;">
                        <button class="primary-btn" style="padding:20px; font-size:1.1rem; background:var(--primary-green); border-color:var(--primary-green);" onclick="openTakeAttendance()">
                            <i class="fa-solid fa-plus-circle" style="font-size:1.5rem; display:block; margin-bottom:10px;"></i> Take New Attendance
                        </button>
                        <button class="primary-btn" style="padding:20px; font-size:1.1rem; background:var(--text-dark); border-color:var(--text-dark);" onclick="openEditAttendance()">
                            <i class="fa-solid fa-pen-to-square" style="font-size:1.5rem; display:block; margin-bottom:10px;"></i> Edit Previous Attendance
                        </button>
                    </div>

                    <!-- Take Attendance Panel -->
                    <div id="take-att-panel" class="mb-4" style="display:none; padding:20px; background:rgba(46, 204, 113, 0.05); border-radius:12px; border:2px solid var(--primary-green); animation: slideDown 0.3s ease;">
                        <h4 class="text-dark mb-3"><i class="fa-solid fa-clock"></i> New Session Details</h4>
                        <div class="grid-4" style="gap: 10px;">
                            <div class="form-group">
                                <label>Year</label>
                                <select class="form-control" id="take-year" onchange="updateDynamicSubjects('take')">
                                    <option value="">Select Year</option>
                                    ${AcademicData.years.map(y => `<option value="${y}">${y}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Branch</label>
                                <select class="form-control" id="take-branch" onchange="updateDynamicSubjects('take')">
                                    <option value="">Select Branch</option>
                                    ${AcademicData.branches.map(b => `<option value="${b.code}">${b.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Division</label>
                                <select class="form-control" id="take-div">
                                    <option>A</option><option>B</option><option>C</option>
                                    <option>D</option><option>E</option><option>F</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Subject</label>
                                <select class="form-control" id="take-subject">
                                    <option>Select Year & Branch first</option>
                                </select>
                            </div>
                        </div>
                        <button class="primary-btn mt-3 w-100" onclick="loadAttendanceTable('new')">Initialize Roll Call</button>
                    </div>

                    <!-- Edit Attendance Panel -->
                    <div id="edit-att-panel" class="mb-4" style="display:none; padding:20px; background:rgba(52, 152, 219, 0.05); border-radius:12px; border:2px solid #3498DB; animation: slideDown 0.3s ease;">
                        <h4 class="text-dark mb-3"><i class="fa-solid fa-calendar-check"></i> Select Record to Modify</h4>
                        <div class="grid-4" style="gap: 10px;">
                            <div class="form-group">
                                <label>Year</label>
                                <select class="form-control" id="edit-year" onchange="updateDynamicSubjects('edit')">
                                    <option value="">Select Year</option>
                                    ${AcademicData.years.map(y => `<option value="${y}">${y}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Branch</label>
                                <select class="form-control" id="edit-branch" onchange="updateDynamicSubjects('edit')">
                                    <option value="">Select Branch</option>
                                    ${AcademicData.branches.map(b => `<option value="${b.code}">${b.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Subject</label>
                                <select class="form-control" id="edit-subject"><option>Select Year & Branch first</option></select>
                            </div>
                            <div class="form-group"><label>Date</label><input type="date" class="form-control" value="2024-10-30"></div>
                        </div>
                        <button class="primary-btn mt-3 w-100" style="background:#3498DB; border-color:#3498DB;" onclick="loadAttendanceTable('edit')">Retrieve Records</button>
                    </div>
                    
                    <div id="attendance-list-container" style="display:none;">
                        <div id="att-mode-badge" class="mb-3" style="display:inline-block;"></div>
                        <div style="max-height: 500px; overflow-y: auto; border: 1px solid var(--border-soft); border-radius: 12px;" class="mb-4">
                            <table style="width: 100%;">
                                <thead style="position: sticky; top: 0; background: white; z-index: 10;">
                                    <tr><th style="padding:15px;">Roll No</th><th>Student Name</th><th>Status</th><th>Action</th></tr>
                                </thead>
                                <tbody>
                                    ${DB.studentsList.map(s => `
                                        <tr style="border-bottom: 1px solid var(--border-soft);">
                                            <td style="padding:12px 15px;"><strong>${s.id}</strong></td>
                                            <td>${s.name}</td>
                                            <td><span class="badge badge-green att-indicator">Present</span></td>
                                            <td>
                                                <div class="flex gap-2">
                                                    <button class="badge badge-green" onclick="markRow(this, 'Present')">P</button>
                                                    <button class="badge badge-red" onclick="markRow(this, 'Absent')">A</button>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        <button class="primary-btn w-100" onclick="confirmAttendanceSubmission()"><i class="fa-solid fa-cloud-arrow-up"></i> Finalize Attendance</button>
                    </div>
                </div>
            `;
        } else if (view === 'register-student') {
            const roleInfo = DB.roleAssignments.classTeachers[State.currentUser.id] || "";
            const [branch, year] = roleInfo.split('-');
            html = `
                <div class="grid-2" style="gap:25px;">
                    <div class="glass-panel p-4">
                        <h3 class="text-dark mb-4"><i class="fa-solid fa-user-plus text-primary"></i> Onboard New Student</h3>
                        <form onsubmit="event.preventDefault(); alert('Student Registered Successfully! Login Credentials Activated.');">
                            <div class="form-group mb-3">
                                <label>Full Name</label>
                                <input type="text" class="form-control" placeholder="Enter Student Name" required>
                            </div>
                            <div class="grid-2 mb-3" style="gap:10px;">
                                <div class="form-group">
                                    <label>Student ID / Roll No</label>
                                    <input type="text" class="form-control" placeholder="BT2020CS..." required>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" placeholder="Set Password" required>
                                </div>
                            </div>
                            <div class="grid-2 mb-3" style="gap:10px;">
                                <div class="form-group">
                                    <label>Academic Year</label>
                                    <input type="text" class="form-control" value="${year || 'FE'}" readonly style="background:var(--bg-light);">
                                </div>
                                <div class="form-group">
                                    <label>Branch</label>
                                    <input type="text" class="form-control" value="${branch || 'IT'}" readonly style="background:var(--bg-light);">
                                </div>
                            </div>
                            <div class="form-group mb-4">
                                <label>Student Photo</label>
                                <div style="border: 2px dashed var(--border-soft); padding: 20px; text-align: center; border-radius: 12px; background: var(--bg-light);">
                                    <input type="file" id="stu-photo" style="display:none;">
                                    <button type="button" class="primary-btn" onclick="document.getElementById('stu-photo').click()"><i class="fa-solid fa-camera"></i> Browse Photo</button>
                                </div>
                            </div>
                            <button type="submit" class="primary-btn w-100">Confirm Registration</button>
                        </form>
                    </div>

                    <div class="glass-panel p-4">
                        <h3 class="text-dark mb-4"><i class="fa-solid fa-users-viewfinder text-primary"></i> Registered Students List</h3>
                        <div style="max-height: 500px; overflow-y: auto; border: 1px solid var(--border-soft); border-radius: 12px;">
                            <table style="width: 100%;">
                                <thead style="position: sticky; top: 0; background: white; z-index: 10;">
                                    <tr><th style="padding:15px;">Student ID</th><th>Name</th><th>Action</th></tr>
                                </thead>
                                <tbody>
                                    ${DB.studentsList.slice(0, 10).map(s => `
                                        <tr style="border-bottom: 1px solid var(--border-soft);">
                                            <td style="padding:12px 15px;"><strong>${s.id}</strong></td>
                                            <td>${s.name}</td>
                                            <td>
                                                <div class="flex gap-2">
                                                    <button class="badge badge-blue" onclick="alert('Editing ${s.name}')">Edit</button>
                                                    <button class="badge badge-red" onclick="alert('Deleting ${s.name}')">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            window.confirmAttendanceSubmission = () => {
                const absentCount = Array.from(document.querySelectorAll('.att-indicator'))
                    .filter(el => el.textContent === 'Absent').length;
                
                showModal(`
                    <div class="p-4 text-center">
                        <i class="fa-solid fa-circle-check text-primary mb-3" style="font-size:3rem;"></i>
                        <h3 class="text-dark">Attendance Compiled!</h3>
                        <p class="text-muted mt-2">You have marked <strong>${60 - absentCount} Present</strong> and <strong>${absentCount} Absent</strong> students.</p>
                        
                        <div style="margin:25px 0; padding:20px; background:rgba(46, 204, 113, 0.05); border-radius:12px; border:1px solid var(--primary-green);">
                            <h4 class="text-primary mb-2"><i class="fa-brands fa-whatsapp"></i> Parent Notification</h4>
                            <p style="font-size:0.85rem; color:var(--text-dark);">Would you like to send automated absence alerts to the parents of these ${absentCount} students via WhatsApp?</p>
                        </div>
                        
                        <div class="flex gap-2">
                            <button class="primary-btn w-100" onclick="closeModal(); alert('WhatsApp Alerts Initiated for ${absentCount} Parents. Records Synced.');">Yes, Notify Parents</button>
                            <button class="primary-btn danger w-100" onclick="closeModal(); alert('Attendance Synced Successfully (No alerts sent).');">Skip & Submit</button>
                        </div>
                    </div>
                `);
            };
            window.openTakeAttendance = () => {
                document.getElementById('edit-att-panel').style.display = 'none';
                document.getElementById('take-att-panel').style.display = 'block';
                document.getElementById('attendance-list-container').style.display = 'none';
            };
            window.openEditAttendance = () => {
                document.getElementById('take-att-panel').style.display = 'none';
                document.getElementById('edit-att-panel').style.display = 'block';
                document.getElementById('attendance-list-container').style.display = 'none';
            };
            window.loadAttendanceTable = (mode) => {
                const container = document.getElementById('attendance-list-container');
                const badge = document.getElementById('att-mode-badge');
                container.style.display = 'block';
                badge.innerHTML = mode === 'new' 
                    ? '<span class="badge badge-green">TAKE ATTENDANCE MODE ACTIVE</span>' 
                    : '<span class="badge badge-blue">EDIT PREVIOUS RECORDS MODE ACTIVE</span>';
                container.scrollIntoView({ behavior: 'smooth' });
            };
            window.markRow = (btn, status) => {
                const row = btn.closest('tr');
                const indicator = row.querySelector('.att-indicator');
                indicator.textContent = status;
                indicator.className = `badge att-indicator ${status === 'Present' ? 'badge-green' : 'badge-red'}`;
            };
            window.updateDynamicSubjects = (prefix) => {
                const year = document.getElementById(`${prefix}-year`).value;
                const branch = document.getElementById(`${prefix}-branch`).value;
                const subSelect = document.getElementById(`${prefix}-subject`);
                
                if (year && branch && AcademicData.mapping[year] && AcademicData.mapping[year][branch]) {
                    const data = AcademicData.mapping[year][branch];
                    const allSubjects = Object.values(data.subjects).flat();
                    subSelect.innerHTML = allSubjects.map(s => `<option value="${s}">${s}</option>`).join('');
                } else {
                    subSelect.innerHTML = '<option>Select Year & Branch</option>';
                }
            };
            window.toggleAttendanceEditMode = () => {
                const notice = document.getElementById('edit-notice');
                const btn = document.getElementById('submit-att-btn');
                const msg = document.getElementById('limit-msg');
                
                // Logic Gate: Check if last marked date is within limit
                const lastMarked = new Date("2024-10-28"); // Mock date
                const now = new Date();
                const diff = Math.floor((now - lastMarked) / (1000 * 60 * 60 * 24));
                
                document.getElementById('attendance-list').style.display = 'block';
                notice.style.display = 'block';
                
                if (diff > State.settings.attendanceEditLimitDays) {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                    msg.style.display = 'block';
                }
            };
            window.renderAttendanceList = () => { document.getElementById('attendance-list').style.display = 'block'; }
            window.submitAttendance = () => {
                showModal(`
                    <h3 class="text-dark mb-3" style="text-align:center;">Attendance Submitted Successfully</h3>
                    <p class="text-muted mb-4" style="text-align:center;">Would you like to send an automated WhatsApp alert to the parents of absentee students?</p>
                    <div class="flex gap-2 justify-center">
                        <button class="primary-btn" onclick="closeModal(); alert('WhatsApp Triggers Initiated.');"><i class="fa-brands fa-whatsapp"></i> Send Alerts</button>
                        <button class="primary-btn danger" onclick="closeModal()">Skip</button>
                    </div>
                `);
            }
        } else if (view === 'at-risk') {
            const ptStudents = DB.roleAssignments.parentTeachers[State.currentUser.id] || [];
            const isPT = ptStudents.length > 0;
            
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark" style="color: #E74C3C;">At-Risk Analytics</h3>
                        ${isPT ? '<span class="badge badge-blue">PT Mentor View Active</span>' : ''}
                    </div>
                    
                    ${isPT ? `
                        <div class="mb-4" style="padding:15px; background:rgba(46, 204, 113, 0.05); border-radius:10px; border:1px solid var(--primary-green);">
                            <h4 class="text-primary mb-2">My Mentee Students (Parent-Teacher View)</h4>
                            <div class="table-container">
                                <table>
                                    <tr><th>ID</th><th>Name</th><th>Attendance</th><th>Results</th><th>Action</th></tr>
                                    ${DB.studentsList.filter(s => ptStudents.includes(s.id)).map(s => `
                                        <tr>
                                            <td><strong>${s.id}</strong></td>
                                            <td>${s.name}</td>
                                            <td><span class="badge badge-red">${s.att}%</span></td>
                                            <td><button class="primary-btn" style="padding:4px 8px; font-size:0.75rem;" onclick="showStudentDetailedReport('${s.id}')">Full Profile</button></td>
                                            <td><button class="primary-btn" style="padding:4px 8px; font-size:0.75rem;"><i class="fa-brands fa-whatsapp"></i> Call Parent</button></td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    ` : ''}

                    <h4 class="text-dark mb-3">General At-Risk Students</h4>
                    <div class="table-container">
                        <table>
                            <tr><th>ID</th><th>Name</th><th>Attendance</th><th>Marks Grade</th><th>Action</th></tr>
                            ${DB.studentsList.filter(s => s.att < 75 || s.marks === 'C').map(s => `
                                <tr>
                                    <td><strong class="text-dark">${s.id}</strong></td>
                                    <td>${s.name}</td>
                                    <td><span class="badge ${s.att < 75 ? 'badge-red' : 'badge-green'}">${s.att}%</span></td>
                                    <td><span class="badge ${s.marks === 'C' ? 'badge-red' : 'badge-green'}">${s.marks}</span></td>
                                    <td><button class="primary-btn" style="padding:6px 12px; font-size:0.8rem;"><i class="fa-brands fa-whatsapp"></i> Notify</button></td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            `;
        } else if (view === 'class-master') {
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <div>
                            <h3 class="text-dark"><i class="fa-solid fa-crown text-warning"></i> Class Master Panel</h3>
                            <p class="text-muted">Managing all activities for <strong>${isClassTeacher}</strong></p>
                        </div>
                        <button class="primary-btn" onclick="State.currentView='dashboard'; renderApp();">Back to Dashboard</button>
                    </div>
                    <div class="grid-3 mb-4">
                        <div class="glass-panel p-3 text-center" style="background:var(--bg-light); cursor:pointer;" onclick="alert('Opening Full Class Attendance Logs...')">
                            <i class="fa-solid fa-clipboard-list text-primary" style="font-size:2rem;"></i>
                            <h4 class="mt-2">Master Attendance</h4>
                        </div>
                        <div class="glass-panel p-3 text-center" style="background:var(--bg-light); cursor:pointer;" onclick="alert('Opening Full Class Results Matrix...')">
                            <i class="fa-solid fa-chart-column text-primary" style="font-size:2rem;"></i>
                            <h4 class="mt-2">Master Results</h4>
                        </div>
                        <div class="glass-panel p-3 text-center" style="background:var(--bg-light); cursor:pointer;" onclick="alert('Broadcasting Notice to ${isClassTeacher}...')">
                            <i class="fa-solid fa-bullhorn text-primary" style="font-size:2rem;"></i>
                            <h4 class="mt-2">Class Notice</h4>
                        </div>
                    </div>
                    <div class="table-container">
                        <h4 class="mb-3 text-dark">Class Roll Call & Performance</h4>
                        <table>
                            <tr><th>Roll No</th><th>Student Name</th><th>Avg Att.</th><th>Current CGPA</th></tr>
                            ${DB.studentsList.filter(s => s.class === isClassTeacher).map(s => `
                                <tr><td>${s.id}</td><td><strong>${s.name}</strong></td><td>${s.att}%</td><td>8.5</td></tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            `;
        } else if (view === 'results') {
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-table text-primary"></i> Multi-Subject Result Matrix</h3>
                        <div class="flex gap-2">
                            <span class="badge badge-green">Batch Entry Mode</span>
                        </div>
                    </div>
                    
                    <div class="grid-3 mb-4" style="gap:10px; padding:15px; background:var(--bg-light); border-radius:12px;">
                        <div class="form-group">
                            <label>Year</label>
                            <select class="form-control" id="res-year">
                                <option value="">Select Year</option>
                                ${AcademicData.years.map(y => `<option value="${y}">${y}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Branch</label>
                            <select class="form-control" id="res-branch">
                                <option value="">Select Branch</option>
                                ${AcademicData.branches.map(b => `<option value="${b.code}">${b.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group"><label>Division</label><select class="form-control" id="res-div"><option>A</option><option>B</option><option>C</option><option>D</option><option>E</option><option>F</option></select></div>
                    </div>

                    <button class="primary-btn w-100 mb-4" onclick="loadMultiSubjectMatrix()"><i class="fa-solid fa-layer-group"></i> Generate Result Matrix for All Subjects</button>

                    <div id="result-matrix-container" style="display:none; animation: slideIn 0.3s ease;">
                        <div style="max-height: 600px; overflow-x: auto; border: 1px solid var(--border-soft); border-radius: 12px;" class="mb-4">
                            <table id="matrix-table" style="width: 100%; border-collapse: collapse;">
                                <thead id="matrix-head" style="position: sticky; top: 0; background: white; z-index: 10;">
                                    <!-- Dynamic Headers will go here -->
                                </thead>
                                <tbody id="matrix-body">
                                    <!-- Dynamic Rows will go here -->
                                </tbody>
                            </table>
                        </div>
                        <button class="primary-btn w-100" onclick="publishBatchResults()"><i class="fa-solid fa-cloud-arrow-up"></i> Publish Batch Results</button>
                    </div>
                </div>
            `;
            window.publishBatchResults = () => {
                const year = document.getElementById('res-year').value;
                const branch = document.getElementById('res-branch').value;
                const data = AcademicData.mapping[year][branch];
                const subjects = Object.values(data.subjects).flat();
                
                // Store in DB for student portal sync
                DB.publishedResults = {
                    year, branch, subjects,
                    timestamp: new Date().toLocaleDateString()
                };
                
                alert(`Consolidated marks for ${subjects.join(', ')} published! Students can now view these in their portals.`);
            };
            window.loadMultiSubjectMatrix = () => {
                const year = document.getElementById('res-year').value;
                const branch = document.getElementById('res-branch').value;
                if (!year || !branch) return alert('Please select Year and Branch first');

                const container = document.getElementById('result-matrix-container');
                const head = document.getElementById('matrix-head');
                const body = document.getElementById('matrix-body');
                
                const data = AcademicData.mapping[year][branch];
                const subjects = Object.values(data.subjects).flat();

                // Create Header
                head.innerHTML = `
                    <tr style="background: var(--bg-light);">
                        <th style="padding:15px; text-align:left; min-width:120px;">Roll No</th>
                        <th style="text-align:left; min-width:200px;">Student Name</th>
                        ${subjects.map(s => `<th style="min-width:150px; text-align:center;">${s}</th>`).join('')}
                    </tr>
                `;

                // Create Rows
                body.innerHTML = DB.studentsList.map(stu => `
                    <tr style="border-bottom: 1px solid var(--border-soft);">
                        <td style="padding:12px 15px;"><strong>${stu.id}</strong></td>
                        <td>${stu.name}</td>
                        ${subjects.map(s => `
                            <td style="text-align:center; padding:5px;">
                                <input type="number" class="form-control" placeholder="0-20" style="width:80px; margin:0 auto; border:1px solid var(--border-soft); text-align:center;">
                            </td>
                        `).join('')}
                    </tr>
                `).join('');

                container.style.display = 'block';
                container.scrollIntoView({ behavior: 'smooth' });
            };
        } else if (view === 'weekly-schedule') {
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const times = ['09:00 AM', '10:15 AM', '11:30 AM', '01:00 PM', '02:15 PM', '03:30 PM'];
            html = `
                <div class="glass-panel p-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-calendar-week text-primary"></i> Master Weekly Timetable</h3>
                        <button class="primary-btn" style="padding:8px 15px; font-size:0.8rem;" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Schedule</button>
                    </div>
                    
                    <div class="table-container" style="overflow-x:auto;">
                        <table style="min-width:1000px; border-collapse: separate; border-spacing: 5px;">
                            <thead>
                                <tr style="background:var(--bg-light);">
                                    <th style="width:120px; text-align:center;">Time / Day</th>
                                    ${days.map(d => `<th style="text-align:center;">${d}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${times.map(t => `
                                    <tr>
                                        <td style="background:rgba(46,204,113,0.05); font-weight:800; text-align:center; color:var(--primary-green); border:1px solid var(--border-soft); border-radius:8px;">${t}</td>
                                        ${days.map(d => {
                                            const isSlot = Math.random() > 0.4;
                                            return `
                                                <td style="padding:10px; text-align:center; border:1px solid var(--border-soft); border-radius:8px; ${isSlot ? 'background:white; box-shadow:0 2px 5px rgba(0,0,0,0.02);' : 'background:var(--bg-light); opacity:0.5;'}">
                                                    ${isSlot ? `
                                                        <strong class="text-dark" style="font-size:0.85rem; display:block;">DS-IT-2A</strong>
                                                        <span class="text-muted" style="font-size:0.7rem;">Room: CR-101</span>
                                                    ` : '<span class="text-muted">-</span>'}
                                                </td>
                                            `;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <p class="text-muted mt-4" style="font-size:0.8rem; border-top:1px solid var(--border-soft); padding-top:15px;">
                        <i class="fa-solid fa-circle-info"></i> This schedule is finalized by the Academic Dean and reflects your permanent teaching load for Semester II.
                    </p>
                </div>
            `;
        } else if (view === 'profile') {
            const t = DB.teacherDetails[State.currentUser.id] || {};
            html = `
                <div class="glass-panel p-4" style="max-width:600px; margin:0 auto; text-align:center;">
                    <div style="position:relative; display:inline-block; margin-bottom:20px;">
                        <img src="${t.photo}" style="width:150px; height:150px; border-radius:50%; border:4px solid var(--primary-green); box-shadow: 0 8px 20px rgba(46,204,113,0.3);">
                        <span class="badge badge-green" style="position:absolute; bottom:10px; right:10px; padding:5px 10px; font-size:0.7rem;"><i class="fa-solid fa-circle-check"></i> Verified Faculty</span>
                    </div>
                    <h2 class="text-dark mb-1" style="font-size:2rem;">${t.name}</h2>
                    <p class="text-primary mb-4" style="font-weight:700; letter-spacing:1px; font-size:1.1rem;">${t.designation}</p>
                    
                    <div style="background:var(--bg-light); padding:25px; border-radius:15px; border:1px solid var(--border-soft); text-align:left;">
                        <div class="flex justify-between mb-3 pb-2 border-bottom">
                            <span class="text-muted">Department</span>
                            <strong class="text-dark">${t.dept}</strong>
                        </div>
                        <div class="flex justify-between mb-3 pb-2 border-bottom">
                            <span class="text-muted">Employee ID</span>
                            <strong class="text-dark">${t.id}</strong>
                        </div>
                        <div class="flex justify-between mb-3 pb-2 border-bottom">
                            <span class="text-muted">Appointment Post</span>
                            <strong class="text-primary">${(DB.staffTasks[State.currentUser.id] || {}).role || t.assignment || 'Subject Faculty'}</strong>
                        </div>
                        ${DB.staffTasks[State.currentUser.id] ? `
                            <div style="background: rgba(46, 204, 113, 0.05); padding: 15px; border-radius: 10px; border: 1px solid var(--primary-green); margin-bottom: 15px;">
                                <h4 class="text-primary mb-2"><i class="fa-solid fa-clipboard-list"></i> Assigned Duty</h4>
                                <p class="text-dark" style="font-weight: 600;">${DB.staffTasks[State.currentUser.id].task}</p>
                                <div class="flex justify-between align-center mt-2">
                                    <span class="badge ${DB.staffTasks[State.currentUser.id].status === 'Task Completed' ? 'badge-green' : 'badge-red'}">
                                        ${DB.staffTasks[State.currentUser.id].status}
                                    </span>
                                    <button class="primary-btn" style="padding:5px 10px; font-size:0.75rem;" onclick="updateTaskStatus('${State.currentUser.id}', 'Task Completed')">Mark Completed</button>
                                </div>
                            </div>
                        ` : ''}
                        <div class="flex justify-between mb-3 pb-2 border-bottom">
                            <span class="text-muted">Academic Duty</span>
                            <strong class="text-dark">${isClassTeacher ? 'Administrative Head (Class)' : (DB.staffTasks[State.currentUser.id] ? 'Task Assigned' : 'Faculty Support')}</strong>
                        </div>
                        <div class="flex justify-between mb-3 pb-2 border-bottom">
                            <span class="text-muted">Academic Year</span>
                            <strong class="text-dark">2024-25</strong>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted">Faculty Status</span>
                            <span class="badge badge-green">Active</span>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <button class="primary-btn w-100" onclick="alert('Profile Update module locked by Admin.')">Request Profile Edit</button>
                    </div>
                </div>
            `;
        } else if (view === 'swap') {
            html = `
                <div class="glass-panel p-4" style="max-width:500px; margin:0 auto;">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-right-left text-primary"></i> Lecture Swap Request</h3>
                    <form onsubmit="event.preventDefault(); alert('Swap request broadcasted to faculty portal.');">
                        <div class="form-group mb-4">
                            <label>I want to...</label>
                            <div class="flex gap-4 mt-2">
                                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="stype" value="take" checked> Take someone's lecture</label>
                                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="stype" value="give"> Give my lecture</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Target Class / Division</label>
                            <select class="form-control">
                                <option>A</option><option>B</option><option>C</option>
                                <option>D</option><option>E</option><option>F</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Subject</label>
                            <select class="form-control"><option>Web Technology</option><option>Cyber Security</option><option>Data Structures</option></select>
                        </div>
                        <div class="form-group">
                            <label>Date & Time Slot</label>
                            <div class="flex gap-2">
                                <input type="date" class="form-control" style="flex:1;">
                                <select class="form-control" style="flex:1;"><option>10:15 AM</option><option>11:30 AM</option></select>
                            </div>
                        </div>
                        <button type="submit" class="primary-btn w-100">Broadcast Request</button>
                    </form>
                </div>
            `;
        } else {
            html = `<div class="glass-panel p-4 text-center" style="padding:60px;"><h2 class="text-muted">Module Operational</h2></div>`;
        }
    }

    // Student Views
    else {
        let countdownHtml = `
            <div class="glass-panel p-4 mb-4" style="border: 1px solid var(--primary-green); box-shadow: 0 0 15px rgba(46, 204, 113, 0.4); border-radius: 12px; position: relative; overflow: hidden; animation: pulse-shadow 3s infinite; cursor: pointer;" onclick="openExamTimetableModal()">
                <div style="position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: var(--primary-green);"></div>
                <div class="flex justify-between align-center" style="flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h3 class="text-dark mb-1" style="font-size: 1.5rem;"><i class="fa-solid fa-stopwatch fa-beat-fade text-primary" style="--fa-animation-duration: 2s;"></i> DBATU End-Semester Exam (${DB.studentDetails.year})</h3>
                        <div class="flex gap-2 align-center mt-2">
                            <p class="text-muted" style="font-weight: 600; font-size: 1rem; margin:0;">Target: ${DB.studentDetails.branchName} - ${DB.studentDetails.year}</p>
                            <p class="text-primary" style="font-size:0.8rem; font-weight:700; margin-left: 10px;"><i class="fa-solid fa-lock"></i> Branch Secured Data</p>
                        </div>
                    </div>
                    <div class="flex gap-2 text-center" style="margin-left: auto; flex-wrap: wrap; justify-content: center;">
                        <div style="background: var(--primary-green); color: white; padding: 10px 15px; border-radius: 8px; min-width: 70px; box-shadow: 0 4px 10px rgba(46,204,113,0.3);">
                            <h2 id="cd-days" style="font-size: 1.8rem; margin:0;">00</h2>
                            <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Days</span>
                        </div>
                        <div style="background: var(--text-dark); color: white; padding: 10px 15px; border-radius: 8px; min-width: 70px;">
                            <h2 id="cd-hours" style="font-size: 1.8rem; margin:0;">00</h2>
                            <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Hrs</span>
                        </div>
                        <div style="background: var(--text-dark); color: white; padding: 10px 15px; border-radius: 8px; min-width: 70px;">
                            <h2 id="cd-mins" style="font-size: 1.8rem; margin:0;">00</h2>
                            <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Mins</span>
                        </div>
                        <div style="background: var(--primary-green); color: white; padding: 10px 15px; border-radius: 8px; min-width: 70px; box-shadow: 0 4px 10px rgba(46,204,113,0.3);">
                            <h2 id="cd-secs" style="font-size: 1.8rem; margin:0;">00</h2>
                            <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Secs</span>
                        </div>
                        <div class="hidden-mobile" style="display:flex; align-items:center; justify-content:center; padding-left: 10px; color: var(--primary-green);">
                            <i class="fa-regular fa-calendar-check fa-bounce" style="font-size: 2.2rem; --fa-animation-duration: 3s;"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (view === 'dashboard') {
            const overallColor = DB.studentDetails.overallAttendance >= 75 ? 'var(--primary-green)' : '#E74C3C';
            html = `
                <div class="grid-3 mb-4">
                    <div class="glass-panel p-4 text-center" style="box-shadow: 0 8px 15px rgba(0,0,0,0.05);">
                        <h4 class="text-dark mb-3">Theory Attendance</h4>
                        <div class="circular-progress" style="--percentage: ${DB.studentDetails.theoryAttendance}; --progress-color: var(--primary-green);">
                            <div class="inner-circle">${DB.studentDetails.theoryAttendance}%</div>
                        </div>
                    </div>
                    <div class="glass-panel p-4 text-center" style="box-shadow: 0 8px 15px rgba(0,0,0,0.05);">
                        <h4 class="text-dark mb-3">Practical Attendance</h4>
                        <div class="circular-progress" style="--percentage: ${DB.studentDetails.practicalAttendance}; --progress-color: #3498DB;">
                            <div class="inner-circle">${DB.studentDetails.practicalAttendance}%</div>
                        </div>
                    </div>
                    <div class="glass-panel p-4 text-center" style="border-top: 4px solid ${overallColor}; box-shadow: 0 8px 15px rgba(0,0,0,0.05);">
                        <h4 class="text-dark mb-3">Overall Attendance</h4>
                        <h2 style="font-size: 3.5rem; color: ${overallColor}; margin: 10px 0;">${DB.studentDetails.overallAttendance}%</h2>
                        <p class="text-muted" style="font-weight: 600;">${DB.studentDetails.overallAttendance >= 75 ? 'Safe Zone' : 'Critical Warning'}</p>
                    </div>
                </div>

                ${countdownHtml}

                <div class="flex align-center mb-4" style="gap: 20px; flex-wrap: wrap;">
                    <!-- About You Quick Card -->
                    <div class="glass-panel p-4 flex align-center" style="width: 100%; cursor: pointer; gap: 20px; border-radius: 12px; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.05);" onclick="openStudentProfile()" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                        <img src="${DB.studentDetails.photo}" style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid var(--primary-green); background: #fdfdfd; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <div>
                            <h3 class="text-dark mb-1" style="font-size: 1.4rem;">Welcome back, ${DB.studentDetails.name}!</h3>
                            <p class="text-primary" style="font-size: 0.95rem; font-weight: 700;">${DB.studentDetails.id} | ${DB.studentDetails.year}</p>
                            <p class="text-muted" style="font-size: 0.85rem; font-weight: 600; margin-top: 5px; color: var(--primary-green) !important;"><i class="fa-solid fa-address-card fa-flip" style="--fa-animation-duration: 4s;"></i> Click to view Full Profile</p>
                        </div>
                    </div>
                </div>
                <div class="grid-2 mb-4">
                    <div class="glass-panel p-4">
                        <h3 class="text-dark mb-4">Performance Analysis</h3>
                        <div style="height:200px; display:flex; align-items:flex-end; gap:15px; padding-bottom:20px; border-bottom:1px solid var(--border-soft);">
                            ${DB.studentDetails.results.map(r => `
                                <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%;">
                                    <span class="text-dark mb-2" style="font-size:0.85rem; font-weight:700;">${r.grade}</span>
                                    <div style="width:100%; max-width:50px; background:var(--primary-green); height:${r.external}%; border-radius:6px 6px 0 0; box-shadow: 0 4px 10px rgba(46,204,113,0.3); transition: height 1s ease-out;"></div>
                                    <span class="text-muted mt-3" style="font-size:0.7rem; text-align:center; font-weight:600; text-transform:uppercase;">${r.subject.substring(0,8)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (view === 'countdown') {
            html = countdownHtml;
        } else if (view === 'profile') {
            html = `
                <div class="glass-panel p-4 mb-4 text-center">
                    <img src="${DB.studentDetails.photo}" style="width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--primary-green); background: #fdfdfd; margin-bottom: 15px; box-shadow: 0 8px 20px rgba(46,204,113,0.3);">
                    <h3 class="text-dark mb-1" style="font-size: 1.8rem;">${DB.studentDetails.name}</h3>
                    <p class="text-primary mb-4" style="font-weight: 700; font-size: 1.1rem; letter-spacing: 1px;">ROLL NO: ${DB.studentDetails.id}</p>
                    
                    <div class="grid-2" style="gap: 20px; text-align: left;">
                        <!-- Academic Section -->
                        <div style="background: var(--bg-light); border-radius: 12px; padding: 20px; border: 1px solid var(--border-soft);">
                            <h4 class="text-primary mb-3" style="border-bottom: 2px solid var(--primary-green); padding-bottom: 5px; display: inline-block;"><i class="fa-solid fa-graduation-cap"></i> Academic Details</h4>
                            <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">PRN:</span> <strong class="text-dark">${DB.studentDetails.prn}</strong></div>
                            <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">Seat No:</span> <strong class="text-dark">${DB.studentDetails.seatNo}</strong></div>
                            <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">Branch:</span> <strong class="text-dark">${DB.studentDetails.branch}</strong></div>
                            <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">Year:</span> <strong class="text-dark">${DB.studentDetails.year} (Div ${DB.studentDetails.div})</strong></div>
                            <div class="flex justify-between"><span class="text-muted">Admission Date:</span> <strong class="text-dark">${DB.studentDetails.admissionDate}</strong></div>
                        </div>
                        
                        <!-- Personal Section -->
                        <div style="background: var(--bg-light); border-radius: 12px; padding: 20px; border: 1px solid var(--border-soft);">
                            <h4 class="text-primary mb-3" style="border-bottom: 2px solid var(--primary-green); padding-bottom: 5px; display: inline-block;"><i class="fa-solid fa-user-tag"></i> Personal Info</h4>
                            <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">DOB:</span> <strong class="text-dark">${DB.studentDetails.dob}</strong></div>
                            <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">Father's Name:</span> <strong class="text-dark">${DB.studentDetails.fatherName}</strong></div>
                            <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">Mother's Name:</span> <strong class="text-dark">${DB.studentDetails.motherName}</strong></div>
                            <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">Blood Group:</span> <strong class="text-dark" style="color: #E74C3C;">O+</strong></div>
                            <div class="flex justify-between"><span class="text-muted">Status:</span> <span class="badge badge-green">Active Scholar</span></div>
                        </div>
                    </div>
                    
                    <div style="background: var(--bg-light); border-radius: 12px; padding: 20px; border: 1px solid var(--border-soft); margin-top: 20px; text-align: left;">
                        <h4 class="text-primary mb-3" style="border-bottom: 2px solid var(--primary-green); padding-bottom: 5px; display: inline-block;"><i class="fa-solid fa-location-dot"></i> Contact & Address</h4>
                        <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">Email ID:</span> <strong class="text-dark">student@sspsit.edu.in</strong></div>
                        <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted">Mobile No:</span> <strong class="text-dark">+91 98765 43210</strong></div>
                        <div class="flex"><span class="text-muted" style="min-width: 100px;">Permanent Address:</span> <strong class="text-dark" style="margin-left: auto; text-align: right;">${DB.studentDetails.address}</strong></div>
                    </div>
                </div>
            `;
        }

        if (view === 'dashboard' || view === 'countdown') {
            // Start countdown timer logic
            if(window.examCountdownInterval) clearInterval(window.examCountdownInterval);
            
            if(!window.examDateTarget) {
                window.examDateTarget = new Date().getTime() + (14 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000); // ~14 days from now
            }
            
            window.examCountdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = window.examDateTarget - now;
                
                const dEl = document.getElementById("cd-days");
                const hEl = document.getElementById("cd-hours");
                const mEl = document.getElementById("cd-mins");
                const sEl = document.getElementById("cd-secs");
                
                if(!dEl && !hEl && !mEl && !sEl) {
                    clearInterval(window.examCountdownInterval);
                    return;
                }

                if (distance < 0) {
                    if(dEl) dEl.innerText = '00';
                    if(hEl) hEl.innerText = '00';
                    if(mEl) mEl.innerText = '00';
                    if(sEl) sEl.innerText = '00';
                    clearInterval(window.examCountdownInterval);
                    return;
                }
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                if(dEl) dEl.innerText = days < 10 ? '0' + days : days;
                if(hEl) hEl.innerText = hours < 10 ? '0' + hours : hours;
                if(mEl) mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
                if(sEl) sEl.innerText = seconds < 10 ? '0' + seconds : seconds;
            }, 1000);
            
        } else if (view === 'attendance') {
            html = `
                <div class="glass-panel p-4 mb-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-list-check text-primary"></i> Subject-wise Breakdown</h3>
                    <div class="grid-3" style="gap: 15px;">
                        ${DB.studentDetails.attendance.map(a => `
                            <div style="background:var(--bg-light); padding:25px 15px; border-radius:12px; border: 1px solid ${a.p < 75 ? '#fadbd8' : 'var(--border-soft)'}; cursor: pointer; transition: all 0.2s; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.02);" onclick="openSubjectChart('${a.subject}')" onmouseover="this.style.transform='translateY(-3px)'; this.style.borderColor='var(--primary-green)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='${a.p < 75 ? '#fadbd8' : 'var(--border-soft)'}';">
                                <h2 style="color: ${a.p < 75 ? '#E74C3C' : 'var(--primary-green)'}; margin-bottom: 5px; font-size: 2.2rem;">${a.p}%</h2>
                                <p class="text-dark" style="font-size:0.95rem; font-weight:700; margin-bottom: 10px;">${a.subject}</p>
                                <span class="text-muted" style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-magnifying-glass-chart"></i> Click to View Logs</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="glass-panel p-4">
                </div>
            `;
            
        } else if (view === 'schedule') {
            html = `
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4">Daily Schedule</h3>
                    <div class="table-container">
                        <table>
                            <tr><th>Time</th><th>Subject</th><th>Room No.</th></tr>
                            ${DB.studentDetails.schedule.map(s => `
                                <tr>
                                    <td><strong class="text-dark" style="font-size:1.05rem;">${s.time}</strong></td>
                                    <td><span style="font-weight:500;">${s.subject}</span></td>
                                    <td><span class="badge badge-blue">${s.room}</span></td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            `;
        } else if (view === 'idcard') {
            html = `
                <div class="flex" style="flex-direction:column; align-items:center; gap:30px; padding: 20px 0;">
                    <div class="id-card" id="student-id-card">
                        <div class="id-header" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 15px 10px;">
                            <img src="logo.png" style="width: 45px; height: 45px; margin-bottom: 5px; filter: brightness(0) invert(1);" onerror="this.style.display='none'">
                            <p style="font-size:0.55rem; color:rgba(255,255,255,0.9); letter-spacing:1px; text-transform:uppercase; margin-bottom: 3px;">Pratap Vidya Pratisthan's</p>
                            <h2 style="font-size:0.75rem; letter-spacing:0.5px; margin-bottom:0; font-weight:800; line-height: 1.3;">Smt. Sharadchandrika Suresh Patil<br>Institute of Technology, Chopda</h2>
                        </div>
                        <div style="background: var(--text-dark); color: white; text-align: center; font-size: 0.7rem; padding: 4px; font-weight: 700; letter-spacing: 2px;">STUDENT IDENTITY CARD</div>
                        
                        <div class="id-photo-container" style="width: 100px; height: 120px; border-radius: 8px; margin: 15px auto 10px; border: 3px solid var(--primary-green);">
                            <img src="${DB.studentDetails.photo}" alt="Student Photo" style="border-radius: 4px;">
                        </div>
                        
                        <div class="id-details" style="padding: 0 20px; text-align: left;">
                            <h3 style="font-size:1.2rem; margin-bottom:2px; text-align:center; color: var(--primary-green); text-transform: uppercase;">${DB.studentDetails.name}</h3>
                            <p style="text-align:center; font-size: 0.8rem; font-weight: 700; color: #333; margin-bottom: 15px;">${DB.studentDetails.branch} (${DB.studentDetails.year})</p>
                            
                            <table style="width: 100%; font-size: 0.75rem; line-height: 1.6; border: none;">
                                <tr><td style="width: 40%; font-weight: 700; color: #555; padding: 0;">ID No:</td><td style="font-weight: 800; color: #000; padding: 0;">${DB.studentDetails.id}</td></tr>
                                <tr><td style="font-weight: 700; color: #555; padding: 0;">DOB:</td><td style="color: #000; padding: 0;">15/08/2004</td></tr>
                                <tr><td style="font-weight: 700; color: #555; padding: 0;">Blood Group:</td><td style="color: #E74C3C; font-weight: 800; padding: 0;">O+</td></tr>
                                <tr><td style="font-weight: 700; color: #555; padding: 0;">Validity:</td><td style="color: #000; padding: 0;">2024 - 2025</td></tr>
                            </table>
                        </div>
                        
                        <div style="position: absolute; bottom: 15px; width: 100%; display: flex; justify-content: space-between; padding: 0 20px; box-sizing: border-box; align-items: flex-end;">
                            <div style="text-align: center;">
                                <div style="font-family: 'Brush Script MT', cursive; font-size: 1.2rem; color: #000; line-height: 0.5;">${DB.studentDetails.name.split(' ')[0]}</div>
                                <div style="width: 60px; height: 1px; background: #333; margin: 5px auto 2px;"></div>
                                <span style="font-size: 0.55rem; color: #555; font-weight: 700; text-transform: uppercase;">Holder's Sign</span>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-family: 'Brush Script MT', cursive; font-size: 1.2rem; color: var(--primary-green); line-height: 0.5;">Principal</div>
                                <div style="width: 60px; height: 1px; background: #333; margin: 5px auto 2px;"></div>
                                <span style="font-size: 0.55rem; color: #555; font-weight: 700; text-transform: uppercase;">Principal's Sign</span>
                            </div>
                        </div>
                    </div>
                    <button class="primary-btn" onclick="downloadIDCard()"><i class="fa-solid fa-download"></i> Download E-ID (PDF)</button>
                </div>
            `;
            
            window.downloadIDCard = () => {
                const element = document.getElementById('student-id-card');
                html2canvas(element, { backgroundColor: '#ffffff', scale: 2 }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `SSPSIT_ID_${DB.studentDetails.id}.png`;
                    link.href = canvas.toDataURL();
                    link.click();
                });
            }
        } else if (view === 'results') {
            html = `
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-graduation-cap text-primary"></i> DBATU Result Portal</h3>
                    <div class="table-container">
                        <table>
                            <tr><th>Subject</th><th>Internal Marks</th><th>Final Marks</th><th>Total Grade</th></tr>
                            ${DB.studentDetails.results.map(r => `
                                <tr>
                                    <td><strong class="text-dark">${r.subject}</strong></td>
                                    <td>${r.internal} / 40</td>
                                    <td>${r.external} / 60</td>
                                    <td><span class="badge badge-green" style="font-size:0.9rem;">${r.grade}</span></td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            `;
        } else if (view === 'library') {
            html = `
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-book-open text-primary"></i> Digital Library & Notes (${DB.studentDetails.branchCode})</h3>
                    <div class="p-3 mb-4" style="background:rgba(46, 204, 113, 0.05); border-radius:12px; border:1px solid var(--primary-green);">
                        <p style="font-size:0.85rem; color:var(--text-dark);"><i class="fa-solid fa-shield-halved"></i> Privacy Filter Active: Showing academic resources strictly for <strong>${DB.studentDetails.branchName} (${DB.studentDetails.year})</strong>.</p>
                    </div>
                    <div class="table-container">
                        <table>
                            <tr><th>Document Name</th><th>Type</th><th>Upload Date</th><th>Action</th></tr>
                            <tr>
                                <td><strong class="text-dark">Web Technology - Chapter 1 to 3</strong></td>
                                <td><span class="badge badge-blue">PDF</span></td>
                                <td>Oct 12, 2024</td>
                                <td><button class="primary-btn" style="padding:6px 12px; font-size:0.8rem;" onclick="downloadFile('Web_Technology_Notes')"><i class="fa-solid fa-download"></i> Download</button></td>
                            </tr>
                            <tr>
                                <td><strong class="text-dark">Database Systems - Practical Manual</strong></td>
                                <td><span class="badge badge-blue">PDF</span></td>
                                <td>Oct 15, 2024</td>
                                <td><button class="primary-btn" style="padding:6px 12px; font-size:0.8rem;" onclick="downloadFile('Database_Systems_Practical_Manual')"><i class="fa-solid fa-download"></i> Download</button></td>
                            </tr>
                            <tr>
                                <td><strong class="text-dark">DBATU Previous Year Questions (CS)</strong></td>
                                <td><span class="badge badge-blue">PDF</span></td>
                                <td>Oct 20, 2024</td>
                                <td><button class="primary-btn" style="padding:6px 12px; font-size:0.8rem;" onclick="downloadFile('DBATU_PYQ_CS')"><i class="fa-solid fa-download"></i> Download</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;
        } else if (view === 'contacts') {
            html = `
                <div class="glass-panel p-4 mb-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-address-book text-primary"></i> Official Faculty Contacts</h3>
                    <div class="grid-2" style="gap: 20px;">
                        <!-- Principal -->
                        <div style="background:var(--bg-light); padding:20px; border-radius:12px; border: 1px solid var(--border-soft); display:flex; align-items:center; flex-wrap:wrap; gap: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Principal" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--primary-green);">
                            <div style="flex:1; min-width: 150px;">
                                <h4 class="text-dark" style="margin-bottom: 5px; font-size: 1.1rem;">Dr. S. K. Patil</h4>
                                <p class="text-muted" style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">Principal's Desk</p>
                            </div>
                            <div class="flex gap-2">
                                <a href="tel:+919876543210" class="primary-btn" style="padding: 12px; border-radius: 50%;"><i class="fa-solid fa-phone"></i></a>
                                <a href="mailto:principal@sspsit.edu.in" class="primary-btn" style="padding: 12px; border-radius: 50%; background: var(--text-dark); border-color: var(--text-dark);"><i class="fa-solid fa-envelope"></i></a>
                            </div>
                        </div>
                
                        <!-- HOD -->
                        <div style="background:var(--bg-light); padding:20px; border-radius:12px; border: 1px solid var(--border-soft); display:flex; align-items:center; flex-wrap:wrap; gap: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=HOD" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--primary-green);">
                            <div style="flex:1; min-width: 150px;">
                                <h4 class="text-dark" style="margin-bottom: 5px; font-size: 1.1rem;">Prof. R. Deshmukh</h4>
                                <p class="text-muted" style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">HOD (${DB.studentDetails.branch})</p>
                            </div>
                            <div class="flex gap-2">
                                <a href="tel:+919876543211" class="primary-btn" style="padding: 12px; border-radius: 50%;"><i class="fa-solid fa-phone"></i></a>
                                <a href="mailto:hod.cs@sspsit.edu.in" class="primary-btn" style="padding: 12px; border-radius: 50%; background: var(--text-dark); border-color: var(--text-dark);"><i class="fa-solid fa-envelope"></i></a>
                            </div>
                        </div>
                
                        <!-- Class Teacher -->
                        <div style="background:var(--bg-light); padding:20px; border-radius:12px; border: 1px solid var(--border-soft); display:flex; align-items:center; flex-wrap:wrap; gap: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                            <img src="https://ui-avatars.com/api/?name=Dr.+Sharma&background=34495E&color=fff&size=150" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--primary-green);">
                            <div style="flex:1; min-width: 150px;">
                                <h4 class="text-dark" style="margin-bottom: 5px; font-size: 1.1rem;">Dr. A. Sharma</h4>
                                <p class="text-muted" style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">Class Teacher (Div ${DB.studentDetails.div})</p>
                            </div>
                            <div class="flex gap-2">
                                <a href="tel:+919876543212" class="primary-btn" style="padding: 12px; border-radius: 50%;"><i class="fa-solid fa-phone"></i></a>
                                <a href="mailto:ct.cs3a@sspsit.edu.in" class="primary-btn" style="padding: 12px; border-radius: 50%; background: var(--text-dark); border-color: var(--text-dark);"><i class="fa-solid fa-envelope"></i></a>
                            </div>
                        </div>
                
                        <!-- Official Support -->
                        <div style="background:var(--bg-light); padding:20px; border-radius:12px; border: 1px solid var(--border-soft); display:flex; align-items:center; flex-wrap:wrap; gap: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                            <div style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--primary-green); display:flex; align-items:center; justify-content:center; background:#fff;">
                                <i class="fa-solid fa-building-columns text-primary" style="font-size:1.5rem;"></i>
                            </div>
                            <div style="flex:1; min-width: 150px;">
                                <h4 class="text-dark" style="margin-bottom: 5px; font-size: 1.1rem;">College Administration</h4>
                                <p class="text-muted" style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase;">Official Support Email</p>
                            </div>
                            <div class="flex gap-2">
                                <a href="tel:+91251222333" class="primary-btn" style="padding: 12px; border-radius: 50%;"><i class="fa-solid fa-phone"></i></a>
                                <a href="mailto:info@sspsit.edu.in" class="primary-btn" style="padding: 12px; border-radius: 50%; background: var(--text-dark); border-color: var(--text-dark);"><i class="fa-solid fa-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (view === 'documents') {
            html = `
                <div class="glass-panel p-4 mb-4">
                    <h3 class="text-dark mb-2"><i class="fa-solid fa-file-invoice text-primary"></i> Digital Document Hub</h3>
                    <p class="text-muted mb-4" style="font-weight: 600; font-size: 0.9rem;">SSPSIT, Chopda Official Document Issuance System</p>
                    <div class="grid-2" style="gap: 20px;">
                        <div style="background:var(--bg-light); padding: 20px; border-radius: 12px; border: 1px solid var(--border-soft); border-left: 4px solid var(--primary-green); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <h4 class="text-dark mb-2">Bonafide Certificate</h4>
                            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 15px; min-height: 38px;">Required for scholarship or official verification.</p>
                            <button class="primary-btn w-100" onclick="submitDocRequest('Bonafide Certificate')">Request Now</button>
                        </div>
                        <div style="background:var(--bg-light); padding: 20px; border-radius: 12px; border: 1px solid var(--border-soft); border-left: 4px solid var(--primary-green); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <h4 class="text-dark mb-2">Fee Receipt</h4>
                            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 15px; min-height: 38px;">Download official paid fee receipt for current year.</p>
                            <button class="primary-btn w-100" onclick="submitDocRequest('Fee Receipt')">Request Now</button>
                        </div>
                        <div style="background:var(--bg-light); padding: 20px; border-radius: 12px; border: 1px solid var(--border-soft); border-left: 4px solid var(--primary-green); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <h4 class="text-dark mb-2">Bus Pass Recommendation</h4>
                            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 15px; min-height: 38px;">Official letter for ST Pass concession.</p>
                            <button class="primary-btn w-100" onclick="submitDocRequest('Bus Pass Recommendation')">Request Now</button>
                        </div>
                        <div style="background:var(--bg-light); padding: 20px; border-radius: 12px; border: 1px solid var(--border-soft); border-left: 4px solid var(--primary-green); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <h4 class="text-dark mb-2">Official Transcript</h4>
                            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 15px; min-height: 38px;">Complete DBATU academic record.</p>
                            <button class="primary-btn w-100" onclick="submitDocRequest('Official Transcript')">Request Now</button>
                        </div>
                    </div>
                </div>
                
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-bars-progress text-primary"></i> Request Status Tracker</h3>
                    <div class="table-container responsive-table">
                        <table style="width: 100%;">
                            <thead>
                                <tr><th>Request ID</th><th>Document Type</th><th>Date</th><th>Status</th><th>Action / Note</th></tr>
                            </thead>
                            <tbody>
                                ${DB.documentRequests.filter(r => r.studentId === State.currentUser.id).map(r => `
                                    <tr>
                                        <td><strong>REQ-${r.id.toString().padStart(4, '0')}</strong></td>
                                        <td><span style="font-weight: 600;">${r.type}</span></td>
                                        <td>${r.date}</td>
                                        <td>
                                            <span class="badge ${r.status === 'Ready for Collection' ? 'badge-green' : (r.status === 'Processing' ? 'badge-blue' : 'badge-red')}">
                                                ${r.status}
                                            </span>
                                        </td>
                                        <td>
                                            ${r.status === 'Ready for Collection' ? `
                                                <div style="background:rgba(46, 204, 113, 0.1); border:1px solid var(--primary-green); padding:10px; border-radius:8px; font-size:0.75rem; color:var(--text-dark);">
                                                    <i class="fa-solid fa-circle-check text-green"></i> <strong>Ready!</strong> Visit Admin Office (10 AM - 5 PM) with your ID Card.
                                                    <div style="margin-top:5px; color:#E74C3C; font-weight:700;"><i class="fa-solid fa-signature"></i> Sahi ani Shikkyasathi office madhe yene anivarya ahe.</div>
                                                </div>
                                            ` : (r.status === 'Processing' ? `
                                                <span class="text-muted" style="font-size:0.8rem;"><i class="fa-solid fa-gears fa-spin"></i> Office is processing your request...</span>
                                            ` : `
                                                <span class="text-muted" style="font-size:0.8rem;"><i class="fa-solid fa-hourglass"></i> Awaiting verification</span>
                                            `)}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            window.submitDocRequest = (docName) => {
                showModal(`
                    <div class="text-center p-4">
                        <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: var(--primary-green); margin-bottom: 20px;"></i>
                        <h3 class="text-dark mb-2">Request Submitted Successfully</h3>
                        <p class="text-muted mb-4">Your application for the <strong>${docName}</strong> has been logged in the SSPSIT, Chopda administration system.</p>
                        <button class="primary-btn w-100" onclick="closeModal()">Acknowledge</button>
                    </div>
                `);
            };
        } else if (view === 'fees') {
            html = `
                <div class="glass-panel p-4 mb-4">
                    <div class="flex justify-between align-center mb-4">
                        <h3 class="text-dark"><i class="fa-solid fa-indian-rupee-sign text-primary"></i> Fee Structure & Payments</h3>
                        <button class="primary-btn" onclick="downloadFile('Complete_Fee_Statement_2024')"><i class="fa-solid fa-download"></i> Download Latest Receipt</button>
                    </div>
                    
                    <div class="grid-2 mb-4">
                        <div style="background:var(--bg-light); padding:20px; border-radius:12px; border: 1px solid var(--border-soft); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <h4 class="text-muted" style="font-size: 0.85rem; text-transform: uppercase; margin-bottom: 5px;">Total Academic Fees</h4>
                            <h2 class="text-dark" style="font-size: 2rem;">₹ 85,000</h2>
                            <p class="text-muted" style="font-size: 0.85rem; margin-top: 5px;">Academic Year 2024-2025</p>
                        </div>
                        <div style="background:var(--bg-light); padding:20px; border-radius:12px; border-bottom: 4px solid var(--primary-green); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                            <h4 class="text-muted" style="font-size: 0.85rem; text-transform: uppercase; margin-bottom: 5px;">Fees Paid</h4>
                            <h2 style="font-size: 2rem; color: var(--primary-green);">₹ 60,000</h2>
                            <p class="text-muted" style="font-size: 0.85rem; margin-top: 5px;">Balance Pending: <strong style="color: #E74C3C;">₹ 25,000</strong></p>
                        </div>
                    </div>
                    
                    <h4 class="text-dark mb-3">Payment History</h4>
                    <div class="table-container responsive-table">
                        <table style="width: 100%;">
                            <thead>
                                <tr><th>Transaction ID</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Transaction ID"><strong>TXN-984210</strong></td>
                                    <td data-label="Date">Aug 15, 2024</td>
                                    <td data-label="Amount">₹ 40,000</td>
                                    <td data-label="Status"><span class="badge badge-green">Success</span></td>
                                    <td data-label="Action"><button class="primary-btn" style="padding: 5px 10px; font-size: 0.75rem;" onclick="downloadFile('Fee_Receipt_TXN_984210')"><i class="fa-solid fa-download"></i></button></td>
                                </tr>
                                <tr>
                                    <td data-label="Transaction ID"><strong>TXN-995432</strong></td>
                                    <td data-label="Date">Oct 02, 2024</td>
                                    <td data-label="Amount">₹ 20,000</td>
                                    <td data-label="Status"><span class="badge badge-green">Success</span></td>
                                    <td data-label="Action"><button class="primary-btn" style="padding: 5px 10px; font-size: 0.75rem;" onclick="downloadFile('Fee_Receipt_TXN_995432')"><i class="fa-solid fa-download"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else if (view === 'help-queries') {
            html = `
                <div class="glass-panel p-4 mb-4" style="border-top: 5px solid var(--primary-green);">
                    <h3 class="text-dark mb-4"><i class="fa-solid fa-paper-plane text-primary"></i> Institutional Communication Box</h3>
                    <div class="form-group mb-3">
                        <label style="font-weight:700; color:var(--text-dark);">Query Subject</label>
                        <input type="text" class="form-control" id="query-subject" placeholder="e.g. Scholarship Issue, Fee Payment Error">
                    </div>
                    <div class="form-group mb-4">
                        <label style="font-weight:700; color:var(--text-dark);">Detailed Message</label>
                        <textarea class="form-control" id="query-message" rows="6" style="resize:none; line-height:1.6;" placeholder="Describe your issue in detail for the Admin Master. Please be specific about the department or module."></textarea>
                    </div>
                    <button class="primary-btn w-100" style="padding:15px; font-size:1.1rem; border-radius:12px;" onclick="submitQuery()">🚀 Dispatch Query to Admin</button>
                </div>
                <div class="glass-panel p-4">
                    <h3 class="text-dark mb-4">Your Recent Queries</h3>
                    <div class="table-container">
                        <table>
                            <thead><tr><th>Date</th><th>Query</th><th>Status</th><th>Admin Response</th></tr></thead>
                            <tbody>
                                ${DB.queries.filter(q => q.from === State.currentUser.id).map(q => `
                                    <tr>
                                        <td>${q.date}</td>
                                        <td style="max-width:200px;">${q.message}</td>
                                        <td><span class="badge ${q.status === 'Open' ? 'badge-red' : 'badge-green'}">${q.status}</span></td>
                                        <td>${q.reply || '<span class="text-muted">Awaiting response...</span>'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            window.submitQuery = () => {
                const subject = document.getElementById('query-subject').value;
                const msg = document.getElementById('query-message').value;
                if (msg) {
                    DB.queries.push({
                        id: DB.queries.length + 1,
                        from: State.currentUser.id,
                        name: State.currentUser.role === 'student' ? DB.studentDetails.name : (DB.teacherDetails[State.currentUser.id] ? DB.teacherDetails[State.currentUser.id].name : State.currentUser.id),
                        role: State.currentUser.role,
                        message: subject ? `[${subject}] ${msg}` : msg,
                        date: new Date().toISOString().split('T')[0],
                        reply: "",
                        status: "Open"
                    });
                    showToast("Query Dispatched to Admin Office!");
                    renderApp();
                } else {
                    showToast("Please enter a message!");
                }
            };
        } else {
            html = `<div class="glass-panel p-4 text-center" style="padding:60px;"><h2 class="text-muted">Module Operational</h2></div>`;
        }
    }

    container.innerHTML = html;
}

// Modals
function showModal(contentHtml, isFullScreen = false) {
    const container = document.getElementById('modal-container');
    const modalStyle = isFullScreen ? 'width: 95%; max-width: 1400px; max-height: 95vh; overflow-y: auto;' : '';
    container.innerHTML = `
        <div class="modal-overlay active" id="modal-overlay">
            <div class="glass-panel modal-content" style="${modalStyle}">
                ${contentHtml}
            </div>
        </div>
    `;
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if(e.target.id === 'modal-overlay') closeModal();
    });
}

function closeModal() {
    document.getElementById('modal-container').innerHTML = '';
}

// Custom Modals
window.downloadFile = (fileName) => {
    const text = `--- SSPSIT, CHOPDA ---\n\nDocument: ${fileName}\nStudent: ${DB.studentDetails.name} (${DB.studentDetails.id})\nDate: ${new Date().toLocaleDateString()}\n\nThis is an officially generated document from the SSPSIT Digital ERP Portal.`;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName.replace(/ /g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
};

window.openExamTimetableModal = () => {
    showModal(`
        <div class="text-center">
            <h3 class="text-dark mb-4" style="border-bottom: 2px solid var(--border-soft); padding-bottom: 10px;">DBATU End-Semester Timetable</h3>
            <div style="background: var(--bg-light); border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h4 class="text-primary mb-2">Target Exam Date</h4>
                <h2 class="text-dark mb-1">20th May 2026</h2>
                <p class="text-muted" style="font-weight: 600;">(Estimated 20 Days Remaining)</p>
            </div>
            <div class="table-container responsive-table" style="margin-bottom: 20px;">
                <table style="width: 100%; text-align: left;">
                    <thead><tr><th>Date</th><th>Subject</th><th>Time</th></tr></thead>
                    <tbody>
                        <tr><td>20 May</td><td>Data Structures</td><td>10:00 AM</td></tr>
                        <tr><td>22 May</td><td>Operating Systems</td><td>10:00 AM</td></tr>
                        <tr><td>25 May</td><td>Computer Networks</td><td>10:00 AM</td></tr>
                    </tbody>
                </table>
            </div>
            <button class="primary-btn w-100" onclick="closeModal()">Close Timetable</button>
        </div>
    `);
};

window.openExamSettingsModal = () => {
    showModal(`
        <div class="text-center">
            <h3 class="text-dark mb-4" style="border-bottom: 2px solid var(--border-soft); padding-bottom: 10px;"><i class="fa-solid fa-sliders text-primary"></i> Exam Countdown Setup</h3>
            
            <div class="form-group mb-3" style="text-align: left;">
                <label style="font-weight: 600; color: #555;"><i class="fa-solid fa-users-rectangle text-primary"></i> Target Class / Year</label>
                <select class="form-control" style="width: 100%; font-weight: 600;" id="exam-class-select">
                    <option value="All">All Years (Global Exam)</option>
                    <option value="1st Year">1st Year Engineering</option>
                    <option value="2nd Year">2nd Year Engineering</option>
                    <option value="3rd Year">3rd Year Engineering</option>
                    <option value="4th Year">4th Year Engineering</option>
                </select>
            </div>
            
            <div class="form-group mb-3" style="text-align: left;">
                <label style="font-weight: 600; color: #555;"><i class="fa-solid fa-file-pen text-primary"></i> Exam Type</label>
                <select class="form-control" style="width: 100%; font-weight: 600;">
                    <option value="End-Semester">DBATU End-Semester Exam</option>
                    <option value="Mid-Semester">Mid-Semester (MSE)</option>
                    <option value="Practical">Practical / Oral Exams</option>
                    <option value="Unit Test">Internal Unit Test</option>
                </select>
            </div>

            <div class="form-group mb-3" style="text-align: left;">
                <label style="font-weight: 600; color: #555;"><i class="fa-regular fa-calendar-check text-primary"></i> Target Exam Date</label>
                <input type="date" class="form-control" style="width: 100%;">
            </div>
            
            <div class="form-group mb-4" style="text-align: left;">
                <label style="font-weight: 600; color: #555;"><i class="fa-solid fa-upload text-primary"></i> Upload Timetable (PDF)</label>
                <input type="file" class="form-control" style="width: 100%;">
            </div>
            
            <button class="primary-btn w-100 mb-2" onclick="const yr = document.getElementById('exam-class-select').value; closeModal(); alert('Countdown Successfully Synced for ' + yr + ' Students!')"><i class="fa-solid fa-satellite-dish fa-beat"></i> Broadcast to Students</button>
            <button class="primary-btn danger w-100" onclick="closeModal()" style="background: transparent; color: #E74C3C; box-shadow: none;">Cancel</button>
        </div>
    `);
};

window.openStudentProfile = () => {
    showModal(`
        <div class="text-center">
            <img src="${DB.studentDetails.photo}" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--primary-green); background: #fdfdfd; margin-bottom: 15px; box-shadow: 0 8px 20px rgba(46,204,113,0.3);">
            <h3 class="text-dark mb-1" style="font-size: 1.5rem;">${DB.studentDetails.name}</h3>
            <p class="text-primary mb-4" style="font-weight: 700; font-size: 1.1rem;">${DB.studentDetails.id}</p>
            
            <div style="background: var(--bg-light); border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 20px; border: 1px solid var(--border-soft); box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);">
                <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted"><i class="fa-solid fa-graduation-cap text-primary" style="width: 25px;"></i> Branch:</span> <strong class="text-dark">${DB.studentDetails.branch}</strong></div>
                <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted"><i class="fa-solid fa-layer-group text-primary" style="width: 25px;"></i> Year & Div:</span> <strong class="text-dark">${DB.studentDetails.year} - Div ${DB.studentDetails.div}</strong></div>
                <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted"><i class="fa-solid fa-envelope text-primary" style="width: 25px;"></i> Email:</span> <strong class="text-dark">student@sspsit.edu.in</strong></div>
                <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted"><i class="fa-solid fa-phone text-primary" style="width: 25px;"></i> Contact:</span> <strong class="text-dark">+91 98765 43210</strong></div>
                <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted"><i class="fa-solid fa-location-dot text-primary" style="width: 25px;"></i> City:</span> <strong class="text-dark">Chopda, Jalgaon</strong></div>
                <div class="flex justify-between mb-3 border-bottom pb-2"><span class="text-muted"><i class="fa-solid fa-droplet text-primary" style="width: 25px; color: #E74C3C;"></i> Blood Group:</span> <strong class="text-dark" style="color: #E74C3C;">O+</strong></div>
                <div class="flex justify-between"><span class="text-muted"><i class="fa-solid fa-shield-halved text-primary" style="width: 25px;"></i> Status:</span> <span class="badge badge-green">Active Scholar</span></div>
            </div>
            
            <button class="primary-btn w-100" style="padding: 12px;" onclick="closeModal()">Close Profile</button>
        </div>
    `);
};

window.openSubjectChart = (subject) => {
    const renderTable = (filter) => {
        let logs = DB.studentDetails.attendanceLog.filter(log => log.subject === subject);
        if(filter === '1month') logs = logs.filter(l => l.date.includes('Oct'));
        if(filter === '2months') logs = logs.filter(l => l.date.includes('Oct') || l.date.includes('Sep'));
        
        return logs.map(log => `
            <tr>
                <td><strong class="text-dark">${log.date}</strong></td>
                <td>${log.time}</td>
                <td>${log.type}</td>
                <td><span class="badge ${log.status === 'Present' ? 'badge-green' : 'badge-red'}" style="font-size: 0.7rem;">${log.status}</span></td>
            </tr>
        `).join('');
    };

    window.updateSubjectFilter = (val) => {
        const tbody = document.getElementById('modal-log-body');
        if(tbody) tbody.innerHTML = renderTable(val);
    };

    const subjectData = DB.studentDetails.attendance.find(a => a.subject === subject);
    const percentage = subjectData ? subjectData.p : 0;
    const initialLogs = renderTable('all');
    const total = DB.studentDetails.attendanceLog.filter(log => log.subject === subject).length;

    showModal(`
        <div style="padding: 10px;">
            <div class="flex justify-between align-center mb-4" style="border-bottom: 2px solid var(--border-soft); padding-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                <h2 class="text-dark">
                    <i class="fa-solid fa-chart-line text-primary"></i> ${subject} History 
                    <span class="badge ${percentage < 75 ? 'badge-red' : 'badge-green'}" style="margin-left: 10px;">${percentage}%</span>
                </h2>
                <div class="flex gap-2 align-center">
                    <span class="text-muted" style="font-size: 0.85rem; font-weight: 600;">Filter:</span>
                    <select class="form-control" style="width: 160px;" onchange="updateSubjectFilter(this.value)">
                        <option value="all">Full History</option>
                        <option value="1month">Last 1 Month</option>
                        <option value="2months">Last 2 Months</option>
                    </select>
                    <button class="primary-btn danger" onclick="closeModal()" style="background:rgba(231,76,60,0.1); color:#E74C3C; border:none; padding: 10px 15px;"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            
            <div class="grid-3 mb-4" style="gap: 15px;">
                <div style="background:var(--bg-light); padding:15px; border-radius:10px; border-left:4px solid var(--primary-green);">
                    <p class="text-muted mb-1" style="font-size:0.75rem; font-weight:700; text-transform:uppercase;">Attendance Stats</p>
                    <h3 class="text-dark">${percentage}% Presence</h3>
                </div>
                <div style="background:var(--bg-light); padding:15px; border-radius:10px; border-left:4px solid var(--text-dark);">
                    <p class="text-muted mb-1" style="font-size:0.75rem; font-weight:700; text-transform:uppercase;">Total Lectures</p>
                    <h3 class="text-dark">${total} Sessions</h3>
                </div>
                <div style="background:var(--bg-light); padding:15px; border-radius:10px; border-left:4px solid ${percentage < 75 ? '#E74C3C' : '#3498db'};">
                    <p class="text-muted mb-1" style="font-size:0.75rem; font-weight:700; text-transform:uppercase;">Status</p>
                    <h3 class="text-dark">${percentage < 75 ? 'Shortage!' : 'Safe'}</h3>
                </div>
            </div>

            <div class="table-container responsive-table" style="max-height: 55vh; overflow-y: auto; border: 1px solid var(--border-soft); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <table style="width: 100%;">
                    <thead style="position: sticky; top: 0; background: var(--bg-white); z-index: 10; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
                        <tr><th>Date</th><th>Time</th><th>Type</th><th>Status</th></tr>
                    </thead>
                    <tbody id="modal-log-body">
                        ${initialLogs}
                    </tbody>
                </table>
            </div>
            
            <div class="mt-4 flex justify-between align-center">
                <p class="text-muted" style="font-size: 0.8rem;"><i class="fa-solid fa-circle-info"></i> Detailed report for academic year 2024-25</p>
                <button class="primary-btn" style="padding: 12px 30px;" onclick="closeModal()">Close Report</button>
            </div>
        </div>
    `, true);
};

// Start
document.addEventListener('DOMContentLoaded', initApp);
