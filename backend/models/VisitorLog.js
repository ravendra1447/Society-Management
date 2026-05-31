const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const VisitorLog = sequelize.define('VisitorLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  visitor_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  photo_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  id_proof_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  visitor_type: {
    type: DataTypes.ENUM('guest', 'delivery', 'service'),
    allowNull: false,
    defaultValue: 'guest'
  },
  resident_id: {
    type: DataTypes.INTEGER, // Which resident they are visiting
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'denied', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  in_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  out_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  qr_pass_code: {
    type: DataTypes.STRING(128),
    allowNull: true
  }
}, {
  tableName: 'visitor_logs',
  timestamps: true
});

module.exports = VisitorLog;
