-- SSPSIT ERP Portal - Database Schema

-- Staff Table
CREATE TABLE staff (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    position VARCHAR(50), -- Associate Professor, etc.
    designation VARCHAR(100), -- HOD (Year 3), Class Teacher (Year 1)
    assigned_year VARCHAR(10), -- 1, 2, 3, 4
    photo_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Active', -- Active, Blocked
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipient_id VARCHAR(20),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES staff(id) ON DELETE CASCADE
);

-- Students Table (for admin management)
CREATE TABLE students (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    branch VARCHAR(50),
    year VARCHAR(10),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
