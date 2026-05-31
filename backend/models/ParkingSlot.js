const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ParkingSlot = sequelize.define('ParkingSlot', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  slot_number: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  assigned_flat: { type: DataTypes.STRING(50) },
  vehicle_number: { type: DataTypes.STRING(50) },
  status: { type: DataTypes.ENUM('Vacant', 'Occupied', 'Violation'), defaultValue: 'Vacant' }
}, { tableName: 'parking_slots', timestamps: true });

module.exports = ParkingSlot;
