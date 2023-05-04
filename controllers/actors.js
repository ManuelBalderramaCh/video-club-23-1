const express = require('express');
const Actor = require('../models/actor');
const log4js = require('log4js')
var logger = log4js.getLogger();

function list(req, res, next) {
    Actor.find().then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.actors.list'));
        res.status(200).json({
        message: res.__('ok.actors.list'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.actors.list'));
        res.status(500).json({
        message: res.__('error.actors.list'),
        objs: err
    })});
}

function index(req, res, next) {
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.actors.index'));
        res.status(200).json({
        message: res.__('ok.actors.index'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.actors.index'));
        res.status(500).json({
        message: res.__('error.actors.index'),
        objs: err
    })});
}

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name:name,
        lastName:lastName
    });
    
    actor.save().then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.actors.create'), obj._id);
        res.status(200).json({
        message: res.__('ok.actors.create'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.actors.create'));
        res.status(500).json({
        message: res.__('error.actors.create'),
        objs: err
    })});
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
        _name:name,
        _lastName:lastName
    });
    

    Actor.findOneAndUpdate({"_id":id}, actor).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.actors.replace'));
        res.status(200).json({
        message: res.__('ok.actors.replace'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.actors.replace'));
        res.status(500).json({
        message: res.__('error.actors.replace'),
        objs: err
    })});
}

function edit(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Object();
    if(name){
        actor._name = name;
    }
    if(lastName){
        actor._lastName = lastName;
    }

    Actor.findOneAndUpdate({"_id":id}, actor).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.actors.edit'));
        res.status(200).json({
        message: res.__('ok.actors.edit'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.actors.edit'));
        res.status(500).json({
        message: res.__('error.actors.edit'),
        objs: err
    })});
}

function destroy(req, res, next) {
    const id = req.params.id;
    Actor.remove({"_id":id}).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.actors.destroy'));
        res.status(200).json({
        message: res.__('ok.actors.destroy'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.actors.destroy'));
        res.status(500).json({
        message: res.__('error.actors.destroy'),
        objs: err
    })});
}

module.exports = {
    list,
    index,
    create,
    replace,
    edit,
    destroy
}
