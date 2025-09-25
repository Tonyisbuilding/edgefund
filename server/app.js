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
require('dotenv').config();

app.use(express.json());

//cors policy
app.use(
    cors({
      origin:"*",
      methods: ["GET","POST","PATCH","DELETE",],
    })
  );

// Test endpoint to check module loading
app.get('/api/test/module-check', (req, res) => {
  try {
    // Try to load the module and check what it exports
    const participateEmailModule = require('../sendMail/participateForm');
    
    res.json({
      success: true,
      moduleType: typeof participateEmailModule,
      isFunction: typeof participateEmailModule === 'function',
      moduleKeys: Object.keys(participateEmailModule || {}),
      moduleString: participateEmailModule ? participateEmailModule.toString().substring(0, 100) : 'null'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    });
  }
});

// Test endpoint to verify Zoho email configuration
app.get('/api/test/email-config', async (req, res) => {
  try {
    const config = {
      hasZohoAccountId: !!process.env.ZOHO_ACCOUNT_ID,
      hasZohoClientId: !!process.env.ZOHO_CLIENT_ID,
      hasZohoClientSecret: !!process.env.ZOHO_CLIENT_SECRET,
      hasZohoRefreshToken: !!process.env.ZOHO_REFRESH_TOKEN,
      hasZohoFromAddress: !!process.env.ZOHO_FROM_ADDRESS,
      hasRecipientConfig: !!process.env.EDGE_FUND_PARTICIPATE_RECIPIENTS,
      zohoDebug: process.env.ZOHO_DEBUG,
      nodeEnv: process.env.NODE_ENV,
      // Partial values for debugging (not exposing full secrets)
      accountIdPrefix: process.env.ZOHO_ACCOUNT_ID ? process.env.ZOHO_ACCOUNT_ID.substring(0, 10) : 'NOT SET',
      fromAddress: process.env.ZOHO_FROM_ADDRESS || 'NOT SET',
      recipients: process.env.EDGE_FUND_PARTICIPATE_RECIPIENTS || 'NOT SET'
    };
    
    res.json({ success: true, config });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test endpoint to send a test email
app.post('/api/test/send-email', async (req, res) => {
  try {
    console.log('Test email endpoint called');
    
    const sendZohoMail = require('../sendMail/zohoClient');
    
    const result = await sendZohoMail({
      subject: 'Test Email from Render',
      html: '<p>This is a test email sent at ' + new Date().toISOString() + '</p>',
      to: ['tony@fixmypresence.com'],
      from: process.env.ZOHO_FROM_ADDRESS
    });
    
    console.log('Test email sent successfully:', result);
    res.json({ success: true, result });
    
  } catch (error) {
    console.error('Test email failed:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.response?.data 
    });
  }
});

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
    console.log(`Server running locally at http://localhost:${PORT}`);
    console.log('Environment variables loaded:', {
      hasZoho: !!process.env.ZOHO_ACCOUNT_ID,
      port: PORT
    });
  });
}

module.exports = app;