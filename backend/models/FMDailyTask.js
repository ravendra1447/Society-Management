const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FMDailyTask = sequelize.define('FMDailyTask', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  work_title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  assigned_staff: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'medium'
  },
  completion_time: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  photo_data: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  }
}, {
  tableName: 'fm_daily_tasks',
  timestamps: true
});

module.exports = FMDailyTask;
