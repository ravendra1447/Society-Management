const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FMDailyReading = sequelize.define('FMDailyReading', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  asset: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  value: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  reading_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'fm_daily_readings',
  timestamps: true
});

module.exports = FMDailyReading;
