const express = require("express");
const router = express.Router();
const { 
    contactUsCapital
 } = require('../controller/contactUsEdgeCapital');

 router.use(express.json());
 
 router.post('/contactUs', contactUsCapital);
 
 module.exports = router;