const sendMail = require("./mailer");

const EDGE_FUND_CONTACT_RECIPIENTS = "EDGE_FUND_CONTACT_RECIPIENTS";

const sendContactMail = async (data) => {
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
    await sendMail({
      subject: `📥 New Form Submission from ${firstName}`,
      html,
      replyTo: mail,
      envKey: EDGE_FUND_CONTACT_RECIPIENTS,
      defaultRecipients: ["info@edgenext.nl", "anthonyadewuyi01@gmail.com"],
    });
  } catch (error) {
    console.error("Error sending query email:", error.message);
    throw new Error("Email failed to send.");
  }
};

module.exports = sendContactMail;
