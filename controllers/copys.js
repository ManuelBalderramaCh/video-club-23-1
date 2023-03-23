const express = require('express');
const { Copy } = require('../db');

function list(req, res, next){
    Copy.findAll()
        .then(objects => res.json(objects))
        .catch(err => res.sed(err));
};

function index(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
};

function create(req, res, next){
    let number = req.params.number;
    let format = req.params.format;
    let status = req.params.status;

    let copy = new Object({
        number:number,
        format:format,
        status:status
    })

    Copy.create(copy)
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
    
};

function replace(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
            .then((object) => {
                const number = req.body.number ? req.body.number :"";
                const format = req.body.format ? req.body.format :" ";
                const status = req.body.status ? req.body.status : "";
                object.update({number:number,format:format, status:status})
                .then(obj=>res.json(obj))
                .catch(err => res.send(err));
            })
};

function update(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
            .then((object)=>{
                const number = req.body.number ? req.body.number :object.number;
                const format = req.body.format ? req.body.format: object.format;
                const status = req.body.status ? req.body.status: object.status;
                object.update({number:number,format:format, status:status})
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
};


function destroy(req, res, next){
    const id = req.params.id;
    Copy.destroy({where:{id:id}})
            .then(obj=>res.json(obj))
            .catch(err => res.send(err));
};

module.exports = {list,index,create,update,destroy,replace};