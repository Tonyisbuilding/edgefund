const sendMail = require("./mailer");

const EDGE_FUND_QUERY_RECIPIENTS = "EDGE_FUND_QUERY_RECIPIENTS";

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
    await sendMail({
      subject: `📩 Query Submission from ${name}`,
      html,
      replyTo: mail,
      envKey: EDGE_FUND_QUERY_RECIPIENTS,
      defaultRecipients: ["info@edgenext.nl", "anthonyadewuyi01@gmail.com"],
    });
  } catch (error) {
    console.error("Error sending query email:", error.message);
    throw new Error("Email failed to send.");
  }
};

module.exports = sendQueryMail;
