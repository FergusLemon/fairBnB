'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const listingsController = require(path.join(HOMEDIR, 'app_api', 'controller', 'listing');

router.post('/', listingsController.createListing);

router.get('/', listingsController.getAllListings);

module.exports = router;
