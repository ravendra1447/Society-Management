const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CommunityPost = sequelize.define('CommunityPost', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  author_name: { type: DataTypes.STRING(100), allowNull: false },
  flat_no: { type: DataTypes.STRING(50), allowNull: false },
  category: { type: DataTypes.ENUM('Discussion', 'Lost & Found', 'Event', 'Notice'), defaultValue: 'Discussion' },
  content: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'community_posts', timestamps: true });

module.exports = CommunityPost;
