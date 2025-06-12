const express = require("express");
const router = express.Router();
const { 
    contactUs
 } = require('../controller/contactUsEdgeCapital');

 router.use(express.json());
 
 router.post('/contactUs', contactUs);
 
 module.exports = router;