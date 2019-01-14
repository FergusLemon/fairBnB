var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user');

router.get('/new', ctrlUser.new);

router.post('/', ctrlUser.users);

router.get('/:username', ctrlUser.overview);

router.get('/:user-id/booking-requests', ctrlUser.getBookingRequests);

module.exports = router;
