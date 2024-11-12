const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  benefits: [{ type: String }],
  duration: { type: Number, required: true }, // duration in months
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
