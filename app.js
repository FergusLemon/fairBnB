'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const server = require('./app_server/routes/index');
const user = require('./app_server/routes/user');
const listing = require('./app_server/routes/listing');
const userSession = require('./app_server/routes/session');
const api = require('./app_api/routes/index');
const apiUser = require('./app_api/routes/user');
const apiListing = require('./app_api/routes/listing');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');
const { secret } = require('./config');
require('./app_api/models/db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(session({ cookie: { maxAge: 60000 },
                  secret: process.env.SESSION_SECRET,
                  resave: false,
                  saveUninitialized: false}));
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use('/', server);
app.use('/api', api);
app.use('/api/users', apiUser);
app.use('/api/listings', apiListing);
app.use('/users', user);
app.use('/listings', listing);
app.use('/session', userSession);

module.exports = app;
