const express = require('express');
const { Booking } = require('../db');

function list(req, res, next){
    Booking.findAll()
        .then(objects => res.json(objects))
        .catch(err => res.sed(err));
};

function index(req, res, next){
    const id = req.params.id;
    Booking.findByPk(id)
            .then(object => res.json(object))
            .catch(err => res.send(err));
};

function create(req, res, next){
    let date = req.params.date;
    let memberId = req.params.memberId;
    let copyId = req.params.copyId;

    let booking = new Object({
        date:date,
        memberId:memberId,
        copyId:copyId
    })

    Booking.create(booking)
            .then(obj => res.json(obj))
            .catch(err => res.send(err));
    
};

function replace(req, res, next){
    const id = req.params.id;
    Booking.findByPk(id)
            .then((object) => {
                const memberId = req.body.memberId ? req.body.memberId :"";
                const copyId = req.body.copyId ? req.body.copyId : "";
                object.update({memberId:memberId,copyId:copyId})
                .then(obj=>res.json(obj))
                .catch(err => res.send(err));
            })
};

function update(req, res, next){
    const id = req.params.id;
    Booking.findByPk(id)
            .then((object)=>{
                const memberId = req.body.memberId ? req.body.memberId :object.memberId;
                const copyId = req.body.copyId ? req.body.copyId: object.copyId;
                object.update({memberId:memberId,copyId:copyId})
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
};


function destroy(req, res, next){
    const id = req.params.id;
    Booking.destroy({where:{id:id}})
            .then(obj=>res.json(obj))
            .catch(err => res.send(err));
};

module.exports = {list,index,create,update,destroy,replace};