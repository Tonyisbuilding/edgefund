// controllers/participateController.js
const Participate = require('../models/participateForm');
const sendParticipateEmail = require('../sendMail/participateForm');

const participateForm = async (req, res) => {
  try {
    const {
      name,
      address,
      zip,           // optional
      city,
      country,
      nationality,
      number,
      mail
    } = req.body;

    // Validate required fields
    if (!name || !address || !city || !country || !nationality || !number || !mail) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Phone number format validation
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(number)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Sanitize and format the input
    const sanitizedData = {
      name: name.trim(),
      address: address.trim(),
      zip: zip ? zip.trim() : undefined, // optional
      city: city.trim(),
      country: country.trim(),
      nationality: nationality.trim(),
      number: number.trim(),
      mail: mail.trim().toLowerCase()
    };

    // Save to MongoDB
    // const newParticipant = new Participate(sanitizedData);
    // await newParticipant.save();

    sendParticipateEmail(req.body)
    return res.status(201).json({ message: 'Form submitted successfully' });

  } catch (error) {
    console.error('Error submitting participation form:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};

module.exports = { participateForm };
