'use strict';
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const Listing = require(path.join(HOMEDIR, 'app_api', 'models', 'listing'));

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.createListing = (req, res) => {
  let listing = new Listing(req.body);
  listing.save((err, user) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, listing);
    }
  });
};
