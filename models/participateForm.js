// models/AddressSubmission.js
const mongoose = require('mongoose');

const participateFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  streetName: {
    type: String,
    required: true,
    trim: true
  },
  houseNumber: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    trim: true,
    default: null
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?\d{7,15}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  }
}, { timestamps: true });

module.exports = mongoose.model('participatefor', participateFormSchema);
