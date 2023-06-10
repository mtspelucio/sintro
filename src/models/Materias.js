const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Materia = new Schema({
    name: {
        type: String,
        require: true
    }
})

mongoose.model("Materias", Materia)