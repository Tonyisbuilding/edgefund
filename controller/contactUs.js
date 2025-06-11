// controllers/queryController.js
const sendQueryMail = require('../sendMail/contactUsForm');

const contactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, number, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !number || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Phone number validation (basic international format)
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(number)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    // Sanitize input (optional, but a good practice)
    const sanitizedData = {
      firstName: firstName.trim() ,
      lastName: lastName.trim(),
      mail: email.trim().toLowerCase(),
      number: number.trim(),
      message: message.trim()
    };

    // Save to MongoDB
    // const newQuery = new Query(sanitizedData);
    // await newQuery.save();

    sendQueryMail(sanitizedData);
    return res.status(201).json({ message: 'Query successfully submitted' });

  } catch (error) {
    console.error('Error sending query:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};

module.exports = { contactUs };
