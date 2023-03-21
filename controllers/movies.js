const express = require('express');
const { Movie, Actor } = require('../db');


function list(req, res, next) {
    Movie.findAll({include:['genre', 'director', 'actor']})
         .then(objects => res.json(objects))    
         .catch(err => res.send(err));
}

function index(req, res, next) {
    res.send(`respond with a index of a user= ${req.params.id}`);
}

function create(req, res, next) {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    let movie = new Object({
        title:title,
        genreId:genreId,
        directorId:directorId,
    });

    Movie.create(movie)  
         .then(obj => res.json(obj))    
         .catch(err => res.send(err));
}

function addActor(req, res, next){
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;

    Movie.findByPk(idMovie)
        .then(movie => {
            Actor.findByPk(idActor)
                 .then(actor =>{
                    movie.addActor(actor)
                    res.json(movie);
                 }).catch(err => res.send(err));
        }).catch(err => res.send(err));
    
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
    destroy,
    addActor
};