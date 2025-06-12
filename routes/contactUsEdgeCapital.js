const express = require("express");
const router = express.Router();
const { 
    contactUs
 } = require('../controller/contactUsEdgeCapital');

 router.use(express.json());
 
 router.post('/contactUs/edge', contactUs);
 
 module.exports = router;