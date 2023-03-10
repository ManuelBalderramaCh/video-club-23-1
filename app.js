var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var movieRouter = require('./routes/movie');
var bookingRouter = require('./routes/booking');
var copyRouter = require('./routes/copy');
var awaitListRouter = require('./routes/awaitList');
var genreRouter = require('./routes/genres');
var actorsRouter = require('./routes/actors');
var directorsRouter = require('./routes/directors');
var membersRouter = require('./routes/members');
var adressRouter = require('./routes/adress');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movie', movieRouter);
app.use('/booking',bookingRouter);
app.use('/copy',copyRouter);
app.use('/awaitList',awaitListRouter);
app.use('/genre',genreRouter);
app.use('/actors',actorsRouter);
app.use('/directors',directorsRouter);
app.use('/members',membersRouter);
app.use('/adress',adressRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;