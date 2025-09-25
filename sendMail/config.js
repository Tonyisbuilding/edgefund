const extractEmail = (value) => {
  if (!value) {
    return undefined;
  }

  const match = /<([^>]+)>/.exec(value);
  if (match) {
    return match[1].trim();
  }

  return value.trim();
};

const parseList = (value) => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getFromAddress = () =>
  process.env.ZOHO_FROM_ADDRESS || extractEmail(process.env.EMAIL_FROM) || process.env.SMTP_USER || process.env.EMAIL_USER;

const getRecipients = (envKey, fallback = []) => {
  const recipients = parseList(process.env[envKey]);
  if (recipients.length) {
    return recipients;
  }

  return fallback;
};

module.exports = {
  extractEmail,
  parseList,
  getFromAddress,
  getRecipients,
};
