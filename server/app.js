const express = require('express');
const app = express();
const cors = require('cors');
const participate = require('../routes/participateForm');
const requestInfo = require('../routes/requestInfo');
const query = require('../routes/sendQuery');
const contactUs = require('../routes/contactUs');
const participateEdge = require('../routes/participateEdgeCapital');
const requestInfoEdge = require('../routes/requestInfoEdgeCapital');
const queryEdge = require('../routes/sendQueryEdgeCapital');
const contactUsEdge = require('../routes/contactUsEdgeCapital');
const sendZohoMail = require('../sendMail/zohoClient');
require('dotenv').config();

app.use(express.json());

// CORS policy
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);

/**
 * 🔹 Debug / Health-check endpoints
 */

// Check if Zoho-related env variables are set
app.get('/api/test/email-config', (req, res) => {
  const config = {
    hasZohoAccountId: !!process.env.ZOHO_ACCOUNT_ID,
    hasZohoClientId: !!process.env.ZOHO_CLIENT_ID,
    hasZohoClientSecret: !!process.env.ZOHO_CLIENT_SECRET,
    hasZohoRefreshToken: !!process.env.ZOHO_REFRESH_TOKEN,
    hasZohoFromAddress: !!process.env.ZOHO_FROM_ADDRESS,
    hasRecipientConfig: !!process.env.EDGE_FUND_PARTICIPATE_RECIPIENTS,
    zohoDebug: process.env.ZOHO_DEBUG,
    nodeEnv: process.env.NODE_ENV,
    // Partial values for debugging (safe, no secrets exposed)
    accountIdPrefix: process.env.ZOHO_ACCOUNT_ID
      ? process.env.ZOHO_ACCOUNT_ID.substring(0, 6)
      : 'NOT SET',
    fromAddress: process.env.ZOHO_FROM_ADDRESS || 'NOT SET',
    recipients: process.env.EDGE_FUND_PARTICIPATE_RECIPIENTS || 'NOT SET',
  };

  res.json({ success: true, config });
});

// Send a test email
app.post('/api/v1/test-email', async (req, res) => {
  try {
    const result = await sendZohoMail({
      subject: 'Test Email from Render',
      html: `<p>Hello Tony 👋 — test email sent at ${new Date().toISOString()}</p>`,
      to: process.env.EDGE_FUND_PARTICIPATE_RECIPIENTS,
      from: process.env.ZOHO_FROM_ADDRESS,
    });

    console.log('✅ Test email sent successfully:', result);
    res.json({ success: true, result });
  } catch (error) {
    console.error('❌ Test email failed:', {
      message: error.message,
      response: error.response?.data,
    });
    res
      .status(500)
      .json({ success: false, error: error.message, details: error.response?.data });
  }
});

/**
 * 🔹 Production API routes
 */
app.use('/api/v1/edgefund', participate);
app.use('/api/v1/edgefund', requestInfo);
app.use('/api/v1/edgefund', query);
app.use('/api/v1/edgefund', contactUs);
app.use('/api/v1/edgeCapital', participateEdge);
app.use('/api/v1/edgeCapital', requestInfoEdge);
app.use('/api/v1/edgeCapital', queryEdge);
app.use('/api/v1/edgeCapital', contactUsEdge);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('Environment variables loaded:', {
      hasZoho: !!process.env.ZOHO_ACCOUNT_ID,
      port: PORT,
    });
  });
}

module.exports = app;
