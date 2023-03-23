const express = require('express');
const Director = require('../models/director');

function list(req, res, next) {
    Director.find().then(objs => res.status(200).json({
        message: "lista de directores",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion",
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Director con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion",
        obj: ex
    }));
}

function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;

    let director = new Director({
        name:name, lastName:lastName
    });

    director.save().then(obj => res.status(200).json({
        message: "Director creado correctamente.",
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo almacenar el director",
        obj:ex
    }));
}

function replace(req, res, next) {
   const id = req.params.id;
   let name = req.body.name ? req.body.name : "";
   let lastName = req.body.lastName ? req.body.lastName : "";
   
   let director = new Object({
    _name: name,
    _lastname: lastName
    });

    Director.findOneAndUpdate({"_id":id}, director, {new : true})
            .then(obj => res.status(200).json({
                mesagge: "Director actualizado correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                message: "No se pudo reemplazar el director",
                obj:ex
            }));
}

function update(req, res, next) {
    res.send(`respond with a update actor = ${req.params.id}`);
}

function destroy(req, res, next) {
    const id = req.params.id;
    Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message: "Director eliminado correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo eliminar el director",
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