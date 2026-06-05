const { sequelize } = require('./config/db');

// Import all models to ensure they are registered with Sequelize
require('./models/StaffAttendance');
require('./models/VendorVisit');
require('./models/StockTransaction');
require('./models/VisitorLog');
require('./models/VehicleLog');
require('./models/Notice');
require('./models/Complaint');
require('./models/Invoice');
require('./models/AmenityBooking');
require('./models/DomesticHelp');
require('./models/SOSLog');
require('./models/FMDailyTask');
require('./models/FMHelpdeskTicket');
require('./models/FMDailyReading');
require('./models/FMHKAttendance');
require('./models/FMMoveLog');
require('./models/ClassifiedAd');
require('./models/Poll');
require('./models/RelocationRequest');
require('./models/SocietyDocument');
require('./models/User');
require('./models/GuardPatrol');
require('./models/CommunityPost');
require('./models/ParkingSlot');

const syncDatabase = async () => {
  try {
    // Attempt to authenticate first
    await sequelize.authenticate();
    console.log('✅ Connection to MySQL has been established successfully.');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('✅ Complete Database & Tables have been synced successfully!');
    
  } catch (error) {
    console.error('❌ Unable to connect or sync the database:', error);
  }
};

module.exports = syncDatabase;
