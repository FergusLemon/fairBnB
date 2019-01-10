var express = require('express');
var router = express.Router();
var ctrlListing = require('../controllers/listing');

router.get('/new', ctrlListing.new);

router.post('/', ctrlListing.listings);

module.exports = router;
