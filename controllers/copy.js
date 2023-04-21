const express = require('express');

const Copy = require('../models/copy');
function list(req, res, next) {
    res.send('respond with a copy list');
    Copy.find().then(objs => res.status(200).json({
        message: "Lista de copias",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion",
        obj: ex
    }));
}

function index(req, res, next) {
    res.send(`respond with a index of a copy= ${req.params.id}`);
    const id = req.params.id;
    Copy.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Copy con id ${id}`, // Interpolacion
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion",
        obj:ex
    }));
}

function create(req, res, next) {
    let title = req.body.title;
    res.send(`respond with a create title copy =${title}`);
    let number = req.body.number;

    let copy = new Copy({
        number:number
    });

    copy.save().then(obj => res.status(200).json({
        message:"Copy creado correctamente.",
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "Copy no se pudo crear.",
        ex:ex
    }));
}

function replace(req, res, next) {
    res.send(`respond with a replace copy= ${req.params.id}`);
    const id = req.params.id;
    let number = req.body.number ? req.body.number : "";

    let copy = new Object({
        _number: number
    });
    //Copy.findOneAndUpdate({},director,{}).then().catch();
    Copy.findOneAndUpdate({"_id":id},copy,{new : true})
            .then(obj => res.status(200).json({
                message: "Copy actualizado correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                message: "No se pudo actualizar la informacion",
                obj:ex
            }));
}

function update(req, res, next) {
    res.send(`respond with a update copy = ${req.params.id}`);
    const id = req.params.id;
    let number = req.body.number;

    let copy = new Object(); // Para poder llenar los atributos y hacer los cambios

    if(number){
        copy._number = number;
    }

    Copy.findOneAndUpdate({"_id":id},copy)
            .then(obj => res.status(200).json({
                message:"Copy actualizado correctamente.",
                obj:obj
            })).catch(ex => res.status(500).json({
                message: "No se pudo actualizar la copy",
                obj:ex
            }));
}

function destroy(req, res, next) {
    res.send(`respond with a destory copy= ${req.params.id}`);
    const id = req.params.id;
    Copy.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: "Copy eliminado correctamente",
                obj:obj
            })).catch(ex => res.status(500).json({
                message: "No se pudo eliminar la copy",
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