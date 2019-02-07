'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const listingController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'listing'));
const bookingRequestController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'bookingRequest'));

const { cloudName } = require(path.join(HOMEDIR, 'config'));
const { cloudApi } = require(path.join(HOMEDIR, 'config'));
const { cloudSecret } = require(path.join(HOMEDIR, 'config'));
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
cloudinary.config({
cloud_name: cloudName,
api_key: cloudApi,
api_secret: cloudSecret
});
const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "fairBnB",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

router.get('/new', listingController.new);

router.post('/', parser.single("image"), listingController.createListing);

router.get('/', listingController.getAllListings);

router.get('/:listingId', listingController.getListing);

router.put('/:listingId', listingController.updateListing);

router.post('/:listingId/bookingRequest/new', bookingRequestController.createBookingRequest);

router.get('/:listingId/bookingRequests', bookingRequestController.getAllMatchingRequests);

module.exports = router;
