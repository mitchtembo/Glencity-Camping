const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Chalet', 'Dormitory', 'Camping'],
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: [String],
  description: {
    type: String,
    required: true,
  },
  amenities: [String],
  bookings: [
    {
      from: Date,
      to: Date,
    },
  ],
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
