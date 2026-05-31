const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Poll = sequelize.define('Poll', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.TEXT, allowNull: false },
  option_a: { type: DataTypes.STRING(255), allowNull: false },
  option_b: { type: DataTypes.STRING(255), allowNull: false },
  votes_a: { type: DataTypes.INTEGER, defaultValue: 0 },
  votes_b: { type: DataTypes.INTEGER, defaultValue: 0 },
  created_by: { type: DataTypes.STRING(100), defaultValue: 'Admin' },
  status: { type: DataTypes.ENUM('Active', 'Closed'), defaultValue: 'Active' },
}, { tableName: 'polls', timestamps: true });

module.exports = Poll;
