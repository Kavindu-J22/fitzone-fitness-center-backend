// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Payment', paymentSchema);
