const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

require("../models/Users");
require("../models/Materias");
const User = mongoose.model("Users");
const Materia = mongoose.model("Materias");

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (email == "admin@sintro" && password == "1") {//@dmin.sintro1337
        res.redirect(307, '/admRoutes')
    } else {
        var errors = []

        if (!user || typeof user == undefined || user == null) {
            errors.push({ text: "Usuario não encontrado" });
        } else {
            if (password != user.password) {
                errors.push({ text: "Senha inválida" });//(!await bcrypt.compare(password, user.password))
            }
        }

        if (errors.length > 0) {
            res.render("home", { errors: errors, style: 'home.css', title: 'Sintro' })
        } else {
            Materia.find().lean().then((materias) => {
                res.render('selectSimulate', { materias: materias, style: 'selectSimulate.css', title: 'Sintro', script: 'selectSimulate.js', userName: user.userName });
                user.password = undefined
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao listar materia")
                res.redirect("/adminRoutes")
            })
        }
    }
})

router.get('/register', (req, res) => {
    res.render('register', { style: 'register.css', title: 'Registre-se' })
})

router.post('/registerUser', (req, res) => {
    var errors = []

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        errors.push({ text: "Nome invalido" })
    }
    if (!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
        errors.push({ text: "Senha invalido" })
    }
    if (req.body.password_confirm != req.body.password) {
        errors.push({ text: "As senhas são diferentes" })
    }
    if (!req.body.nameUser || typeof req.body.nameUser == undefined || req.body.nameUser == null) {
        errors.push({ text: "Nome de usuario invalido" })
    }

    if (errors.length > 0) {
        res.render("register", { errors: errors, style: 'register.css', title: 'Registre-se' })
    } else {
        const newUser = {
            email: req.body.email,
            userName: req.body.nameUser,
            password: req.body.password
        }

        new User(newUser).save().then(() => {
            req.flash("success_msg", "Bem-vindo ao Sintro")
            res.render('selectSimulate', { materias: materias, style: 'selectSimulate.css', title: 'Sintro', script: 'selectSimulate.js', userName: newUser.userName });
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao registrar usuário, tente novamente!")
        })
    }
})

module.exports = router