const Booking = require('../models/Booking');  // Import the Booking model

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, username, bookingTitle, bookingType, itemId } = req.body;
    
    // Create a new booking entry
    const newBooking = new Booking({
      userId,
      username,
      bookingTitle,
      bookingType,
      itemId
    });

    // Save the booking to the database
    await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

// Update the booking status (e.g., from 'pending' to 'rejected')
exports.updateBookingStatus = async (req, res) => {
    try {
      const { classId, attendeeName } = req.params;  // Get both classId and attendeeName from the request params
      const { bookingStatus } = req.body;  // Get the status update from the request body
  
      // Find the booking by both classId and attendeeName (username) and update the status
      const booking = await Booking.findOneAndUpdate(
        { itemId: classId, username: attendeeName },  // Find the booking by classId and attendeeName
        { bookingStatus },  // Update the status
        { new: true }  // Return the updated document
      );
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
      res.status(500).json({ message: 'Error updating booking status', error });
    }
  };
  
  

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;  // Get the bookingId from the request params

    // Find and delete the booking by ID
    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find();  // Retrieve all bookings from the database
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
      }
  
      res.status(200).json(bookings);  // Return the bookings as a response
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  };
  

  // Controller to find bookings by itemId
exports.getBookingsByItemId = async (req, res) => {
    try {
      const { itemId } = req.params; // Get itemId from the request parameters
  
      // Find bookings that match the given itemId
      const bookings = await Booking.find({ itemId });
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for the provided itemId' });
      }
  
      res.status(200).json({ message: 'Bookings retrieved successfully', bookings });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving bookings', error });
    }
  };

  // Check if a booking exists for a given itemId and username
exports.checkBooking = async (req, res) => {
    try {
      const { itemId, username } = req.query; // Use query parameters
  
      // Find if there is a booking with the specified itemId and username
      const existingBooking = await Booking.findOne({ itemId, username });
  
      if (existingBooking) {
        return res.status(200).json({ exists: true });
      }
  
      res.status(200).json({ exists: false });
    } catch (error) {
      res.status(500).json({ message: 'Error checking booking', error });
    }
  };