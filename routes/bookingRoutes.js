const express = require('express');
const router = express.Router();
const { createBooking, getBookings, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Create a new booking
router.post('/', protect, createBooking);

// // Get all bookings for the logged-in user
// router.get('/', protect, getBookings);

// // Cancel a booking
// router.delete('/:bookingId', protect, cancelBooking);

module.exports = router;
