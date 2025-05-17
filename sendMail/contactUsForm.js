// utils/sendQueryMail.js
const nodemailer = require("nodemailer");

const sendQueryMail = async (data) => {
  const { firstName, lastName, mail, number, message } = data;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 2rem; background: #f4f4f4">
      <h2 style="color: #2c3e50;">📨 A New message from ${mail}</h2>
      <p><strong>Name:</strong> ${firstName}</p>
      <p><strong>Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${mail}</p>
      <p><strong>Mobile Number:</strong> ${number}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
    });

    const mailOptions = {
    //   from: "salaudeenoluwapelumi98@gmail.com",
    //   to: ["salaudeenoluwapelumi98@gmail.com"],
    //   subject: `📩 A New message from ${firstName}`,
    //   html,
    from: `"Edge Capital Forms" <${process.env.EMAIL_FROM}>`,
    to: [process.env.EMAIL_TO, "salaudeenoluwapelumi98@gmail.com"],
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
