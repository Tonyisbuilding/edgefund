// utils/sendQueryMail.js
const nodemailer = require("nodemailer");

const sendQueryMail = async (data) => {
  const { name, mail, number, message } = data;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 2rem; background: #f4f4f4">
      <h2 style="color: #2c3e50;">📨 New Query Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${mail}</p>
      <p><strong>Mobile Number:</strong> ${number}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      // service: "gmail",
      // host: "smtp.gmail.com",
      // port: 587,
      // secure: false,
      // auth: {
      //   user: "salaudeenoluwapelumi98@gmail.com",
      //   pass: "xqesplvduzdmmrsl",
      // },
      // tls: {
      //   rejectUnauthorized: false,
      // },
      host: "smtp.zeptomail.com",
      port: 587,
      secure: false, // Use false for port 587, then STARTTLS will be negotiated
      auth: {
        user: "emailapikey", // Your ZeptoMail username (always 'emailapikey')
        pass: "wSsVR60j8kXyXPx9lWX7L+8+yl5cD1KjEEgs3VGl4nOtGfDE/cc9lESfAQLxTfNLGDZvHTMXrOoqnEgC0Gda2tl/mFoCDSiF9mqRe1U4J3x17qnvhDzNX2tckBuMKo4Bzw9vnWNpG8gl+g==", // Your ZeptoMail API Key
      },
    });

    const mailOptions = {
      from: `tony@fixmypresence.com`,
      to: ["salaudeenoluwapelumi98@gmail.com", "info@edgenext.nl"],
      subject: `📩 Query Submission from ${name}`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending query email:", error.message);
    throw new Error("Email failed to send.");
  }
};

module.exports = sendQueryMail;
