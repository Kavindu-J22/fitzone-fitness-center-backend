const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  type: { type: String, required: true },
  userName: { type: String, required: true },
  className: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: String, required: true },  // Example: "Mon, Wed, Fri"
  time: { type: String, required: true },      // Class time (e.g., "6:00 PM")
  instructor: { type: String, required: true },
  capacity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  attenders: { type: [String], default: [] },
});

module.exports = mongoose.model('Class', classSchema);
