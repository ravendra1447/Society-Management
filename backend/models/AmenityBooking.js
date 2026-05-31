const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const AmenityBooking = sequelize.define('AmenityBooking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  amenity_name: { type: DataTypes.STRING(100), allowNull: false },
  booking_date: { type: DataTypes.DATEONLY, allowNull: false },
  time_slot: { type: DataTypes.STRING(50), allowNull: false },
  status: { type: DataTypes.ENUM('Confirmed', 'Cancelled'), defaultValue: 'Confirmed' }
}, { tableName: 'amenity_bookings', timestamps: true });

module.exports = AmenityBooking;
