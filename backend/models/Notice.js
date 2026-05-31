const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notice = sequelize.define('Notice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  author: {
    type: DataTypes.STRING(100),
    defaultValue: 'Admin'
  },
  category: {
    type: DataTypes.ENUM('Notice', 'Event', 'Alert'),
    defaultValue: 'Notice'
  }
}, {
  tableName: 'notices',
  timestamps: true
});

module.exports = Notice;
