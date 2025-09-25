const { getFromAddress, getRecipients } = require("./config");
const sendZohoMail = require("./zohoClient");

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
  if (attachments && attachments.length) {
    throw new Error("Attachments are not supported with the current Zoho Mail integration.");
  }

  const fromAddress = from || getFromAddress();
  const recipients = ensureArray(to || getRecipients(envKey, defaultRecipients));

  if (!recipients.length) {
    throw new Error("No recipients configured for outgoing email.");
  }

  const ccList = cc ? ensureArray(cc) : undefined;
  const bccList = bcc ? ensureArray(bcc) : undefined;

  return sendZohoMail({
    subject,
    html,
    text,
    from: fromAddress,
    to: recipients,
    cc: ccList,
    bcc: bccList,
    replyTo,
  });
};

module.exports = sendMail;
