const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SocietyDocument = sequelize.define('SocietyDocument', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  document_url: { type: DataTypes.STRING(500), allowNull: false },
  category: { type: DataTypes.ENUM('Bye-Laws', 'Audit Report', 'MOM', 'Safety Certificate', 'Other'), defaultValue: 'Other' },
  uploaded_by: { type: DataTypes.STRING(100), defaultValue: 'Admin' },
}, { tableName: 'society_documents', timestamps: true });

module.exports = SocietyDocument;
