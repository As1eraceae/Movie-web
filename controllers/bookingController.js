const Booking = require('../models/Booking');
const QRCode = require('qrcode');

exports.createBooking = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user/login');
  }
  try {
    const movieId = req.params.movieId;
    const { showtime, seat } = req.body;
    const userId = req.session.user.id;

    const booking = await Booking.create({ movie_id: movieId, user_id: userId, showtime, seat });

    const qrData = `Booking ID: ${booking.id}\nMovie ID: ${movieId}\nShowtime: ${showtime}\nSeat: ${seat}`;
    

    QRCode.toDataURL(qrData, (err, qrCodeUrl) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Lỗi tạo mã QR');
      }

      res.render('bookingSuccess', { booking, qrCodeUrl, user: req.session.user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi đặt vé');
  }
};
