const express = require('express');
const Copy = require('../models/copy');

function list(req, res, next) {
    Copy.find().then(objs => res.status(200).json({
        message: res.__('ok.copy'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.copy'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.copy'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message:res.__('bad.copy'),
        obj:ex
    }));
}

function create(req, res, next) {
    let number = req.body.number;

    let copy = new Copy({
        number:number
    });

    copy.save().then(obj => res.status(200).json({
        message: res.__('ok.copy'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.copy'),
        ex:ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let number = req.body.number ? req.body.number : "";

    let copy = new Object({
        _number: number
    });
    
    Copy.findOneAndUpdate({"_id":id},copy,{new : true})
            .then(obj => res.status(200).json({
                message:res.__('ok.copy'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.copy'),
                obj:ex
            }));
}

function update(req, res, next) {
    const id = req.params.id;
    let number = req.body.number;

    let copy = new Object(); 

    if(number){
        copy._number = number;
    }

    Copy.findOneAndUpdate({"_id":id},copy)
            .then(obj => res.status(200).json({
                message: res.__('ok.copy'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.copy'),
                obj:ex
            }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('ok.copy'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.copy'),
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