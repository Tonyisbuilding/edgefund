// utils/sendQueryMail.js
const nodemailer = require("nodemailer");

// utils/sendRequestInfoEmail.js
const sendRequestInfoEmail = async (data) => {
  const { firstName, lastName, email, phone, preference, message, newsletter } =
    data;

  const html = `
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
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone Number:</strong> ${phone}</li>
              <li><strong>Interested In:</strong> ${preference}</li>
              <li><strong>News letter:</strong> ${newsletter}</li>
              <li><strong>Message:</strong><br/>${message}</li>
            </ul>
          </div>
        </body>
      </html>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        // user: "salaudeenoluwapelumi98@gmail.com",
        // pass: "xqesplvduzdmmrsl",
        user: "anthonyadewuyi01@gmail.com",
        pass: "eulcysakrwjpfvwv",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `anthonyadewuyi01@gmail.com`,
      to: ["salaudeenoluwapelumi98@gmail.com", "info@edgenext.nl", "anthonyadewuyi01@gmail.com","anthonyadewuyi01@gmail.com"],

      subject: `📩 Query Submission from ${firstName}`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending query email:", error.message);
    throw new Error("Email failed to send.");
  }
};

module.exports = sendRequestInfoEmail;
