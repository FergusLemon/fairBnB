'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');
const listingsController = require('../controllers/listing');

router.post('/', usersController.createUser);

router.get('/:userId/listings', listingsController.getUserListings);

module.exports = router;
