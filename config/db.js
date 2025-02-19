// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movie-web', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

module.exports = sequelize;
