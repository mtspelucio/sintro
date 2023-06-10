const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    }
})

mongoose.model("Users", User)