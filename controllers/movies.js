const Movie = require('../models/movie');
const log4js = require('log4js')
var logger = log4js.getLogger();

function create(req, res, next) {
    const {
        genre,
        tilte,
        directorName,
        directorLastName,
        actors
    } = req.body;

    const director = new Object({
        _name: directorName,
        _lastName: directorLastName
    });

    let movie = new Movie({
        genre: genre,
        tilte: tilte,
        director: director,
        actors: actors
    });

    movie.save().then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.movies.create'));
        res.status(200).json({
        message: res.__('ok.movies.create'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.movies.create'));
        res.status(500).json({
        message: res.__('error.movies.create'),
        objs: err
    })});
}

function list(req, res, next) {
    Movie.find().populate('_actors').then(objs => {
        logger.level = "info";
        logger.info(res.__('ok.movies.list'));
        res.status(200).json({
        message: res.__('ok.movies.list'),
        objs: objs
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.movies.list'));
        res.status(500).json({
        message: res.__('error.movies.list'),
        objs: err
    })});
}

function index(req, res, next) {
    const id = req.params.id;
    Movie.findOne({'_id':id}).populate('_actors').then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.movies.index'));
        res.status(200).json({
        message: res.__('ok.movies.index'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.movies.index'));
        res.status(500).json({
        message: res.__('error.movies.index'),
        objs: err
    })}); 
}

async function edit(req, res, next) {
    const id = req.params.id;
    const movie = await Movie.findOne({'_id':id});

    const {
        genre,
        title,
        directorName,
        directorLastName,
        actors,
    } = req.body;

    if(genre){
        movie._genre = genre;
    }
    
    if(title){
        movie._title = title;
    }

    if(directorName){
        movie._director.set('_name', directorName);
    }
    
    if(directorLastName){
        movie._director.set('_lastName', directorLastName);
    }

    if(actors){
        movie._actors = actors;
    }
    

    movie.save().then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.movies.edit'));
        res.status(200).json({
        message: res.__('ok.movies.edit'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.movies.edit'));
        res.status(500).json({
        message: res.__('error.movies.edit'),
        objs: err
    })}); 
}

function replace(req, res, next) {
    const id = req.params.id;
    const {
        genre,
        title,
        directorName,
        directorLastName,
        actors,
    } = req.body;

    const director = new Object({
        _name: directorName,
        _lastName: directorLastName
    });

    let movie = new Object({
        _genre: genre,
        _title: title,
        _director: director,
        _actors: actors
    });

    Movie.findOneAndReplace({'_id':id}, movie).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.movies.replace'));
        res.status(200).json({
        message: res.__('ok.movies.replace'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.movies.replace'));
        res.status(500).json({
        message: res.__('error.movies.replace'),
        objs: err
    })}); 
}

function destroy(req, res, next) {
    const id = req.params.id;
    Movie.remove({'_id':id}).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.movies.destroy'));
        res.status(200).json({
        message: res.__('ok.movies.destroy'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.movies.destroy'));
        res.status(500).json({
        message: res.__('error.movies.destroy'),
        objs: err
    })}); 
}

module.exports = {
    create, list, index, edit, replace, destroy
}
