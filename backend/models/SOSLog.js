const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SOSLog = sequelize.define('SOSLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  raised_by: { type: DataTypes.STRING(100), allowNull: false }, // Flat No
  alert_type: { type: DataTypes.ENUM('Medical', 'Fire', 'Security', 'Stuck in Lift'), allowNull: false },
  status: { type: DataTypes.ENUM('Active', 'Resolved'), defaultValue: 'Active' },
}, { tableName: 'sos_logs', timestamps: true });

module.exports = SOSLog;
