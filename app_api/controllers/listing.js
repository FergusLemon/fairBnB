'use strict';
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const Listing = require(path.join(HOMEDIR, 'app_api', 'models', 'listing'));

let sendJsonResponse = function(res, status, content) {
  console.log(content);
  res.status(status);
  res.json(content);
};

module.exports.createListing = (req, res) => {
  let listing = new Listing(req.body);
  listing.save((err, listing) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, listing);
    }
  });
};

module.exports.getAllListings = (req, res) => {
  Listing.find((err, listings) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, listings);
    }
  });
};
