'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const sessionController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'session'));
const passport = require(path.join(HOMEDIR, 'app_server', 'auth'));

router.get('/new', sessionController.new);

router.post('/', passport.authenticate('local-signIn', {
    failureRedirect: 'session/new',
    failureFlash: true
  }), sessionController.authenticateUser);

router.get('/:username', sessionController.overview);

module.exports = router;
