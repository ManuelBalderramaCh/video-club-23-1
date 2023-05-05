const express = require('express');
const User = require('../models/user');
const Permision = require('../models/permision');
const bcrypt = require('bcrypt');

function list(req, res, next) {
    User.find().populate("_permisions").then(objs => res.status(200).json({
        message: res.__('ok.user'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.user'),
        obj: ex
    }));
}
function index(req, res, next) {
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.user'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.user'),
        obj:ex
    }));
}

async function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let permisionId = req.body.permisionId;

    //Generar el salt con las iteraciones para generar la cadena
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    let permisions = await Permision.findOne({"_id":permisionId});

    let user = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: passwordHash,
        phone: phone,
        salt: salt,
        permisions:permisions
    });

    user.save().then(obj => res.status(200).json({
        message: res.__('ok.user'),
        obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__('bad.user'),
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let phone = req.body.phone ? req.body.phone : "";

    let User = new Object({
        _name: name,
        _lastName: lastName,
        _phone: phone
    });
    
    User.findOneAndUpdate({"_id":id},User,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('ok.user'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.user'),
                obj:ex
            }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let phone = req.body.phone;

    let User = new Object(); 

    if(name){
        User._name = name;
    }
    if(lastName){
        User._lastName = lastName;
    }
    if(phone){
        User._phone = phone;
    }

    User.findAndModify({"_id":id},User)
            .then(obj => res.status(200).json({
                message: res.__('ok.user'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.user'),
                obj:ex
            }));
}
function addPermision(req,res,next){
    const id = req.params.id;
    const permisionId = req.body.id;

    let user = new Object();

    if(permisionId){
        user._permisions.push({"type":permisionId, "ref":"Permision"});
    }

    User.findOneAndUpdate({"_id":id},user)
            .then(obj => res.status(200).json({
                message: res.__('ok.user'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.user'),
                obj:ex
            }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    User.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('ok.user'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.user'),
                obj:ex
            }));
}

module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy,
    addPermision
};