const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Complaint = sequelize.define('Complaint', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.ENUM('Electrical', 'Plumbing', 'Housekeeping', 'Security', 'Other'), defaultValue: 'Other' },
  status: { type: DataTypes.ENUM('Open', 'In Progress', 'Resolved', 'Closed'), defaultValue: 'Open' },
  raised_by: { type: DataTypes.STRING(100), allowNull: false }, // Flat No or Resident Name
  assigned_to: { type: DataTypes.STRING(100), allowNull: true }, // Staff Name
  resolution_notes: { type: DataTypes.TEXT, allowNull: true },
}, { tableName: 'complaints', timestamps: true });

module.exports = Complaint;
