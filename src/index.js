const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const session = require("express-session");
const mongoose = require('mongoose');
const authConfig = require('./config/auth.json');
const flash = require("connect-flash")

const routes = require("./routes/routes")
const admRoutes = require("./routes/admRoutes")

// Config seção
app.use(session({
    secret: authConfig.secret,
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

// Midleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

//  Config Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Config Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//  Config Public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//  Rota
app.get('/', (req, res) => {
    res.render('home', { style: 'home.css', title: 'Sintro', script: 'home.js' });
});
app.use('/routes', routes);
app.use('/admRoutes', admRoutes);

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/sintro").then(() => {
    console.log("Conectado ao mongo")
}).catch((err) => {
    console.log("erro ao se conectar: " + err)
})

app.listen(3000, () => {
    console.log("servidor rodando porta 3000")
});