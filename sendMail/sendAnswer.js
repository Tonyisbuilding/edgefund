const sendMail = require("./mailer");
const sendAnswer = require("../utils/sendAnswer");

const EDGE_FUND_SURVEY_RECIPIENTS = "EDGE_FUND_SURVEY_RECIPIENTS";

const sendAnswers = async (data) => {
  const { name, question1, question2, question3, rating } = data;
  const html = sendAnswer(name, question1, question2, question3, rating);

  try {
    await sendMail({
      subject: `👋 Elias Data Services`,
      html,
      envKey: EDGE_FUND_SURVEY_RECIPIENTS,
      defaultRecipients: ["info@edgenext.nl", "anthonyadewuyi01@gmail.com"],
    });
  } catch (error) {
    console.error("Error sending survey email:", error.message);
    throw new Error("Email failed to send.");
  }
};

module.exports = sendAnswers;
