const nodemailer = require("nodemailer");
const sendAnswer = require("../utils/sendAnswer");

const sendAnswers = async (data) => {
  const { name, question1, question2, question3, rating } = data;
  const html = sendAnswer(name, question1, question2, question3, rating);
  try {
    const transporter = nodemailer.createTransport({
      // service: "gmail.com",
      // host: "smtp.gmail.com",
      // port: 587,
      // auth: {
      //   user: "salaudeenoluwapelumi98@gmail.com",
      //   pass: "xqesplvduzdmmrsl",
      // },
      // secure: false,
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
      subject: `👋 Elias Data Services`,
      html: `${html}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // res.status(500).json({ error, msg: "Please retry" });
        return error;
      } else {
        // res.status(202).json({ info });
        console.log("Email sent: " + info.response);
        return info;
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendAnswers;
