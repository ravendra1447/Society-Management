const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ClassifiedAd = sequelize.define('ClassifiedAd', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.ENUM('Furniture', 'Vehicles', 'Electronics', 'Services', 'Other'), defaultValue: 'Other' },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  seller_flat: { type: DataTypes.STRING(100), allowNull: false },
  status: { type: DataTypes.ENUM('Active', 'Sold', 'Inactive'), defaultValue: 'Active' },
}, { tableName: 'classified_ads', timestamps: true });

module.exports = ClassifiedAd;
