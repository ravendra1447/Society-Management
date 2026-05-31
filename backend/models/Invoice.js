const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Invoice = sequelize.define('Invoice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  resident_id: { type: DataTypes.STRING(100), allowNull: false }, // Flat No
  month: { type: DataTypes.STRING(50), allowNull: false }, // e.g. "January 2026"
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  due_date: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM('Paid', 'Unpaid', 'Overdue'), defaultValue: 'Unpaid' },
  payment_method: { type: DataTypes.STRING(50), allowNull: true },
  transaction_id: { type: DataTypes.STRING(100), allowNull: true }
}, { tableName: 'invoices', timestamps: true });

module.exports = Invoice;
