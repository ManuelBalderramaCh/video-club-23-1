const express = require('express');

function list(req, res, next) {
    res.send('respond with a actor list');
}

function index(req, res, next) {
    res.send(`respond with a index of a user= ${req.params.id}`);
}

function create(req, res, next) {
    let title = req.body.title;
    res.send(`respond with a create title userr =${title}`);
}

function replace(req, res, next) {
    res.send(`respond with a replace userr= ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`respond with a update userr = ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`respond with a destory userr= ${req.params.id}`);
}

module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy
};