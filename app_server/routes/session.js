'use strict';
let express = require('express');
let router = express.Router();
let sessionController = require('../controllers/session');
let passport = require('../auth.js');

router.get('/new', sessionController.new);

router.post('/', passport.authenticate('local', {
    failureRedirect: 'session/new',
    failureFlash: true
  }), sessionController.authenticateUser);

router.get('/:username', sessionController.overview);

module.exports = router;
