// models/Query.js
const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?\d{7,15}$/, 'Please enter a valid phone number']
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);
