const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // We'll create this middleware next
const Booking = require('../models/Booking');
const Accommodation = require('../models/Accommodation');
const User = require('../models/User');

// @route   POST api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', auth, async (req, res) => {
  const { accommodationId, startDate, endDate, guestName, guestEmail, totalPrice } = req.body;

  try {
    // TODO: Add validation for dates, availability, etc.
    const newBooking = new Booking({
      user: req.user.id, // from auth middleware
      accommodation: accommodationId,
      startDate,
      endDate,
      guestName,
      guestEmail,
      totalPrice,
    });

    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/bookings/my-bookings
// @desc    Get all bookings for a user
// @access  Private
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('accommodation', ['name', 'type']);
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
