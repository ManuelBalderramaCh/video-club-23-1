const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { accesibleRecordsPlugin } = require('@casl/mongoose');
const mongoose = require('mongoose');
const config = require('config');
const i18n = require('i18n');
const {expressjwt} = require('express-jwt');

mongoose.plugin(accesibleRecordsPlugin);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const bookingRouter = require('./routes/booking');
const copyRouter = require('./routes/copy');
const actorsRouter = require('./routes/actors');
const permisionsRouter = require('./routes/permisions');
const directorsRouter = require('./routes/directors');
const membersRouter = require('./routes/members');
const adressRouter = require('./routes/adress');

const jwtKey = config.get("secret.key");

// mongodb:://<dbUser>?:<dbPass>?@<direction>:<port>/<dbName>
const uri = config.get("dbChain");
mongoose.connect(uri);

const db = mongoose.connection;

const app = express();

db.on('open', () => {
  console.log("Conexion Ok");
});

db.on('error', () => {
  console.log("No se ha podido iniciar la conexion");
});

i18n.configure({
  locales:['es', 'en'],
  cookie: 'language',
  directory: `${__dirname}/locales`
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use(expressjwt({secret: jwtKey, algorithms: ['HS256']})
   .unless({path:["/login"]}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', movieRouter);
app.use('/booking',bookingRouter);
app.use('/copy',copyRouter);
app.use('./permisions', permisionsRouter);
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