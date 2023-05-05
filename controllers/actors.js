const express = require('express');
const Actor = require('../models/actor');

function list(req, res, next) {
    Actor.find().then(objs => res.status(200).json({
        message: res.__('ok.actor'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.actor'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.actor'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.actor'),
        obj:ex
    }));
}

function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Actor({
        name:name,
        lastName:lastName
    });

    actor.save().then(obj => res.status(200).json({
        message: res.__('ok.actor'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.actor'),
        ex:ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let Actor = new Object({
        _name: name,
        _lastName: lastName
    });

    Actor.findOneAndUpdate({"_id":id},Actor,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('ok.actor'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.actor'),
                obj:ex
            }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let Actor = new Object(); 

    if(name){
        Actor._name = name;
    }
    if(lastName){
        Actor._lastName = lastName;
    }

    Actor.findOneAndUpdate({"_id":id},Actor)
            .then(obj => res.status(200).json({
                message:res.__('ok.actor'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.actor'),
                obj:ex
            }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Actor.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('ok.actor'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.actor'),
                obj:ex
            }));
}

module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy
};