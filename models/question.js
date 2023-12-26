const mongoose =  require('mongoose');

const question = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a valid name"]
    },
    question1:{
        type: String,
        require: [true, "Please provide a valid name"]
    },
    question2:{
        type: String,
        require: [true, "Please provide a valid name"]
    },
    question3:{
        type: String,
        require: [true, "Please provide a valid name"]
    },
    question4:{
        type: String,
        require: [true, "Please provide a valid name"]
    },
});

module.exports = mongoose.model("question", question);