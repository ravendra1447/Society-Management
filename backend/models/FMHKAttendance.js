const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FMHKAttendance = sequelize.define('FMHKAttendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  staff_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  attendance_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'P'
  },
  remarks: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'fm_hk_attendance',
  timestamps: true
});

module.exports = FMHKAttendance;
