const express = require('express');
const router = express.Router();
const { createBooking, updateBookingStatus, deleteBooking, getAllBookings, getBookingsByItemId, checkBooking } = require('../controllers/BookingController');

// Route to create a new booking
router.post('/addBookings', createBooking);

// Route to get all bookings
router.get('/allBookings', getAllBookings);

// Route to update booking status
router.put('/updateStatus/:classId/:attendeeName', updateBookingStatus);

// Route to delete a booking
router.delete('/DeleteBookings/:bookingId', deleteBooking);

// Route to get bookings by itemId
router.get('/AcceptedBookings/:itemId', getBookingsByItemId);

router.get('/checkBooking', checkBooking);

module.exports = router;
