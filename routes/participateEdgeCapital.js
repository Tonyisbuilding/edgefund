const express = require("express");
const router = express.Router();
const { 
    participateForm
 } = require('../controller/participateFormEdgeCapital');


 router.use(express.json());
 
 router.post('/participate', participateForm);
 
 module.exports = router;