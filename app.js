var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const MongoStore = require('connect-mongo');

const jwtAuth = require('./lib/jwtAuth');
const tokenAuth = require('./lib/tokenAuth'); 

const loginController = require('./routes/loginController');

const conn = require('./lib/connectMongoose');
require('./models/Anuncio');
const Usuario = require('./models/Usuario');

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = 'Nodepop';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuramos multiidioma en express
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

/**
 * Middlewares de mi api
 */

/*// middleware de control de sesiones
app.use(session({
  name: 'nodepop-session',
  secret: 'askjdahjdhakdhaskdas7dasd87asd89as7d89asd7a9s8dhjash',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true }, //Inactividad
  store: new MongoStore({
    // como conectarse a mi base de datos
    url: 'mongodb://localhost/nodepop' 
  })
}));*/

/**
 * Middlewares de la API
 */

app.post('/api/auth', loginController.postLoginJWT);
app.use('/api/anuncios', jwtAuth(), require('./routes/api/anuncios'));


/**
 * Middlewares de la aplicación web
 */
app.use('/',      require('./routes/index'));
app.use('/lang',  require('./routes/lang'));
app.use('/users', require('./routes/users'));

app.get('/login',  loginController.index);
app.post('/login', loginController.postLoginJWT);
app.get('/logout', loginController.logout);

app.get('/',tokenAuth(),require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // si es una petición de API, respondemos con JSON
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/ap') === 0;
}

module.exports = app;
