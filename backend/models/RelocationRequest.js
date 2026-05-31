const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RelocationRequest = sequelize.define('RelocationRequest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  flat_no: { type: DataTypes.STRING(100), allowNull: false },
  resident_name: { type: DataTypes.STRING(255), allowNull: false },
  relocation_type: { type: DataTypes.ENUM('Move In', 'Move Out'), allowNull: false },
  shifting_date: { type: DataTypes.DATEONLY, allowNull: false },
  packer_details: { type: DataTypes.STRING(255), allowNull: true },
  status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
}, { tableName: 'relocation_requests', timestamps: true });

module.exports = RelocationRequest;
