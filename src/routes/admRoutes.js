const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const mongoose = require("mongoose");

require("../models/Users");
require("../models/Materias");
const User = mongoose.model("Users");
const Materia = mongoose.model("Materias");


router.post('/',async (req, res) => {
    const userCad = (await User.find()).length

    Materia.find().lean().then((materias) => {
        res.render('admin', { materias: materias, style: 'admin.css', title: 'Sintro Admin', userCad: userCad });
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar materia")
        res.redirect("/adminRoutes")
    })
});

router.post('/registerMateria', (req, res) => {
    var errors = []

    if (!req.body.materia || typeof req.body.materia == undefined || req.body.materia == null) {
        errors.push({ text: "Materia inválida" })
    }

    if (errors.length > 0) {
        res.render('admin', { errorsMateria: errors, style: 'admin.css', title: 'Sintro Admin', userCad: userCad });
    } else {
        const newMateria = { name: req.body.materia }

        new Materia(newMateria).save().then(async () => {
            req.flash("success_msg", "Materia Registrada com sucesso")
            res.redirect(307, '/admRoutes')
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao registrar usuário, tente novamente!")
        })
    }
});

router.post('/registerQuestion', (req, res) => {
    var question = {
        text: req.body.textQuestion,
        response1: req.body.response1
    }
    console.log(question)
    res.redirect(307, '/admRoutes')
    
})


module.exports = router