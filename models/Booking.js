
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./Movie');
const User = require('./User');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  showtime: DataTypes.STRING,
  seat: DataTypes.STRING,
}, {
  tableName: 'bookings',
  timestamps: false,
});


Booking.belongsTo(Movie, { foreignKey: 'movie_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });
Movie.hasMany(Booking, { foreignKey: 'movie_id' });
User.hasMany(Booking, { foreignKey: 'user_id' });

module.exports = Booking;
