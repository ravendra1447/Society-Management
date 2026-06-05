-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS society_management;
USE society_management;

-- 1. Staff Attendance Table
CREATE TABLE IF NOT EXISTS staff_attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT,
    staff_name VARCHAR(100) NOT NULL,
    role ENUM('electrician', 'plumber', 'housekeeping', 'FM') NOT NULL,
    in_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    out_time DATETIME NULL,
    total_hours DECIMAL(4,2) NULL,
    shift_type ENUM('morning', 'evening', 'night') NOT NULL,
    overtime_hours DECIMAL(4,2) NULL,
    location_lat DECIMAL(10,7) NULL,
    location_lng DECIMAL(10,7) NULL,
    status ENUM('present', 'late', 'absent', 'half-day') DEFAULT 'present',
    qr_code VARCHAR(64) NULL,
    remarks TEXT NULL,
    created_by INT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Vendor Visits Table
CREATE TABLE IF NOT EXISTS vendor_visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_name VARCHAR(255) NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    request_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    in_time DATETIME NULL,
    out_time DATETIME NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Stock Transactions Table
CREATE TABLE IF NOT EXISTS stock_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id_barcode VARCHAR(255) NOT NULL,
    transaction_type ENUM('IN', 'OUT') NOT NULL,
    quantity INT NOT NULL,
    transaction_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    balance_after INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Visitor Logs Table
CREATE TABLE IF NOT EXISTS visitor_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    visitor_name VARCHAR(255) NOT NULL,
    visitor_type ENUM('Guest', 'Delivery', 'Service') NOT NULL,
    resident_id VARCHAR(255) NOT NULL,
    in_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    out_time DATETIME NULL,
    status ENUM('Pending', 'Approved', 'Rejected', 'Inside', 'CheckedOut') DEFAULT 'Pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Vehicle Logs (ANPR) Table
CREATE TABLE IF NOT EXISTS vehicle_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(100) NOT NULL,
    vehicle_type ENUM('Resident', 'Visitor', 'Commercial', 'Unknown') DEFAULT 'Unknown',
    entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    exit_time DATETIME NULL,
    anpr_confidence DECIMAL(5,2) DEFAULT NULL,
    status ENUM('allowed', 'blocked') DEFAULT 'allowed',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Notices & Events Table
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    author VARCHAR(100) DEFAULT 'Admin',
    category ENUM('Notice', 'Event', 'Alert') DEFAULT 'Notice',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Complaints Table
CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('Electrical', 'Plumbing', 'Housekeeping', 'Security', 'Other') DEFAULT 'Other',
    status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
    raised_by VARCHAR(100) NOT NULL,
    assigned_to VARCHAR(100) NULL,
    resolution_notes TEXT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 8. Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resident_id VARCHAR(100) NOT NULL,
    month VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('Paid', 'Unpaid', 'Overdue') DEFAULT 'Unpaid',
    payment_method VARCHAR(50) NULL,
    transaction_id VARCHAR(100) NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 9. Amenity Bookings Table
CREATE TABLE IF NOT EXISTS amenity_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amenity_name ENUM('Clubhouse', 'Swimming Pool', 'Tennis Court', 'Gym', 'Banquet Hall') NOT NULL,
    resident_id VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status ENUM('Pending', 'Approved', 'Cancelled') DEFAULT 'Pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 10. Domestic Helps Table
CREATE TABLE IF NOT EXISTS domestic_helps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category ENUM('Maid', 'Cook', 'Driver', 'Nanny') NOT NULL,
    contact VARCHAR(50) NOT NULL,
    assigned_flat VARCHAR(100) NOT NULL,
    status ENUM('Active', 'Inactive', 'Banned') DEFAULT 'Active',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 11. SOS Logs Table
CREATE TABLE IF NOT EXISTS sos_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    raised_by VARCHAR(100) NOT NULL,
    alert_type ENUM('Medical', 'Fire', 'Security', 'Stuck in Lift') NOT NULL,
    status ENUM('Active', 'Resolved') DEFAULT 'Active',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 12. FM Daily Tasks Table
