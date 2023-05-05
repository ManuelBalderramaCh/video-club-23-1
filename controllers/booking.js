const Booking = require('../models/booking');
const log4js = require('log4js')
var logger = log4js.getLogger();

function create(req, res, next) {
    const {
        copy,
        member,
        date
    } = req.body;

    let booking = new Booking({
        copy: copy,
        member: member,
        date: date
    });

    booking.save().then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.bookings.create'));
        res.status(200).json({
        message: res.__('ok.bookings.create'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.bookings.create'));
        res.status(500).json({
        message: res.__('error.bookings.create'),
        objs: err
    })});
}

function list(req, res, next) {
    Booking.find().populate('_member _copy').then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.bookings.list'));
        res.status(200).json({
        message: res.__('ok.bookings.list'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.bookings.list'));
        res.status(500).json({
        message: res.__('error.bookings.list'),
        objs: err
    })});
}

function index(req, res, next) {
    const id = req.params.id;
    Booking.findOne({'_id':id}).populate('_member _copy').then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.bookings.index'));
        res.status(200).json({
        message: res.__('ok.bookings.index'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.bookings.index'));
        res.status(500).json({
        message: res.__('error.bookings.index'),
        objs: err
    })});   
}

function edit(req, res, next) {
    const id = req.params.id;
    const booking = new Object();

    const {
        copy,
        member,
        date
    } = req.body;

    if(copy){
        booking._copy = copy;
    }
    
    if(member){
        booking._member = member;
    }

    if(date){
        booking._date = date;
    }

    Booking.findOneAndUpdate({"_id":id}, booking).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.bookings.edit'));
        res.status(200).json({
        message: res.__('ok.bookings.edit'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.bookings.edit'));
        res.status(500).json({
        message: res.__('error.bookings.edit'),
        objs: err
    })});   
}

function replace(req, res, next) {
    const id = req.params.id;
    const {
        copy,
        member,
        date
    } = req.body;

    let booking = new Object({
        _copy: copy,
        _member: member,
        _date: date
    });

    Booking.findOneAndReplace({'_id':id}, booking).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.bookings.replace'));
        res.status(200).json({
        message: res.__('ok.bookings.replace'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.bookings.replace'));
        res.status(500).json({
        message: res.__('error.bookings.replace'),
        objs: err
    })});   
}

function destroy(req, res, next) {
    const id = req.params.id;
    Booking.remove({'_id':id}).then(obj => {
        logger.level = "info";
        logger.info(res.__('ok.bookings.destroy'));
        res.status(200).json({
        message: res.__('ok.bookings.destroy'),
        objs: obj
    })}).catch(err => {
        logger.level = "error";
        logger.error(res.__('error.bookings.destroy'));
        res.status(500).json({
        message: res.__('error.bookings.destroy'),
        objs: err
    })});   
}

module.exports = {
    create, list, index, edit, replace, destroy
}
