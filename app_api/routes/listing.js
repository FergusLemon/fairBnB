'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const listingsController = require(path.join(HOMEDIR, 'app_api', 'controllers', 'listing'));

router.post('/', listingsController.createListing);

router.get('/', listingsController.getAllListings);

router.get('/:listingId', listingsController.getListing);

module.exports = router;
