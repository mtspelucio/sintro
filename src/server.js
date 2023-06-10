const mongoose = require('mongoose');

// Connection Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/sintro", { useMongoClient: true }).then(() => {
    console.log("mongo conectado...")
}).catch((err) => {
    console.log("Houve um erro: " + err)
});

// Model-User
const UserSchema = mongoose.Schema({
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
        require: true
    }
})

mongoose.model('user', UserSchema)

const newUser = mongoose.model('user');

new newUser({
    email: "xxx@hotmail.com",
    userName: "marmita",
    password: "123456"
}).save().then(() => {
    console.log("usuario criado")
}).catch((err) => {
    console.log("erro na criação: " + err)
})