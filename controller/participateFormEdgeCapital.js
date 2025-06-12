// controllers/participateController.js
const Participate = require("../models/participateForm");
const sendParticipateEmail = require("../sendMail/participateFormEdgeCapital");

const participateFormEdgeCapital = async (req, res) => {
  try {
    const {
      name,
      street, 
      zipcode, 
      city,
      country,
      nationality,
      phone, 
      mail,
      iban, 
      onBehalfOf, 
      tin, 
      idType, 
      idNumber, 
      dateOfBirth, 
      initialDeposit, 
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !street ||
      !city ||
      !country ||
      !nationality ||
      !phone ||
      !mail ||
      !iban ||
      !dateOfBirth ||
      !initialDeposit
    ) {
      return res.status(400).json({ error: "Please fill in all required fields" });
    }

    //  My validation using Regex
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Phone number format validation
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // IBAN format validation (basic check for alphanumeric and length)
    // const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/;
    // if (!ibanRegex.test(iban.replace(/\s/g, ""))) {
    //   return res.status(400).json({ error: "Invalid IBAN format" });
    // }

    // Date of birth validation (basic check for format YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) {
      return res.status(400).json({ error: "Invalid date of birth format (use YYYY-MM-DD)" });
    }

    // Initial deposit validation (must be a positive number)
    const deposit = Number(initialDeposit);
    if (isNaN(deposit) || deposit <= 0) {
      return res.status(400).json({ error: "Initial deposit must be a positive number" });
    }

    // Sanitize and format the input
    const sanitizedData = {
      name: name.trim(),
      street: street.trim(),
      zipcode: zipcode ? zipcode.trim() : undefined, // optional
      city: city.trim(),
      country: country.trim(),
      nationality: nationality.trim(),
      phone: phone.trim(),
      mail: mail.trim().toLowerCase(),
      iban: iban.trim().replace(/\s/g, ""), // Remove spaces from IBAN
      onBehalfOf: onBehalfOf ? onBehalfOf.trim() : undefined, // optional
      tin: tin ? tin.trim() : undefined, // optional
      idType: idType ? idType.trim() : undefined, // optional
      idNumber: idNumber ? idNumber.trim() : undefined, // optional
      dateOfBirth: dateOfBirth.trim(),
      initialDeposit: deposit, // Already validated as a number
    };

    // Save to MongoDB (uncomment when ready to use)
    // const newParticipant = new Participate(sanitizedData);
    // await newParticipant.save();

    // Send email with all fields
    sendParticipateEmail(sanitizedData);
    return res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting participation form:", error);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};

module.exports = { participateFormEdgeCapital };