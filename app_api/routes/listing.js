'use strict';
const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listing');

router.get('/listings', listingsController.getAllListings);
router.get('/users/:user-id/listings/:listing-id', listingsController.getListing);
router.post('/users/:user-id/listings', listingsController.createListing);
router.put('/users/:user-id/listings/:listing-id', listingsController.updateListing);
router.delete('/users/:user-id/listings/:listing-id', listingsController.deleteListing);

module.exports = router;
