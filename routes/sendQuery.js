const express = require("express");
const router = express.Router();
const { 
    sendQuery
 } = require('../controller/sendQuery');

 router.use(express.json());
 
 router.post('/query', sendQuery);
 
 module.exports = router;