const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');

router.get('/new', ctrlUser.new);

router.post('/', ctrlUser.createUser);

router.get('/:username', ctrlUser.overview);

router.get('/:user-id/booking-requests', ctrlUser.getBookingRequests);

module.exports = router;
