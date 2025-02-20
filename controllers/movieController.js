const Movie = require('../models/Movie');
const { Op } = require('sequelize');
const sequelize = require('../config/db'); // Import sequelize instance để sử dụng fn

exports.getAllMovies = async (req, res) => {
  // Lấy query từ URL: ví dụ ?search=Inception&genre=Hành%20động
  const search = req.query.search || '';
  const genre = req.query.genre || '';

  // Tạo object điều kiện lọc cho truy vấn danh sách phim
  let filter = {};
  if (search) {
    filter.title = { [Op.like]: `%${search}%` };
  }
  if (genre) {
    filter.genre = genre;
  }

  try {
    // Truy vấn danh sách phim theo filter
    const movies = await Movie.findAll({ where: filter });
    
    // Lấy danh sách các thể loại hiện có trong cơ sở dữ liệu (không null)
    const genresList = await Movie.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('genre')), 'genre']],
      where: {
        genre: { [Op.ne]: null }
      }
    });
    const genreOptions = genresList.map(item => item.genre).filter(Boolean);

    res.render('index', { movies, user: req.session.user, search, genre, genreOptions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi lấy danh sách phim');
  }
};

exports.getMovieDetail = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).send('Không tìm thấy phim');
    }
    res.render('movieDetail', { movie, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi lấy thông tin phim');
  }
};
