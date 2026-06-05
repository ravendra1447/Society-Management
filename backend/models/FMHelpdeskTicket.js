const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FMHelpdeskTicket = sequelize.define('FMHelpdeskTicket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ticket_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Open'
  },
  remark: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  report_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'fm_helpdesk_tickets',
  timestamps: true
});

module.exports = FMHelpdeskTicket;
