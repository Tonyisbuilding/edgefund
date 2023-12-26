const express = require("express");
const router = express.Router();
const { 
    createNewQuestion,
    getFirstTwoUsers
 } = require('../controller/question');

router.use(express.json());

router.post('/question', createNewQuestion);
router.get('/', getFirstTwoUsers);

module.exports = router;