const express = require("express");
const router = express.Router();
const { 
    contactUsEdgeCapital
 } = require('../controller/contactUsEdgeCapital');

 router.use(express.json());
 
 router.post('/contactUs', contactUsEdgeCapital);
 
 module.exports = router;