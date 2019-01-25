'use strict';
const request = require('request');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const { server } = require(path.join(HOMEDIR, 'config'));

module.exports.new = function(req, res) {
  res.render('listings/new');
};

module.exports.createListing = function(req, res) {
  let postData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    owner: req.session.passport.user
  };
  console.log(postData);
  let path = "/api/listings";
  request.post( {
    url: server + path,
    json: postData
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        let id = body.owner
        res.redirect('users/' + id);
      } else {
        res.send("Something went wrong with the database.");
      }
  });
};

module.exports.getAllListings = function(req, res) {
  let path = "/api/listings";
  request.get( {
    url: server + path,
  },
    (err, response, body) => {
      console.log(body);
      if (response.statusCode === 201) {
        res.render('listings/all', { listings: body });
      } else {
        res.send("Something went wrong with the database.");
      }
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
