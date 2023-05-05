const express = require('express');
const Genre = require('../models/genre');

function list(req, res, next) {
    Genre.find().then(objs => res.status(200).json({
        message: res.__('ok.genre'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.genre'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Genre.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.genre'), // Interpolacion
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.genre'),
        obj:ex
    }));
}

function create(req, res, next) {
    let description = req.body.description;

    let genre = new Genre({
        description:description,
    });

    genre.save().then(obj => res.status(200).json({
        message: res.__('ok.genre'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.genre'),
        ex:ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let description = req.body.description ? req.body.description : "";

    let Genre = new Object({
        _description: description,
    });
   
    Genre.findOneAndUpdate({"_id":id},Genre,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('ok.genre'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.genre'),
                obj:ex
            }));
}

function update(req, res, next) {
    const id = req.params.id;
    let description = req.body.description;

    let Genre = new Object(); 

    if(description){
        Genre._name = description;
    }

    Genre.findOneAndUpdate({"_id":id},Genre)
            .then(obj => res.status(200).json({
                message: res.__('ok.genre'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.genre'),
                obj:ex
            }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Genre.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('ok.genre'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.genre'),
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