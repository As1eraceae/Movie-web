// models/Admin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: { // hoặc bạn có thể dùng email làm username
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'admin',  // bảng riêng cho admin
  timestamps: false,
});

module.exports = Admin;
