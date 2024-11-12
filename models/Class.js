const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  type: { type: String, required: true },
  schedule: { type: Date, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  capacity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
