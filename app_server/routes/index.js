const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const mainController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'main'));
const passport = require(path.join(HOMEDIR, 'app_server', 'auth'));

router.get('/', mainController.index);

router.post('/', passport.authenticate('local-signIn', {
    failureRedirect: '/users',
    failureFlash: true
  }), mainController.authenticateUser);

router.get('/signout', mainController.signOut);

module.exports = router;
