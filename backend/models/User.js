const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(255), allowNull: true, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { 
    type: DataTypes.ENUM(
      'Admin', 
      'Facility Manager', 
      'Security Guard', 
      'Electrician', 
      'Plumber', 
      'Housekeeping Supvr', 
      'Vendor', 
      'Resident'
    ), 
    allowNull: false 
  },
  name: { type: DataTypes.STRING(255), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  flat_no: { type: DataTypes.STRING(50), allowNull: true },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
  assigned_modules: { type: DataTypes.JSON, allowNull: true },
}, { tableName: 'users', timestamps: true });

module.exports = User;
