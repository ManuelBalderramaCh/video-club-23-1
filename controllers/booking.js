const express = require('express');
const Booking = require('../models/booking');

function list(req, res, next) {
    Booking.find().then(objs => res.status(200).json({
        message: res.__('ok.booking'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.booking'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Booking.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.booking'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.booking'),
        obj:ex
    }));
}

function create(req, res, next) {
    let date = req.body.date;

    let booking = new Booking({
        date:date
    });

    booking.save().then(obj => res.status(200).json({
        message:res.__('ok.booking'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.booking'),
        ex:ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let date = req.body.date ? req.body.date : "";

    let booking = new Object({
        _number: date
    });
    
    Booking.findOneAndUpdate({"_id":id},Booking,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('ok.booking'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.booking'),
                obj:ex
            }));
}

function update(req, res, next) {
    const id = req.params.id;
    let date = req.body.date;

    let booking = new Object(); 

    if(date){
        booking._number = date;
    }

    Booking.findOneAndUpdate({"_id":id},Booking)
            .then(obj => res.status(200).json({
                message:res.__('ok.booking'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.booking'),
                obj:ex
            }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Booking.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('ok.booking'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.booking'),
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