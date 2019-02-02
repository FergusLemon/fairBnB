'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const bookingRequestController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'bookingRequest'));

router.put('/:bookingRequestId', bookingRequestController.updateBookingRequest);

module.exports = router;
