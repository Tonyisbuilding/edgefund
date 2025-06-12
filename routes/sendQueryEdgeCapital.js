const express = require("express");
const router = express.Router();
const { 
    sendQueryCapital
 } = require('../controller/sendQueryEdgeCapital');

 router.use(express.json());
 
 router.post('/query', sendQueryCapital);
 
 module.exports = router;