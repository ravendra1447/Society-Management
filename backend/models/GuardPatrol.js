const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const GuardPatrol = sequelize.define('GuardPatrol', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  guard_name: { type: DataTypes.STRING(100), allowNull: false },
  checkpoint_name: { type: DataTypes.STRING(100), allowNull: false },
  status: { type: DataTypes.ENUM('Checked', 'Missed'), defaultValue: 'Checked' },
  notes: { type: DataTypes.STRING(255) }
}, { tableName: 'guard_patrols', timestamps: true });

module.exports = GuardPatrol;
