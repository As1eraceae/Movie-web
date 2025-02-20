// seeders/seedMovies.js
const sequelize = require('../config/db');
const Movie = require('../models/Movie');

const seedMovies = async () => {
  try {
    await sequelize.sync();

    // Xóa sạch dữ liệu cũ (nếu cần)
    await Movie.destroy({ where: {} });

    await Movie.bulkCreate([
      {
        title: 'Phim Hành Động 1',
        description: 'Mô tả phim hành động 1.',
        showtimes: ['10:00', '13:00', '16:00'],
        image: '/images/Inception_poster_1.jpg',
        genre: 'Hành động'
      },
      {
        title: 'Phim Tình Cảm 1',
        description: 'Mô tả phim tình cảm 1.',
        showtimes: ['11:00', '14:00', '17:00'],
        image: '/images/poster2.jpg',
        genre: 'Tình cảm'
      },
      {
        title: 'Phim Hài Hước',
        description: 'Mô tả phim hài hước.',
        showtimes: ['12:00', '15:00', '18:00'],
        image: '/images/poster3.jpg',
        genre: 'Hài'
      }
    ]);

    console.log('Seed phim thành công!');
    process.exit();
  } catch (error) {
    console.error('Lỗi seed:', error);
    process.exit(1);
  }
};

seedMovies();
