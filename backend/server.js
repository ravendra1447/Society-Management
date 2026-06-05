const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, testDbConnection } = require('./config/db');
const StaffAttendance = require('./models/StaffAttendance');
const VendorVisit = require('./models/VendorVisit');
const StockTransaction = require('./models/StockTransaction');
const VisitorLog = require('./models/VisitorLog');
const VehicleLog = require('./models/VehicleLog');
const Notice = require('./models/Notice');
const Complaint = require('./models/Complaint');
const SOSLog = require('./models/SOSLog');
const FMDailyTask = require('./models/FMDailyTask');
const FMHelpdeskTicket = require('./models/FMHelpdeskTicket');
const FMDailyReading = require('./models/FMDailyReading');
const FMHKAttendance = require('./models/FMHKAttendance');
const FMMoveLog = require('./models/FMMoveLog');
const Poll = require('./models/Poll');
const ClassifiedAd = require('./models/ClassifiedAd');
const User = require('./models/User');
const Invoice = require('./models/Invoice');
const syncDatabase = require('./syncDb');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
const bodyParserLimit = '20mb';
app.use(express.json({ limit: bodyParserLimit }));
app.use(express.urlencoded({ extended: true, limit: bodyParserLimit }));

// Connect to DB and sync models
const initDb = async () => {
  try {
    await testDbConnection();
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
    
    // Seed default admin user if none exists
    const adminExists = await User.findOne({ where: { role: 'Admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        username: 'admin',
        email: 'admin@society.com',
        password: hashedPassword,
        role: 'Admin',
        name: 'Super Admin',
        phone: '9999999999',
        assigned_modules: ['users', 'staff', 'vendor', 'resident', 'notices', 'complaints', 'inventory', 'polls', 'billing', 'facilities', 'parking', 'security', 'classifieds']
      });
      console.log('Default Admin created: admin / password123 / admin@society.com');
    } else {
      // Re-hash password if it's stored as plain text
      if (adminExists.username === 'admin' && adminExists.password === 'password123') {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await adminExists.update({ password: hashedPassword });
        console.log('Default Admin password was hashed securely.');
      }
    }
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

initDb();

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Society Management API' });
});

// --- API Routes for IN/OUT System ---

