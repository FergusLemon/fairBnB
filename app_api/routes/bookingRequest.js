'use strict';

const express = require('express');
const router = express.Router();
const bookingRequestsController = require('../controllers/bookingRequest');

router.post('/', bookingRequestsController.createBookingRequest);

router.get('/:ownerId', bookingRequestsController.getAllInboundBookingRequests);

module.exports = router;
