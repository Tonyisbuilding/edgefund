const express = require("express");
const router = express.Router();
const { 
    requestInfoForm
 } = require('../controller/requestInfoEdgeCapital');


 router.use(express.json());
 
 router.post('/requestinfo', requestInfoForm);
 
 module.exports = router;