// controllers/participateController.js
const sendParticipateEmail = require("../sendMail/participateForm");

const participateForm = async (req, res) => {
  const t0 = Date.now();
  try {
    const {
      name, street, zipcode, city, country, nationality, phone, mail,
      iban, onBehalfOf, tin, idType, idNumber, dateOfBirth, initialDeposit,
    } = req.body || {};

    // Basic validation
    const required = { name, street, city, country, nationality, phone, mail, iban, dateOfBirth, initialDeposit };
    const missing = Object.entries(required).filter(([_, v]) => !v).map(([k]) => k);
    if (missing.length) {
      return res.status(400).json({ error: `Please fill in all required fields: ${missing.join(", ")}` });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!/^\+?\d{7,15}$/.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
      return res.status(400).json({ error: "Invalid date of birth format (use YYYY-MM-DD)" });
    }
    const deposit = Number(initialDeposit);
    if (Number.isNaN(deposit) || deposit <= 0) {
      return res.status(400).json({ error: "Initial deposit must be a positive number" });
    }

    const sanitized = {
      name: name.trim(),
      street: street.trim(),
      zipcode: zipcode ? String(zipcode).trim() : undefined,
      city: city.trim(),
      country: country.trim(),
      nationality: nationality.trim(),
      phone: phone.trim(),
      mail: mail.trim().toLowerCase(),
      iban: String(iban).trim().replace(/\s/g, ""),
      onBehalfOf: onBehalfOf ? String(onBehalfOf).trim() : undefined,
      tin: tin ? String(tin).trim() : undefined,
      idType: idType ? String(idType).trim() : undefined,
      idNumber: idNumber ? String(idNumber).trim() : undefined,
      dateOfBirth: dateOfBirth.trim(),
      initialDeposit: deposit,
    };

    console.log("[participate] input ok. sending email via sendMail/participateForm.js", {
      toEnv: process.env.EDGE_FUND_PARTICIPATE_RECIPIENTS || "(not set)",
      fromEnv: process.env.ZOHO_FROM_ADDRESS || "(not set)"
    });

    // 🚫 We only pass sanitized to the email-template helper; it, in turn,
    // calls mailer -> zohoClient which builds the minimal Zoho payload.
    const result = await sendParticipateEmail(sanitized);

    console.log("[participate] email sent in %dms", Date.now() - t0);
    return res.status(201).json({ message: "Form submitted successfully", mail: { status: result?.status } });
  } catch (error) {
    console.error("[participate] FAILED", {
      msg: error.message,
      zoho: error.response?.data,
      stack: error.stack?.split("\n").slice(0, 3).join(" | ")
    });
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
      details: error.response?.data || null
    });
  }
};

module.exports = { participateForm };
