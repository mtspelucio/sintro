const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question = new Schema({
    materia: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    response1: {
        type: String,
        require: true
    },
    response2: {
        type: String,
        require: true
    },
    response3: {
        type: String,
        require: true
    },
    response4: {
        type: String,
        require: true
    },
    responseTrue: {
        type: String,
        require: true   
    }
})

mongoose.model("Questions", Question)