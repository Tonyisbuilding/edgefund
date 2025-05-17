// controllers/requestInfoController.js
const RequestInfo = require('../models/RequestInfo');
const sendRequestInfoEmail = require('../sendMail/requestInfo')

const requestInfoForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      preference,
      message,
      newsletter
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !preference ||
      !message ||
      !newsletter
    ) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate phone number
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Sanitize and prepare data
    const sanitizedData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preference: preference.trim(),
      message: message.trim(),
      newsletter: newsletter,
    };

    // Save to MongoDB
    // const newRequest = new RequestInfo(sanitizedData);
    // await newRequest.save();

    sendRequestInfoEmail(sanitizedData);
    return res.status(201).json({ message: 'Information request submitted successfully' });

  } catch (error) {
    console.error('Error submitting information request:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};

module.exports = { requestInfoForm };
