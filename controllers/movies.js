const express = require('express');
const Director = require('../models/director');
const Movie = require('../models/movie');


function list(req, res, next) {
    Movie.find().populate("_director").then(objs => res.status(200).json({
        message: res.__('ok.movie'),
        obj:objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.movie'),
        obj:ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Movie.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.movie'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.movie'),
        obj:ex
    }));
}

async function create(req, res, next) {
    const title = req.body.title;
    const directorId = req.body.directorId;

    let director = await Director.findOne({"_id":directorId});
    
    let movie = new Movie({
        title:title,
        director:director
    });

    movie.save()
         .then(obj => res.status(200).json({
            message: res.__('ok.movie'),
            obj:obj
         }))
         .catch(ex => res.status(500).json({
            message: res.__('bad.movie'),
            obj:ex
         }));

}

function replace(req, res, next) {
    const directorId = req.body.directorId ? req.body.directorId : "";
    let title = req.body.title ? req.body.title : "";

    let Movie = new Object({
        _title: title,
        _directorId: directorId
    });
  
    Movie.findOneAndUpdate({"_id":id},Movie,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('ok.movie'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.movie'),
                obj:ex
            }));
}

function update(req, res, next) {
    const directorId = req.params.directorId;
    let title = req.body.title;

    let Movie = new Object(); 

    if(description){
        Movie._title = title;
        Movie._directorId = directorId;
    }

    Permision.findOneAndUpdate({"_id":id},Permision)
            .then(obj => res.status(200).json({
                message: res.__('ok.permision'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.permision'),
                obj:ex
            }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Movie.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('ok.permision'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.permision'),
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