
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');


router.get('/:id', movieController.getMovieDetail);

module.exports = router;
