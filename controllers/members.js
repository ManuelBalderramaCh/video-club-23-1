const express = require('express');
const Member = require('../models/member');

function list(req, res, next) {
    Member.find().then(objs => res.status(200).json({
        message: res.__('ok.member'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.member'),
        obj:ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Member.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.member'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.member'),
        obj:ex
    }));
}

function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    //Address es un objeto embebido por lo cual se construye de la siguiente manera
    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.state = req.body.state;

    let member = new Member({
        name: name,
        lastName: lastName,
        phone: phone,
        address: address
    });

    member.save().then(obj => res.status(200).json({
        message: res.__('ok.member'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo almacenar el socio",
        obj: ex
    }));

}

function replace(req, res, next) {
    res.send(`respond with a replace actor= ${req.params.id}`);
}
function update(req, res, next) {
    res.send(`respond with a update actor = ${req.params.id}`);
}
function destroy(req, res, next) {
    res.send(`respond with a destory actor= ${req.params.id}`);
}
module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy
};