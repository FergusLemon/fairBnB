const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const listingController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'listing'));

router.get('/new', listingController.new);

router.post('/', listingController.listings);

router.get('/', listingController.listings);

router.get('/:listingName', listingController.getListing);

router.post('/:listing-id/booking-request/new', listingController.addBookingRequest);

module.exports = router;
