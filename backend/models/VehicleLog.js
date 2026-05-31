const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const VehicleLog = sequelize.define('VehicleLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vehicle_number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  vehicle_type: {
    type: DataTypes.ENUM('Resident', 'Guest', 'Delivery', 'Vendor', 'Unknown', 'Emergency'),
    allowNull: false
  },
  entry_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  exit_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  anpr_confidence: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true // accuracy of camera read
  },
  photo_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('allowed', 'blocked', 'alert_sent'),
    allowNull: false,
    defaultValue: 'allowed'
  }
}, {
  tableName: 'vehicle_logs',
  timestamps: true
});

module.exports = VehicleLog;
