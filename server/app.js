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

app.use('/api/v1/edgefund', participate);
app.use('/api/v1/edgefund', requestInfo);
app.use('/api/v1/edgefund', query);
app.use('/api/v1/edgefund', contactUs);
app.use('/api/v1/edgeCapital', participateEdge);
app.use('/api/v1/edgeCapital', requestInfoEdge);
app.use('/api/v1/edgeCapital', queryEdge);
app.use('/api/v1/edgeCapital', contactUsEdge);




module.exports = app;