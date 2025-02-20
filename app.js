// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Cấu hình view engine và thư mục views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware phục vụ file tĩnh và session (không dùng body-parser ở đây)
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Khởi tạo AdminJS và gắn router admin
const initAdmin = require('./admin');
initAdmin()
  .then(({ adminJs, adminRouter }) => {
    // Gắn AdminJS router trước khi sử dụng body-parser
    app.use(adminJs.options.rootPath, adminRouter);

    // Sau đó, đăng ký body-parser cho toàn bộ ứng dụng
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Định nghĩa các route chính của ứng dụng
    const indexRouter = require('./routes/index');
    const movieRouter = require('./routes/movie');
    const userRouter = require('./routes/user');
    const bookingRouter = require('./routes/booking');
    const apiRouter = require('./routes/api');

    app.use('/', indexRouter);
    app.use('/movies', movieRouter);
    app.use('/user', userRouter);
    app.use('/booking', bookingRouter);
    app.use('/api', apiRouter);

    // Đồng bộ database và khởi động server
    const sequelize = require('./config/db');
    sequelize.sync().then(() => {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server chạy tại http://localhost:${PORT}`);
        console.log(`Admin panel chạy tại http://localhost:${PORT}${adminJs.options.rootPath}`);
      });
    }).catch(err => {
      console.error('Lỗi đồng bộ database:', err);
    });
  })
  .catch(err => {
    console.error('Lỗi khởi tạo AdminJS:', err);
  });
