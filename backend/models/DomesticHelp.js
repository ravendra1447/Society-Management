const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DomesticHelp = sequelize.define('DomesticHelp', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  category: { type: DataTypes.ENUM('Maid', 'Cook', 'Driver', 'Nanny'), allowNull: false },
  contact: { type: DataTypes.STRING(50), allowNull: false },
  assigned_flat: { type: DataTypes.STRING(100), allowNull: false },
  status: { type: DataTypes.ENUM('Active', 'Inactive', 'Banned'), defaultValue: 'Active' },
}, { tableName: 'domestic_helps', timestamps: true });

module.exports = DomesticHelp;
