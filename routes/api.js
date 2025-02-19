// routes/api.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/booked-seats/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const { showtime } = req.query;
  if (!showtime) {
    return res.status(400).json({ error: 'showtime is required' });
  }
  try {
    const bookings = await Booking.findAll({ where: { movie_id: movieId, showtime } });
    const bookedSeats = bookings.map(booking => booking.seat);
    res.json({ bookedSeats });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
