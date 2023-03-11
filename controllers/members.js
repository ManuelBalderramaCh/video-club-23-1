const express = require('express');
const { Member } = require('../db');

function list(req, res, next) {
    Member.findAll()
            .then(objects => res.json(objects))
            .catch(err => res.send(error));
}

function index(req, res, next) {
   const id = req.params.id;
   Member.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(error));
}

function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let phone = req.body.phone;
    let status = req.body.status;
    
    let member = new Object({
        name:name,
        lastName:lastName,
        address:address,
        phone:phone,
        status:status
    });

    Member.create(member)
            .then( obj => res.json(obj))    
            .catch( err => res.json(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Member.findByPk(id)
            .then((object) => {
                const name = req.body.name ? req.body.name : "";
                const lastName = req.body.lastName ? req.body.lastName : "";
                const address = req.body.address ? req.body.address : "";
                const phone = req.body.phone ? req.body.phone : "";
                const status = req.body.status ? req.body.status : "";
                object.update({name: name, lastName: lastName, address: address, phone: phone, status: status})
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Member.findByPk(id)
            .then((object) => {
                const name = req.body.name ? req.body.name : object.name;
                const lastName = req.body.lastName ? req.body.lastName : object.lastName;
                const address = req.body.address ? req.body.address : object.address;
                const phone = req.body.phone ? req.body.phone : object.phone;
                const status = req.body.status ? req.body.status : object.status;
                object.update({name: name, lastName: lastName, address: address, phone: phone, status: status})
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
 }

function destroy(req, res, next) {
    const id = req.params.id;
    Member.destroy({ where: {id:id}})
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