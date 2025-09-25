// utils/sendQueryMail.js
const nodemailer = require("nodemailer");

const sendQueryMail = async (data) => {
  const { firstName, lastName, mail, number, message } = data;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 2rem; background: #f4f4f4">
      <h2 style="color: #2c3e50;">📨 A New message from ${mail}</h2>
      <p><strong>Firstname:</strong> ${firstName}</p>
      <p><strong>Lastname:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${mail}</p>
      <p><strong>Mobile Number:</strong> ${number}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      // port: 587,
      port: 465,
      secure: false,
      auth: {
        user: "tonyemerald5@gmail.com",
        pass: "uispmcduuajipzzp",
        // user: "anthonyadewuyi01@gmail.com",
        // pass: "eulcysakrwjpfvwv",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `anthonyadewuyi01@gmail.com`,
      to: [
        "info@edgenext.nl",
        "anthonyadewuyi01@gmail.com",
      ],
      subject: `📥 New Form Submission from ${firstName}`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending query email:", error.message);
    throw new Error("Email failed to send.");
  }
};

module.exports = sendQueryMail;
