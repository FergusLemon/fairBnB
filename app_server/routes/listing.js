var express = require('express');
var router = express.Router();
var ctrlListing = require('../controllers/listing');

router.get('/new', ctrlListing.new);

module.exports = router;
