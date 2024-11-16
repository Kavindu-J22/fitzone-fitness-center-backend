// controllers/paymentController.js
const Payment = require('../models/Payment');

exports.addPayment = async (req, res) => {
  const { packageName, userId, imageUrl } = req.body;

  try {
    const newPayment = new Payment({
      packageName,
      userId,
      imageUrl,
    });
    await newPayment.save();
    res.status(201).json({ message: 'Payment slip saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to update the status of the payment
exports.updateStatus = async (req, res) => {
  try {
    const { paymentId, status } = req.body; // Get payment ID and status from request body

    // Ensure both paymentId and status are provided
    if (!paymentId || !status) {
      return res.status(400).json({ error: 'All the Details are required' });
    }

    // Find the payment by ID and update the status
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true } // Return the updated document
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', payment }); // Send the updated payment object
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
