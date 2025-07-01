const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Accommodation = require('../models/Accommodation');
const User = require('../models/User');
const { isValidObjectId } = require('../utils/validation');
const { validateBookingCreation, validateAvailabilityCheck } = require('../middleware/validation');

// @route   POST api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', auth, validateBookingCreation, async (req, res) => {
  const { accommodationId, startDate, endDate, guestName, guestEmail, totalPrice } = req.body;

  try {
    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      accommodation: accommodationId,
      $or: [
        {
          startDate: { $lt: new Date(endDate) },
          endDate: { $gt: new Date(startDate) }
        }
      ]
    });

    if (conflictingBooking) {
      return res.status(409).json({ 
        msg: 'Accommodation already booked for selected dates',
        conflictingBooking: {
          startDate: conflictingBooking.startDate,
          endDate: conflictingBooking.endDate
        }
      });
    }

    // Validate accommodation exists
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ msg: 'Accommodation not found' });
    }

    const newBooking = new Booking({
      user: req.user.id, // from auth middleware
      accommodation: accommodationId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      guestName,
      guestEmail,
      totalPrice,
      status: 'confirmed'
    });

    const booking = await newBooking.save();
    
    // Populate accommodation details for response
    await booking.populate('accommodation', ['name', 'type', 'price']);
    
    res.json({
      message: 'Booking successful',
      booking
    });
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
    // Validate user ID from auth middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        msg: 'Invalid user authentication'
      });
    }

    if (!isValidObjectId(req.user.id)) {
      return res.status(400).json({
        msg: 'Invalid user ID format'
      });
    }

    const bookings = await Booking.find({ user: req.user.id })
      .populate('accommodation', ['name', 'type', 'price', 'image'])
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/bookings/check-availability
// @desc    Check availability for an accommodation and date range
// @access  Public
router.get('/check-availability', validateAvailabilityCheck, async (req, res) => {
  const { accommodationId, startDate, endDate } = req.query;

  try {
    const conflictingBooking = await Booking.findOne({
      accommodation: accommodationId,
      $or: [
        {
          startDate: { $lt: new Date(endDate) },
          endDate: { $gt: new Date(startDate) }
        }
      ]
    });

    res.json({
      available: !conflictingBooking,
      conflictingBooking: conflictingBooking ? {
        startDate: conflictingBooking.startDate,
        endDate: conflictingBooking.endDate
      } : null
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
