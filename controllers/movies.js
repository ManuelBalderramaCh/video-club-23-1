const express = require('express');
const Director = require('../models/director');
const Movie = require('../models/movie');

function list(req, res, next) {
    Movie.find().populate("_director").then(objs => res.status(200).json({
        message: "Listado de peliculas",
        obj:objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo listar las peliculas",
        obj:ex
    }));
}

function index(req, res, next) {
    res.send(`respond with a index of a actor= ${req.params.id}`);
}

async function create(req, res, next) {
    const title = req.body.title;
    const directorId = req.body.directorId;

    let director = await Director.findOne({"_id": directorId});

    let movie = new Movie({
        title: title,
        director: director
    });

    movie.save().then(obj => res.status(200).json({
        message: "Pelicula creada correctamente",
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo crear la pelicula",
        obj:ex
    }));

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