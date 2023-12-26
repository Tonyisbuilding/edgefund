const express = require('express');
const app = express();
const connectToDatabase = require('../database/DB');
const cors = require('cors');
const question = require('../routes/question')
require('dotenv').config();

app.use(express.json());

//cors policy
app.use(
    cors({
      origin:"*",
      methods: ["GET","POST","PATCH","DELETE",],
    })
  );

app.use('/api/v1/eliasdata', question);


const PORT = process.env.PORT || 3000;
const start = async ()=>{
    try {
        app.listen(PORT, console.log('Server is running at port '+ PORT));
        connectToDatabase(process.env.MONGO_URI);
    } catch (error) {
        
    }
};

start();
//KD8JKsPMbvRS5rD9
