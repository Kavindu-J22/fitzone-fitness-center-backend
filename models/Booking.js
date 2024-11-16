const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  username: {
    type: String,
    required: true
  },
  bookingTitle: {
    type: String,
    required: true
  },
  bookingType: {
    type: String,
    required: true
  },
  bookingStatus: {
    type: String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  itemId: {
    type: String,
    required: true
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
