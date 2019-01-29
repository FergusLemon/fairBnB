'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const listingController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'listing'));

router.get('/new', listingController.new);

router.post('/', listingController.createListing);

router.get('/', listingController.getAllListings);

router.get('/:listing', listingController.getListing);

router.post('/:listingId/bookingRequest/new', listingController.addBookingRequest);

module.exports = router;
