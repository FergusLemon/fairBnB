'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const userController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'user'));
const passport = require(path.join(HOMEDIR, 'app_server', 'auth'));

router.get('/new', userController.getSignUpForm);

router.post('/', userController.createUser);

router.get('/:userId', userController.getUserHomepage);

router.get('/:userId/listings', userController.getUserListings);

router.get('/:userId/listings/bookingRequests', userController.getAllInboundBookingRequests);

module.exports = router;
