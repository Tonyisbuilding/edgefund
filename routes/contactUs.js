const express = require("express");
const router = express.Router();
const { 
    contactUs
 } = require('../controller/contactUs');

 router.use(express.json());
 
 router.post('/contactUs', contactUs);
 
 module.exports = router;