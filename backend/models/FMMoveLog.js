const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FMMoveLog = sequelize.define('FMMoveLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  flat: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  move_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'fm_move_logs',
  timestamps: true
});

module.exports = FMMoveLog;