CREATE TABLE IF NOT EXISTS fm_daily_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    work_title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    assigned_staff VARCHAR(150) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(50) DEFAULT 'medium',
    completion_time VARCHAR(50) NULL,
    remarks TEXT NULL,
    photo_data LONGTEXT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 13. FM Daily Readings Table
CREATE TABLE IF NOT EXISTS fm_daily_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset VARCHAR(150) NOT NULL,
    value VARCHAR(100) NOT NULL,
    note VARCHAR(255) NULL,
    reading_date DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 14. FM Helpdesk Tickets Table
CREATE TABLE IF NOT EXISTS fm_helpdesk_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'Open',
    remark TEXT NULL,
    report_date DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 15. FM HK Attendance Table
CREATE TABLE IF NOT EXISTS fm_hk_attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_name VARCHAR(150) NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'P',
    remarks VARCHAR(255) NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 16. FM Move Logs Table
CREATE TABLE IF NOT EXISTS fm_move_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    flat VARCHAR(100) NOT NULL,
    move_date DATE NOT NULL,
    note VARCHAR(255) NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 12. Classified Ads Table
CREATE TABLE IF NOT EXISTS classified_ads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('Furniture', 'Vehicles', 'Electronics', 'Services', 'Other') DEFAULT 'Other',
    price DECIMAL(10, 2) NULL,
    seller_flat VARCHAR(100) NOT NULL,
    status ENUM('Active', 'Sold', 'Inactive') DEFAULT 'Active',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 13. Polls Table
CREATE TABLE IF NOT EXISTS polls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    votes_a INT DEFAULT 0,
    votes_b INT DEFAULT 0,
    created_by VARCHAR(100) DEFAULT 'Admin',
    status ENUM('Active', 'Closed') DEFAULT 'Active',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 14. Relocation Requests Table
CREATE TABLE IF NOT EXISTS relocation_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flat_no VARCHAR(100) NOT NULL,
    resident_name VARCHAR(255) NOT NULL,
    relocation_type ENUM('Move In', 'Move Out') NOT NULL,
    shifting_date DATE NOT NULL,
    packer_details VARCHAR(255) NULL,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 15. Society Documents Table
CREATE TABLE IF NOT EXISTS society_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    category ENUM('Bye-Laws', 'Audit Report', 'MOM', 'Safety Certificate', 'Other') DEFAULT 'Other',
    uploaded_by VARCHAR(100) DEFAULT 'Admin',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 16. Users Table (Authentication & RBAC)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Facility Manager', 'Security Guard', 'Electrician', 'Plumber', 'Housekeeping Supvr', 'Vendor', 'Resident') NOT NULL,
    name VARCHAR(255) NOT NULL,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default Super Admin (Ignore if already exists)
INSERT IGNORE INTO users (username, password, role, name, status) VALUES ('admin', 'password123', 'Admin', 'Super Admin', 'Active');

-- 17. Amenity Bookings Table
CREATE TABLE IF NOT EXISTS amenity_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amenity_name VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status ENUM('Confirmed', 'Cancelled') DEFAULT 'Confirmed',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 18. Guard Patrols Table
CREATE TABLE IF NOT EXISTS guard_patrols (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guard_name VARCHAR(100) NOT NULL,
    checkpoint_name VARCHAR(100) NOT NULL,
    status ENUM('Checked', 'Missed') DEFAULT 'Checked',
    notes VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 19. Community Posts Table (Forum)
CREATE TABLE IF NOT EXISTS community_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    flat_no VARCHAR(50) NOT NULL,
    category ENUM('Discussion', 'Lost & Found', 'Event', 'Notice') DEFAULT 'Discussion',
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 20. Parking Slots Table
CREATE TABLE IF NOT EXISTS parking_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_number VARCHAR(50) NOT NULL UNIQUE,
    assigned_flat VARCHAR(50),
    vehicle_number VARCHAR(50),
    status ENUM('Vacant', 'Occupied', 'Violation') DEFAULT 'Vacant',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);