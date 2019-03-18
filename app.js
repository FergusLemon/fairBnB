'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const server = require('./app_server/routes/index');
const user = require('./app_server/routes/user');
const listing = require('./app_server/routes/listing');
const bookingRequest = require('./app_server/routes/bookingRequest');
const api = require('./app_api/routes/index');
const apiUser = require('./app_api/routes/user');
const apiListing = require('./app_api/routes/listing');
const apiBookingRequest = require('./app_api/routes/bookingRequest');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');

const { environment, secret, herokuHost } = require('./config');
const redis = require('redis');
let client, host, port;
if (environment === 'production') {
  client = redis.createClient(process.env.REDIS_URL);
  host = herokuHost;
  port = 15109;
} else {
  client = redis.createClient();
  host = 'localhost';
  port = 6379;
}
const RedisStore = require('connect-redis')(session);

require('./app_api/models/db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({ cookie: { maxAge: 900000 },
                  store: new RedisStore({ client: client, host: host, port: port, ttl: 260 }),
                  secret: secret,
                  resave: false,
                  saveUninitialized: false}));

app.use(express.static('public'));
app.use(flash());
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  if (req.session.passport !== undefined) {
    res.locals.loggedIn = true;
    res.locals.userId = req.session.passport.user;
  }
  next();
});

app.use('/', server);
app.use('/users', user);
app.use('/listings', listing);
app.use('/bookingRequests', bookingRequest);
app.use('/api', api);
app.use('/api/users', apiUser);
app.use('/api/listings', apiListing);
app.use('/api/bookingRequests', apiBookingRequest);

app.use(function(req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
  err.statusCode = 404;
  err.message = "Sorry, we couldn't find the page you are looking for: " + req.url;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err instanceof TypeError) {
    err.stateusCode = 500;
    err.message = "Sorry, your session timed out, please sign in again.";
  } else if (!err.statusCode)
  {
    err.statusCode = 500;
    err.message = `Sorry, something went wrong on our side. Please try and sign
    in again.`;
  }
  res.render('errorPage', { status: err.statusCode, message: err.message });
});

module.exports = app;
