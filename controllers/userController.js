
const User = require('../models/User');

exports.showRegisterForm = (req, res) => {
  res.render('register', { user: req.session.user });
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    const user = await User.create({ username, password, email, phone });
    req.session.user = { id: user.id, username: user.username };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi đăng ký');
  }
};

exports.showLoginForm = (req, res) => {
  res.render('login', { user: req.session.user });
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && user.password === password) {
      req.session.user = { id: user.id, username: user.username };
      res.redirect('/');
    } else {
      res.redirect('/user/login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi đăng nhập');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
