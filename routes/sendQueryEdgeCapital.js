const express = require("express");
const router = express.Router();
const { 
    sendQuery
 } = require('../controller/sendQueryEdgeCapital');

 router.use(express.json());
 
 router.post('/query/edge', sendQuery);
 
 module.exports = router;