'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var server = require('./app_server/routes/index');
var api = require('./app_api/routes/index');
var user = require('./app_server/routes/user');
var listing = require('./app_server/routes/listing');
var session = require('./app_server/routes/session');
require('./app_api/models/db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use('/', server);
app.use('/api', api);
app.use('/users', user);
app.use('/listings', listing);
app.use('/session', session);

module.exports = app;
