const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Showtime = sequelize.define('Showtime', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'showtimes',
  timestamps: false,
});

module.exports = Showtime;
