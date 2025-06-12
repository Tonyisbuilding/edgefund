const express = require("express");
const router = express.Router();
const { 
    sendQueryFormEdgeCapital
 } = require('../controller/sendQueryFormEdgeCapital');

 router.use(express.json());
 
 router.post('/query', sendQueryFormEdgeCapital);
 
 module.exports = router;