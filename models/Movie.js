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

  showtimes: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'movies',
  timestamps: false,
});

module.exports = Movie;
