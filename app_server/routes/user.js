'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const userController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'user'));
const bookingRequestController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'bookingRequest'));
const passport = require(path.join(HOMEDIR, 'app_server', 'auth'));

router.get('/new', userController.getSignUpForm);

router.get('/', userController.getSignInForm);

router.post('/', userController.createUser);

router.get('/:userId', userController.getUserHomepage);

router.get('/:userId/listings', userController.getUserListings);

router.get('/:userId/listings/bookingRequests', userController.getAllBookingRequests);

router.get(/\w+\/bookingRequests/, userController.getAllBookingRequests);

router.put('/:userId/listings/:listingId/bookingRequests/:bookingRequestId', bookingRequestController.updateBookingRequest);

module.exports = router;
