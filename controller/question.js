const question = require("../models/question");
const sendAnswers = require("../sendMail/sendAnswer");
// const express = require('express');

const createNewQuestion = async (req,res)=>{
    try {
        const createNewQuestion = await question.create(req.body);
        if(createNewQuestion){
            const mail = await sendAnswers(createNewQuestion);
        };
        res.status(200).json({msg: createNewQuestion});
        // console.log(createNewQuestion);
    } catch (error) {
        console.error("An error occurred:", error);
    res.status(500).json({ error: `An error occurred${error}` });
    }
};

const getFirstTwoUsers = async (req, res) =>{
    try {
        const getFirstTwoUsersResponse = await question.find({});

        const user1 = getFirstTwoUsersResponse[0] ? getFirstTwoUsersResponse[0].name  : "...";
        const user2 = getFirstTwoUsersResponse[1] ? getFirstTwoUsersResponse[1].name  : "...";
        const users = [
            {
                user1,
            },
            {
                user2,
            }
            
        ]; 
        console.log(users);
        res.status(200).json({msg: users});
    } catch (error) {
        console.error("An error occurred:", error);
    res.status(500).json({ error: `An error occurred${error}` });
    }
};

module.exports = {
    createNewQuestion,
    getFirstTwoUsers
};

