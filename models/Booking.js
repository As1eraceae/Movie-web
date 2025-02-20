const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./Movie');
const User = require('./User');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  showtime: DataTypes.STRING,
  seat: DataTypes.STRING,
  // Thêm trường price cho doanh thu (ví dụ: số tiền của vé)
  price: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 }
}, {
  tableName: 'bookings',
  timestamps: false
});

// Thiết lập các mối quan hệ (nếu cần)
Booking.belongsTo(Movie, { foreignKey: 'movie_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });
Movie.hasMany(Booking, { foreignKey: 'movie_id' });
User.hasMany(Booking, { foreignKey: 'user_id' });

module.exports = Booking;
