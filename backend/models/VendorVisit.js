const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const VendorVisit = sequelize.define('VendorVisit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vendor_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  purpose: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  request_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Working'
  },
  approved_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  pass_code: {
    type: DataTypes.STRING(64),
    allowNull: true
  }
}, {
  tableName: 'vendor_visits',
  timestamps: true
});

module.exports = VendorVisit;
