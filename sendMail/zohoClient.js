// sendMail/zohoClient.js
const axios = require("axios");
const { extractEmail } = require("./config");

let cachedToken;
let tokenExpiry = 0;

// -- Helpers ---------------------------------------------------
const buildRecipientField = (value) => {
  if (!value) return undefined;
  return String(value)
    .split(",")
    .map((item) => item.trim().replace(/\r?\n|\r/g, "")) // trim newlines/spaces
    .filter(Boolean)
    .join(",");
};

const getEnvOrThrow = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} environment variable is required for Zoho Mail integration.`);
  return value;
};

const getOAuthDomain = () =>
  (process.env.ZOHO_OAUTH_DOMAIN || "https://accounts.zoho.com").replace(/\/$/, "");

// Always use Zoho Mail domain (avoid CRM domain confusion)
const getMailDomain = () => "https://mail.zoho.com";

const getAccountId = () => getEnvOrThrow("ZOHO_ACCOUNT_ID");

// -- Auth ------------------------------------------------------
const exchangeRefreshToken = async () => {
  const refreshToken = getEnvOrThrow("ZOHO_REFRESH_TOKEN");
  const clientId = getEnvOrThrow("ZOHO_CLIENT_ID");
  const clientSecret = getEnvOrThrow("ZOHO_CLIENT_SECRET");

  const response = await axios.post(`${getOAuthDomain()}/oauth/v2/token`, null, {
    params: {
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    },
  });

  const { access_token: accessToken, expires_in: expiresIn } = response.data;
  if (!accessToken) throw new Error("Zoho OAuth refresh token exchange failed - no access token returned.");

  cachedToken = accessToken;
  tokenExpiry = Date.now() + (Number(expiresIn) || 3600) * 1000;
  return accessToken;
};

const getAccessToken = async () => {
  if (cachedToken && Date.now() < tokenExpiry - 60_000) return cachedToken;
  return exchangeRefreshToken();
};

const getFromAddress = (from) => {
  const explicit = extractEmail(from);
  if (explicit) return explicit;

  const envFrom = extractEmail(process.env.ZOHO_FROM_ADDRESS) || extractEmail(process.env.EMAIL_FROM);
  if (envFrom) return envFrom;

  throw new Error("Unable to determine Zoho from address. Set ZOHO_FROM_ADDRESS or EMAIL_FROM.");
};

// Build a STRICT payload with only allowed keys
const buildZohoPayload = ({ subject, html, text, to, cc, bcc, replyTo, from }) => {
  const fromAddress = getFromAddress(from);
  const toAddress = buildRecipientField(to);
  if (!toAddress) throw new Error("Zoho mail send failed: no recipients provided.");

  const content = html || text || "";
  if (!content) throw new Error("Zoho mail send failed: no content supplied.");

  // Allowed keys only:
  const payload = {
    fromAddress,
    toAddress,
    subject: String(subject || "").trim(),
    content,
    mailFormat: html ? "html" : "text",
  };

  const ccAddress = buildRecipientField(cc);
  const bccAddress = buildRecipientField(bcc);

  if (ccAddress) payload.ccAddress = ccAddress;
  if (bccAddress) payload.bccAddress = bccAddress;
  if (replyTo) payload.replyToAddress = replyTo;

  // Strip empty strings just in case
  Object.keys(payload).forEach((k) => {
    if (payload[k] === "" || payload[k] == null) delete payload[k];
  });

  return payload;
};

// -- Send ------------------------------------------------------
const sendZohoMail = async (params) => {
  const accessToken = await getAccessToken();
  const accountId = getAccountId();
  const endpoint = `${getMailDomain()}/api/accounts/${accountId}/messages`;

  const payload = buildZohoPayload(params);

  try {
    if (process.env.ZOHO_DEBUG === "true") {
      console.log("Zoho DEBUG -> endpoint:", endpoint);
      console.log("Zoho DEBUG -> payload:", JSON.stringify(payload));
    }

    // ...inside sendZohoMail, just before axios.post(endpoint, payload, { ... })
console.log("Zoho DEBUG -> endpoint:", endpoint);
console.log("Zoho DEBUG -> payload:", JSON.stringify(payload));


    const response = await axios.post(endpoint, payload, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      // Defensive: reject only on HTTP error, let us see Zoho's structured body
      validateStatus: () => true,
    });

    if (process.env.ZOHO_DEBUG === "true") {
      console.log("Zoho DEBUG -> status:", response.status);
      console.log("Zoho DEBUG -> data:", JSON.stringify(response.data));
    }

    // Zoho returns {status:{code,description}, data:{...}} on errors
    if (response.status >= 400 || (response.data && response.data.status && response.data.status.code >= 400)) {
      const err = new Error("Zoho Mail API send failed");
      err.response = { data: response.data, status: response.status };
      throw err;
    }

    return response.data;
  } catch (error) {
    const message = error.response?.data || error.message;
    const logPayload = {
      endpoint,
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      message,
      payload,
    };

    console.error("Zoho Mail API send failed", JSON.stringify(logPayload, null, 2));
    throw error;
  }
};

module.exports = sendZohoMail;
