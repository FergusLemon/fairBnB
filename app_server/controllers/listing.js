'use strict';
const request = require('request');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const { server } = require(path.join(HOMEDIR, 'config'));

module.exports.new = function(req, res) {
  res.render('listings/new');
};

module.exports.addListing = function(req, res) {
  let postData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    owner: req.body.ownerID
  };
  let path = "/api/listings";
  request.post( {
    url: server + path,
    json: postData
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        res.redirect('users/' + body.ownerID);
      } else {
        res.send("Something went wrong with the database.");
      }
  });
};

module.exports.getAllListings = function(req, res) {
  res.render('listings/all', {
    properties: [{
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    }, {
      name: "Dummy Casa 1",
      description: "A great first dummy casa with fantastic views.",
      price: "100"
    }, {
      name: "Dummy Casa 2",
      description: "A cosy second dummy casa with superb amenities.",
      price: "50"
    }]
  });
};

module.exports.getListing = function(req, res) {
  res.render('listings/individual', {
    name: "Dummy Casa 1",
    description: "A great first dummy casa with fantastic views.",
    price: "100"
  });
};

module.exports.addBookingRequest = function(req, res) {
  res.render('users/overview');
};
