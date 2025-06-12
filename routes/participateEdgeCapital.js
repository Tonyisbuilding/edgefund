const express = require("express");
const router = express.Router();
const { 
    participateFormEdgeCapital
 } = require('../controller/participateFormEdgeCapital');


 router.use(express.json());
 
 router.post('/participate', participateFormEdgeCapital);
 
 module.exports = router;