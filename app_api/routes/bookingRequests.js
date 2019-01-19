'use strict';

const express = require('express');
const router = express.Router();
const bookingRequestsController = require('../controllers/bookingRequests');

router.get('/users/:user-id/booking-requests', bookingRequestsController.getAllOutbound);
router.get('/users/:user-id/listings/booking-requests', bookingRequestsController.getAllInbound);
router.get('/users/:user-id/listings/:listing-id/booking-requests', bookingRequestsController.getAllForListing);
router.get('/users/:user-id/listings/:listing-id/booking-requests/:booking-request-id', bookingRequestsController.getOneForListing);
router.post('/users/:user-id/listings/:listing-id', bookingRequestsController.createBookingRequest);

module.exports = router;
