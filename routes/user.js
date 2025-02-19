// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Trang đăng ký
router.get('/register', userController.showRegisterForm);
router.post('/register', userController.registerUser);

// Trang đăng nhập
router.get('/login', userController.showLoginForm);
router.post('/login', userController.loginUser);

// Đăng xuất
router.get('/logout', userController.logout);

module.exports = router;
