const express = require('express');

function list(req, res, next) {
    res.send('respond with a actor list');
}

function index(req, res, next) {
    res.send(`respond with a index of a actor= ${req.params.id}`);
}

function create(req, res, next) {
    let title = req.body.title;
    res.send(`respond with a create title actor =${title}`);
}

function replace(req, res, next) {
    res.send(`respond with a replace actor= ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`respond with a update actor = ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`respond with a destory actor= ${req.params.id}`);
}

module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy
};