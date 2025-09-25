const { getTransporter, getFromAddress, getRecipients } = require("./config");

const ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (!value) {
    return [];
  }
  return [value];
};

const sendMail = async ({
  subject,
  html,
  text,
  envKey,
  defaultRecipients = [],
  from,
  to,
  cc,
  bcc,
  replyTo,
  attachments,
}) => {
  const transporter = getTransporter();
  const fromAddress = from || getFromAddress();
  const recipients = to || getRecipients(envKey, defaultRecipients);

  if (!fromAddress) {
    throw new Error("Email sender address missing. Set EMAIL_FROM or SMTP_FROM environment variable.");
  }

  if (!recipients.length) {
    throw new Error("No recipients configured for outgoing email.");
  }

  const mailOptions = {
    from: fromAddress,
    to: ensureArray(recipients),
    subject,
  };

  if (html) {
    mailOptions.html = html;
  }

  if (text) {
    mailOptions.text = text;
  }

  if (cc) {
    mailOptions.cc = ensureArray(cc);
  }

  if (bcc) {
    mailOptions.bcc = ensureArray(bcc);
  }

  if (replyTo) {
    mailOptions.replyTo = replyTo;
  }

  if (attachments) {
    mailOptions.attachments = attachments;
  }

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
