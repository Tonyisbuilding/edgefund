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
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "salaudeenoluwapelumi98@gmail.com",
        pass: "xqesplvduzdmmrsl",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "salaudeenoluwapelumi98@gmail.com",
      to: ["salaudeenoluwapelumi98@gmail.com"],
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


// utils/sendRequestInfoEmail.js
const sendRequestInfoEmail = (data) => {
    const { firstName, lastName, mail, number, whatwouldyouliketoreceiveinformationabout, message } = data;
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Information Request</title>
        </head>
        <body>
          <div style="padding: 2rem; font-family: Arial, sans-serif; background-color: #e8f8f5;">
            <h2 style="color: #16a085;">📘 Information Request Received</h2>
            <ul>
              <li><strong>First Name:</strong> ${firstName}</li>
              <li><strong>Last Name:</strong> ${lastName}</li>
              <li><strong>Email:</strong> ${mail}</li>
              <li><strong>Phone Number:</strong> ${number}</li>
              <li><strong>Interested In:</strong> ${whatwouldyouliketoreceiveinformationabout}</li>
              <li><strong>Message:</strong><br/>${message}</li>
            </ul>
          </div>
        </body>
      </html>
    `;

    
  };
  
  module.exports = sendRequestInfoEmail;