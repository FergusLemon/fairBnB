'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const server = require('./app_server/routes/index');
const apiUser = require('./app_api/routes/users');
const user = require('./app_server/routes/user');
const listing = require('./app_server/routes/listing');
const session = require('./app_server/routes/session');
require('./app_api/models/db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use('/', server);
app.use('/api/users', apiUser);
app.use('/users', user);
app.use('/listings', listing);
app.use('/session', session);

module.exports = app;
