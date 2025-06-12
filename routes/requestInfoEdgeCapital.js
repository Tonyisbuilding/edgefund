const express = require("express");
const router = express.Router();
const { 
    requestInfoFormEdgeCapital
 } = require('../controller/requestInfoEdgeCapital');


 router.use(express.json());
 
 router.post('/requestinfo', requestInfoFormEdgeCapital);
 
 module.exports = router;