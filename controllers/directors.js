const express = require('express');
const { Director } = require('../db');

function list(req, res, next) {
    Director.findAll()
            .then(objects => res.json(objects))
            .catch(err => res.send(error));
}

function index(req, res, next) {
   const id = req.params.id;
   Director.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(error));
}

function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;
    
    let director = new Object({
        name:name,
        lastName:lastName
    });

    Director.create(director)
            .then( obj => res.json(obj))    
            .catch( err => res.json(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Director.findByPk(id)
            .then((object) => {
                const name = req.body.name ? req.body.name : "";
                const lastName = req.body.lastName ? req.body.lastName : "";
                object.update({name: name, lastName: lastName})
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Director.findByPk(id)
            .then((object) => {
                const name = req.body.name ? req.body.name : object.name;
                const lastName = req.body.lastName ? req.body.lastName : object.lastName;
                object.update({name: name, lastName: lastName})
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
 }

function destroy(req, res, next) {
    const id = req.params.id;
    Director.destroy({ where: {id:id}})
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
}

module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy
};