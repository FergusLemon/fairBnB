'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const listingController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'listing'));
const bookingRequestController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'bookingRequest'));

router.get('/new', listingController.new);

router.post('/', listingController.createListing);

router.get('/', listingController.getAllListings);

router.get('/:listingId', listingController.getListing);

router.post('/:listingId/bookingRequest/new', bookingRequestController.createBookingRequest);

router.get('/:listingId/bookingRequests', bookingRequestController.getAllMatchingRequests);

module.exports = router;
