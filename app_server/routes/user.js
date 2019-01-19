const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');

router.get('/new', ctrlUser.getSignUpForm);

router.post('/', ctrlUser.createUser);

router.get('/:username', ctrlUser.getUserHomepage);

router.get('/:user-id/booking-requests', ctrlUser.getBookingRequests);

module.exports = router;
