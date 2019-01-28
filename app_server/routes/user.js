'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const userController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'user'));
const passport = require(path.join(HOMEDIR, 'app_server', 'auth'));

router.get('/new', userController.getSignUpForm);

router.post('/', userController.createUser);

router.get('/:username', userController.getUserHomepage);

router.get('/:user-id/booking-requests', userController.getBookingRequests);

module.exports = router;
