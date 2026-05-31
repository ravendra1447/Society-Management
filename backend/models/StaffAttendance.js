const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StaffAttendance = sequelize.define('StaffAttendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: true // Can be a FK to a Staff Master table later
  },
  staff_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  in_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  out_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  total_hours: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true
  },
  shift_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'morning'
  },
  overtime_hours: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true
  },
  location_lat: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  location_lng: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'present'
  },
  qr_code: {
    type: DataTypes.STRING(64),
    allowNull: true
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'staff_attendance',
  timestamps: true // adds createdAt and updatedAt
});

module.exports = StaffAttendance;
