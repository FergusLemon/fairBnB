var express = require('express');
var router = express.Router();
var ctrlListing = require('../controllers/listing');

router.get('/new', ctrlListing.new);

router.post('/', ctrlListing.listings);

router.get('/', ctrlListing.listings);

router.get('/:listingName', ctrlListing.getListing);

module.exports = router;
