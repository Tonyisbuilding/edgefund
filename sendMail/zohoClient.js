const axios = require("axios");
const { extractEmail } = require("./config");

let cachedToken;
let tokenExpiry = 0;



const buildRecipientField = (value) => {
  if (!value) return undefined;

  return String(value)
    .split(',')
    .map((item) => item.trim().replace(/\r?\n|\r/g, "")) // strip spaces + newlines
    .filter(Boolean)
    .join(',');
};


const getEnvOrThrow = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} environment variable is required for Zoho Mail integration.`);
  }
  return value;
};

const getOAuthDomain = () => process.env.ZOHO_OAUTH_DOMAIN || "https://accounts.zoho.com";

const getMailDomain = () => {
  const domain = process.env.ZOHO_MAIL_DOMAIN || process.env.ZOHO_API_DOMAIN || "https://mail.zoho.com";
  return domain.replace(/\/$/, "");
};

const getAccountId = () => getEnvOrThrow("ZOHO_ACCOUNT_ID");

const exchangeRefreshToken = async () => {
  const refreshToken = getEnvOrThrow("ZOHO_REFRESH_TOKEN");
  const clientId = getEnvOrThrow("ZOHO_CLIENT_ID");
  const clientSecret = getEnvOrThrow("ZOHO_CLIENT_SECRET");

  const response = await axios.post(
    `${getOAuthDomain().replace(/\/$/, "")}/oauth/v2/token`,
    null,
    {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
      },
    }
  );

  const { access_token: accessToken, expires_in: expiresIn } = response.data;
  if (!accessToken) {
    throw new Error("Zoho OAuth refresh token exchange failed - no access token returned.");
  }

  cachedToken = accessToken;
  tokenExpiry = Date.now() + (Number(expiresIn) || 3600) * 1000;
  return accessToken;
};

const getAccessToken = async () => {
  if (cachedToken && Date.now() < tokenExpiry - 60_000) {
    return cachedToken;
  }
  return exchangeRefreshToken();
};

const getFromAddress = (from) => {
  const explicit = extractEmail(from);
  if (explicit) return explicit;

  const envFrom = extractEmail(process.env.ZOHO_FROM_ADDRESS) || extractEmail(process.env.EMAIL_FROM);
  if (envFrom) return envFrom;

  throw new Error("Unable to determine Zoho from address. Set ZOHO_FROM_ADDRESS or EMAIL_FROM.");
};

const sendZohoMail = async ({ subject, html, text, to, cc, bcc, replyTo, from }) => {
  const accessToken = await getAccessToken();
  const accountId = getAccountId();
  const endpoint = `${getMailDomain()}/api/accounts/${accountId}/messages`;

  const toAddress = buildRecipientField(to);
  if (!toAddress) {
    throw new Error("Zoho mail send failed: no recipients provided.");
  }

  const fromEmail = getFromAddress(from);
  const toList = buildRecipientField(to);
  const ccList = buildRecipientField(cc);
  const bccList = buildRecipientField(bcc);

  if (!toList) {
    throw new Error("Zoho mail send failed: no recipients provided.");
  }

  const payload = {
    fromAddress: fromEmail,
    toAddress: toList,
    subject,
    content: html || text || "",
    mailFormat: html ? "html" : "text",
  };

  if (!payload.content) {
    throw new Error("Zoho mail send failed: no content supplied.");
  }

  if (ccList) {
    payload.ccAddress = ccList;
  }

  if (bccList) {
    payload.bccAddress = bccList;
  }

  if (replyTo) {
    payload.replyToAddress = replyTo;
  }

  try {
    const response = await axios.post(endpoint, payload, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (process.env.ZOHO_DEBUG === "true") {
      console.log("Zoho mail sent", {
        endpoint,
        payload,
        response: response.data,
      });
    }

    return response.data;
  } catch (error) {
    const message = error.response?.data || error.message;
    console.error("Zoho Mail API send failed", message);
    throw error;
  }
};

module.exports = sendZohoMail;
