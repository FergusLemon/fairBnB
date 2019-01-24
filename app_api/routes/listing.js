'use strict';
const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listing');

router.post('/', listingsController.createListing);

module.exports = router;
