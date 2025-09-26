const sendMail = require("./mailer");

const EDGE_CAPITAL_PARTICIPATE_RECIPIENTS = "EDGE_CAPITAL_PARTICIPATE_RECIPIENTS";

const sendParticipateEmail = async (data) => {
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
  } = data;

  const html = `
   <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Participation Request</title>
      </head>
      <body>
        <div style="padding: 2rem; font-family: Arial, sans-serif; background-color: #f0f8ff;">
          <h2 style="color: #2980b9;">🙋 Participation Request</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>City:</strong> ${city}</li>
            <li><strong>Country:</strong> ${country}</li>
            <li><strong>Nationality:</strong> ${nationality}</li>
            <li><strong>Street:</strong> ${street}</li>
            <li><strong>Zip code:</strong> ${zipcode || "N/A"}</li>
            <li><strong>Phone Number:</strong> ${phone}</li>
            <li><strong>Date Of Birth:</strong> ${dateOfBirth}</li>
            <li><strong>IBAN:</strong> ${iban}</li>
            <li><strong>On Behalf Of:</strong> ${onBehalfOf || "N/A"}</li>
            <li><strong>TIN:</strong> ${tin || "N/A"}</li>
            <li><strong>ID Type:</strong> ${idType || "N/A"}</li>
            <li><strong>ID Number:</strong> ${idNumber || "N/A"}</li>
            <li><strong>Initial Deposit:</strong> ${initialDeposit}</li>
            <li><strong>Email:</strong> ${mail}</li>
          </ul>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await sendMail({
      subject: `📩 Participation Form Submission from ${name}`,
      html,
      replyTo: mail,
      envKey: EDGE_CAPITAL_PARTICIPATE_RECIPIENTS,
      defaultRecipients: ["leads@edge-capital.nl", "anthonyadewuyi01@gmail.com"],
    });

    console.log("✅ Participation email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Failed to send participation email");
    console.error("Message:", error.message);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    throw error;
  }
};

module.exports = sendParticipateEmail;
