'use strict';

const express = require('express');
const router = express.Router();
const bookingRequestsController = require('../controllers/bookingRequest');

router.post('/', bookingRequestsController.createBookingRequest);

router.get('/:userId', bookingRequestsController.getAllBookingRequests);

router.put('/:bookingRequestId', bookingRequestsController.updateBookingRequest);

module.exports = router;
