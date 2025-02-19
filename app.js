
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));


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


const sequelize = require('./config/db');
sequelize.sync().then(() => {
  console.log('Database synchronized.');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Lỗi đồng bộ database:', err);
});
