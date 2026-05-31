const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StockTransaction = sequelize.define('StockTransaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_id_barcode: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  transaction_type: {
    type: DataTypes.ENUM('IN', 'OUT'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  in_from: {
    type: DataTypes.STRING(200), // Vendor name or PO number
    allowNull: true
  },
  out_to_staff_id: {
    type: DataTypes.INTEGER, // Staff who received the item
    allowNull: true
  },
  purpose: {
    type: DataTypes.STRING(255), // Work order reference
    allowNull: true
  },
  balance_after: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  approved_by: {
    type: DataTypes.INTEGER, // FM ID
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  cost_per_unit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  total_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  tableName: 'stock_transactions',
  timestamps: true
});

module.exports = StockTransaction;
