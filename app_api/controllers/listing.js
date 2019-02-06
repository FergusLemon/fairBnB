'use strict';
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const Listing = require(path.join(HOMEDIR, 'app_api', 'models', 'listing'));
const dateHelper = require(path.join(HOMEDIR, 'test', 'helpers', 'dateHelpers'));

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.send(content);
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

module.exports.getUserListings = (req, res) => {
  let userId = req.params.userId;
  Listing.find({ owner: userId }, (err, listings) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, listings);
    }
  });
};

module.exports.getAllListings = (req, res) => {
  Listing.find({}, (err, listings) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, listings);
    }
  });
};

module.exports.getListing = (req, res) => {
  let listingId = req.params.listingId;
  Listing.findById(listingId, (err, listing) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, listing);
    }
  });
};

module.exports.updateListing = (req, res) => {
  let id = req.params.listingId;
  let start = req.body.start;
  let end = req.body.end;
  let dates = dateHelper.datesInARange(start, end);
  Listing.findByIdAndUpdate(id, {
    $push: {
      datesUnavailable: {
        $each: dates
      }
    }
  }, { new: true }, (err, listing) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, { success: true });
    }
  });
};