// Staff IN/OUT Routes
app.get('/api/staff', async (req, res) => {
  try {
    const staff = await StaffAttendance.findAll({ order: [['createdAt', 'DESC']] });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/staff/in', async (req, res) => {
  try {
    const { staff_name, role, shift_type, shift, status, location_lat, location_lng, qr_code } = req.body;
    const log = await StaffAttendance.create({ 
      staff_name, 
      role: role || 'electrician', 
      shift_type: shift_type || shift || 'morning', 
      status: status || 'present', 
      location_lat, 
      location_lng, 
      qr_code, 
      in_time: new Date() 
    });
    res.json(log);
  } catch (err) {
    console.error('Staff creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/staff/out/:id', async (req, res) => {
  try {
    const log = await StaffAttendance.findByPk(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    
    const outTime = new Date();
    const inTime = new Date(log.in_time);
    const diffMs = outTime - inTime;
    const total_hours = (diffMs / (1000 * 60 * 60)).toFixed(2);
    
    await log.update({ 
      out_time: outTime, 
      total_hours: parseFloat(total_hours),
      status: 'present' // Or keep existing status
    });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete staff record
app.delete('/api/staff/:id', async (req, res) => {
  try {
    const log = await StaffAttendance.findByPk(req.params.id);
    if (!log) return res.status(404).json({ error: 'Staff not found' });
    await log.destroy();
    res.json({ message: 'Staff record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vendor Visit Routes
app.get('/api/vendors', async (req, res) => {
  try {
    const vendors = await VendorVisit.findAll();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/vendor/visit-request', async (req, res) => {
  try {
    const { vendor_name, purpose, status } = req.body;
    const visit = await VendorVisit.create({ vendor_name, purpose, request_time: new Date(), status });
    res.json(visit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stock Routes
app.get('/api/stock', async (req, res) => {
  try {
    const stock = await StockTransaction.findAll();
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/stock/transaction', async (req, res) => {
  try {
    const { item_id_barcode, transaction_type, quantity, balance_after } = req.body;
    const trans = await StockTransaction.create({ item_id_barcode, transaction_type, quantity, balance_after });
    res.json(trans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Visitor Gate Management Routes
app.get('/api/visitors', async (req, res) => {
  try {
    const visitors = await VisitorLog.findAll();
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/visitor/entry', async (req, res) => {
  try {
    const { visitor_name, visitor_type, resident_id, status } = req.body;
    const visit = await VisitorLog.create({ visitor_name, visitor_type, resident_id, status, in_time: new Date() });
    res.json(visit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vehicle ANPR Routes
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await VehicleLog.findAll();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/vehicle/log', async (req, res) => {
  try {
    const { vehicle_number, vehicle_type, status, anpr_confidence } = req.body;
    const log = await VehicleLog.create({ vehicle_number, vehicle_type, status, anpr_confidence, entry_time: new Date() });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SOS Routes
app.get('/api/sos', async (req, res) => {
  try {
    const logs = await SOSLog.findAll({ order: [['createdAt', 'DESC']] });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sos', async (req, res) => {
  try {
    const { raised_by, alert_type } = req.body;
    const log = await SOSLog.create({ raised_by, alert_type, status: 'Active' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/sos/:id/resolve', async (req, res) => {
  try {
    const log = await SOSLog.findByPk(req.params.id);
    if (!log) return res.status(404).json({ error: 'SOS log not found' });
    await log.update({ status: 'Resolved' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FM Daily Work Routes
app.get('/api/fm/tasks', async (req, res) => {
  try {
    const tasks = await FMDailyTask.findAll({ order: [['createdAt', 'DESC']] });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fm/tasks', async (req, res) => {
  try {
    const { date, work_title, description, assigned_staff, status, priority, completion_time, remarks, photo_data } = req.body;
    const task = await FMDailyTask.create({ date, work_title, description, assigned_staff, status, priority, completion_time, remarks, photo_data });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/fm/readings', async (req, res) => {
  try {
    const readings = await FMDailyReading.findAll({ order: [['createdAt', 'DESC']] });
    res.json(readings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fm/readings', async (req, res) => {
  try {
    const { asset, value, note, reading_date } = req.body;
    const reading = await FMDailyReading.create({ asset, value, note, reading_date });
    res.json(reading);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/fm/helpdesk', async (req, res) => {
  try {
    const tickets = await FMHelpdeskTicket.findAll({ order: [['createdAt', 'DESC']] });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fm/helpdesk', async (req, res) => {
  try {
    const { ticket_id, status, remark, report_date } = req.body;
    const ticket = await FMHelpdeskTicket.create({ ticket_id, status, remark, report_date });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/fm/attendance', async (req, res) => {
  try {
    const attendance = await FMHKAttendance.findAll({ order: [['createdAt', 'DESC']] });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fm/attendance', async (req, res) => {
  try {
    const { staff_name, attendance_date, status, remarks } = req.body;
    const record = await FMHKAttendance.create({ staff_name, attendance_date, status, remarks });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/fm/move-logs', async (req, res) => {
  try {
    const logs = await FMMoveLog.findAll({ order: [['createdAt', 'DESC']] });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fm/move-logs', async (req, res) => {
  try {
    const { type, flat, move_date, note } = req.body;
    const log = await FMMoveLog.create({ type, flat, move_date, note });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard Stats (Aggregated)
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const activeStaffCount = await StaffAttendance.count({ where: { status: 'present' } });
    const totalStaffCount = await StaffAttendance.count();
    const visitorCount = await VisitorLog.count();
    const vehicleCount = await VehicleLog.count();
    const totalUsers = await User.count();
    
    // Gate Entries = visitors + vehicles today
    const gateEntries = visitorCount + vehicleCount;
    
    // Pending Approvals = Open Complaints
    const pendingApprovalsCount = await Complaint.count({ where: { status: 'Open' } });
    
    res.json({ 
      activeStaff: activeStaffCount, 
      totalStaff: totalStaffCount > 0 ? totalStaffCount : 60,
      gateEntries: gateEntries > 0 ? gateEntries : 0,
      pendingApprovals: pendingApprovalsCount,
      totalUsers: totalUsers,
      totalVisitors: visitorCount,
      totalVehicles: vehicleCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dynamic Activity Feed
app.get('/api/dashboard/activity', async (req, res) => {
  try {
    const visitors = await VisitorLog.findAll({ order: [['createdAt', 'DESC']], limit: 3 });
    const complaints = await Complaint.findAll({ order: [['createdAt', 'DESC']], limit: 3 });
    const invoices = await Invoice.findAll({ order: [['createdAt', 'DESC']], limit: 3 });
    const notices = await Notice.findAll({ order: [['createdAt', 'DESC']], limit: 3 });
    const users = await User.findAll({ order: [['createdAt', 'DESC']], limit: 3, attributes: { exclude: ['password'] } });

    let activities = [];

    visitors.forEach(v => activities.push({ 
      id: `vis-${v.id}`, type: 'visitor', title: 'New visitor entry', 
      desc: `${v.visitor_name} (${v.visitor_type})`, timestamp: v.createdAt || new Date() 
    }));
    complaints.forEach(c => activities.push({ 
      id: `cmp-${c.id}`, type: 'complaint', title: 'Complaint Logged', 
      desc: c.title, timestamp: c.createdAt || new Date() 
    }));
    invoices.forEach(i => activities.push({ 
      id: `inv-${i.id}`, type: 'invoice', title: 'Invoice Generated', 
      desc: `Amount: ₹${i.amount} for ${i.month}`, timestamp: i.createdAt || new Date() 
    }));
    notices.forEach(n => activities.push({ 
      id: `not-${n.id}`, type: 'notice', title: 'System Alert / Notice', 
      desc: n.title, timestamp: n.createdAt || new Date() 
    }));
    users.forEach(u => activities.push({ 
      id: `usr-${u.id}`, type: 'user', title: 'New User Created', 
      desc: `${u.name} (${u.role})`, timestamp: u.createdAt || new Date() 
    }));

    // Sort descending by timestamp
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Return top 6
    res.json(activities.slice(0, 6));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Notice Board Routes
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.findAll({ order: [['createdAt', 'DESC']] });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/notices', async (req, res) => {
  try {
    const { title, content, category, author } = req.body;
    const notice = await Notice.create({ title, content, category, author, date: new Date() });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complaints Routes
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.findAll({ order: [['createdAt', 'DESC']] });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/complaints', async (req, res) => {
  try {
    const { title, description, category, raised_by } = req.body;
    const complaint = await Complaint.create({ title, description, category, raised_by, status: 'Open' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Polls Routes
app.get('/api/polls', async (req, res) => {
  try {
    const polls = await Poll.findAll({ order: [['createdAt', 'DESC']] });
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Classifieds Routes
app.get('/api/classifieds', async (req, res) => {
  try {
    const ads = await ClassifiedAd.findAll({ order: [['createdAt', 'DESC']] });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Invoices Routes
app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.findAll({ order: [['createdAt', 'DESC']] });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/invoices', async (req, res) => {
  try {
    const { resident_id, month, amount, due_date, status, payment_method, transaction_id } = req.body;
    const invoice = await Invoice.create({ resident_id, month, amount, due_date, status, payment_method, transaction_id });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- User Management (Admin Only) ---
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] }, order: [['createdAt', 'DESC']] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password, role, name, phone, flat_no, assigned_modules } = req.body;
    
    // Validate required fields
    if (!username || !password || !name || !role) {
      return res.status(400).json({ error: 'Name, Username, Password and Role are required' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists. Choose another.' });
    }

    // Check if email already exists (if provided)
    if (email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already registered.' });
      }
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role, name, phone, flat_no, assigned_modules });
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error('User creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, email, role, phone, flat_no, status, assigned_modules, password } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (phone) updateData.phone = phone;
    if (flat_no) updateData.flat_no = flat_no;
    if (status) updateData.status = status;
    if (assigned_modules) updateData.assigned_modules = assigned_modules;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    await user.update(updateData);
    const userJson = user.toJSON();
    delete userJson.password;
    res.json(userJson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Prevent deleting the last admin
    if (user.role === 'Admin') {
      const adminCount = await User.count({ where: { role: 'Admin' } });
      if (adminCount <= 1) {
        return res.status(400).json({ error: 'Cannot delete the last Admin account.' });
      }
    }
    
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle user status (Active/Inactive)
app.patch('/api/users/:id/status', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    await user.update({ status: newStatus });
    
    const userJson = user.toJSON();
    delete userJson.password;
    res.json(userJson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Real Authentication Login Route - supports username OR email
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username/Email and Password are required' });
    }
    
    // Find user by username OR email
    const user = await User.findOne({ 
      where: { 
        [Op.or]: [
          { username: username },
          { email: username }
        ]
      } 
    });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found. Check your username or email.' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && user.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    if (user.password === password) {
      // Migrate plain text password to hashed format if needed
      user.password = await bcrypt.hash(password, 10);
      await user.save();
    }

    if (user.status !== 'Active') {
      return res.status(403).json({ error: 'Account is inactive. Contact admin.' });
    }
    
    // Return user details without password
    res.json({ 
      id: user.id, 
      name: user.name, 
      role: user.role, 
      username: user.username, 
      email: user.email,
      phone: user.phone,
      flat_no: user.flat_no,
      assigned_modules: user.assigned_modules 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
