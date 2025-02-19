
const Movie = require('../models/Movie');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.render('index', { movies, user: req.session.user });
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
