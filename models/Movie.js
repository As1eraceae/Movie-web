// models/Movie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  // Giờ chiếu (có thể lưu dưới dạng JSON hoặc chuỗi)
  showtimes: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  // Lưu đường dẫn ảnh (URL tương đối)
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Thêm cột thể loại phim
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'movies',
  timestamps: false,
});

module.exports = Movie;
