const Copy = require('../models/copy');
const log4js = require('log4js')
var logger = log4js.getLogger();

function create(req, res, next) {
    const {
        format,
        movie,
        number,
        status
    } = req.body;

    let copy = new Copy({
        format: format,
        movie: movie,
        number: number,
        status: status
    });

    copy.save().then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.copies.create'));
        res.status(200).json({
        message: res.__('ok.copies.create'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.copies.create'));
        res.status(500).json({
        message: res.__('error.copies.create'),
        objs: err
    })});
}

function list(req, res, next) {
    Copy.find().populate('_movie').then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.copies.list'));
        res.status(200).json({
        message: res.__('ok.copies.list'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.copies.list'));
        res.status(500).json({
        message: res.__('error.copies.list'),
        objs: err
    })});
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findOne({'_id':id}).populate('_movie').then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.copies.index'));
        res.status(200).json({
        message: res.__('ok.copies.index'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.copies.index'));
        res.status(500).json({
        message: res.__('error.copies.index'),
        objs: err
    })}); 
}

function edit(req, res, next) {
    const id = req.params.id;
    const copy = new Object();

    const {
        format,
        movie,
        number,
        status
    } = req.body;

    if(format){
        copy._format = format;
    }
    
    if(movie){
        copy._movie = movie;
    }

    if(number){
        copy._number = number;
    }

    if(status){
        copy._status = status;
    }
    

    Copy.findOneAndUpdate({"_id":id}, copy).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.copies.edit'));
        res.status(200).json({
        message: res.__('ok.copies.edit'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.copies.edit'));
        res.status(500).json({
        message: res.__('error.copies.edit'),
        objs: err
    })}); 
}

function replace(req, res, next) {
    const id = req.params.id;
    const {
        format,
        movie,
        number,
        status
    } = req.body;

    let copy = new Object({
        _format: format,
        _movie: movie,
        _number: number,
        _status: status
    });

    Copy.findOneAndReplace({'_id':id}, copy).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.copies.replace'));
        res.status(200).json({
        message: res.__('ok.copies.replace'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.copies.replace'));
        res.status(500).json({
        message: res.__('error.copies.replace'),
        objs: err
    })}); 
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.remove({'_id':id}).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.copies.destroy'));
        res.status(200).json({
        message: res.__('ok.copies.destroy'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.copies.destroy'));
        res.status(500).json({
        message: res.__('error.copies.destroy'),
        objs: err
    })}); 
}

module.exports = {
    create, list, index, edit, replace, destroy
}
