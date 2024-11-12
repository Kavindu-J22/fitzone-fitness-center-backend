const Booking = require('../models/Booking');  // Ensure this model is defined

// Create a booking
exports.createBooking = async (req, res) => {
  const { userId, classId, trainerId, bookingDate } = req.body;

  try {
    const newBooking = new Booking({ userId, classId, trainerId, bookingDate });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving bookings' });
  }
};
