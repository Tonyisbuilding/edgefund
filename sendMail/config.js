const nodemailer = require("nodemailer");

let cachedTransporter;

const toBool = (value, fallback = false) => {
  if (value === undefined) {
    return fallback;
  }
  if (value === "true" || value === "1") {
    return true;
  }
  if (value === "false" || value === "0") {
    return false;
  }
  return fallback;
};

const getSmtpAuth = () => {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("SMTP credentials missing. Set SMTP_USER and SMTP_PASS environment variables.");
  }

  return { user, pass };
};

const getTransporter = () => {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = toBool(process.env.SMTP_SECURE, port === 465);
  const auth = getSmtpAuth();

  const transportConfig = {
    host,
    port,
    secure,
    auth,
  };

  if (process.env.SMTP_SERVICE) {
    transportConfig.service = process.env.SMTP_SERVICE;
  }

  if (toBool(process.env.SMTP_IGNORE_TLS_ERRORS) || process.env.SMTP_REJECT_UNAUTHORIZED === "false") {
    transportConfig.tls = { rejectUnauthorized: false };
  }

  cachedTransporter = nodemailer.createTransport(transportConfig);
  return cachedTransporter;
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
  process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.SMTP_USER || process.env.EMAIL_USER;

const getRecipients = (envKey, fallback = []) => {
  const recipients = parseList(process.env[envKey]);
  if (recipients.length) {
    return recipients;
  }

  return fallback;
};

module.exports = {
  getTransporter,
  getFromAddress,
  getRecipients,
};
