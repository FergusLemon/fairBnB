'use strict';
const request = require('request');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const { server } = require(path.join(HOMEDIR, 'config'));
const { stockImageUrl } = require(path.join(HOMEDIR, 'config'));
const { stockImageId } = require(path.join(HOMEDIR, 'config'));

module.exports.new = function(req, res) {
  res.render('listings/new');
};

module.exports.createListing = function(req, res) {
  let url, id;
  if (req.file) {
    url = req.file.url;
    id = req.file.public_id;
    } else {
      url = stockImageUrl;
      id = stockImageId;
    }
  let image = {
    url: url,
    id: id
  };
  let postData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    owner: req.session.passport.user,
    image: image
  };
  let path = "/api/listings";
  request.post( {
    url: server + path,
    json: postData
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        let id = body.owner;
        res.redirect('users/' + id);
      } else {
        req.flash('error', 'Sorry, something went wrong. Please make sure you have entered the correct details.');
        res.render('listings/new', { dbError: req.flash('error') });
      }
  });
};

module.exports.getAllListings = function(req, res) {
  let path = "/api/listings";
  request.get( {
    url: server + path
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        let listings = JSON.parse(body);
        res.render('listings/all', { listings: listings });
      } else {
        req.flash('error', 'Sorry, there was an error on our side.');
        res.render('users/' + res.locals.userId, { dbError: req.flash('error') });
      }
  });
};

module.exports.getListing = function(req, res) {
  let listingId = req.params.listingId;
  let path = "/api/listings/" + listingId;
  request.get( {
    url: server + path
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        let listing = JSON.parse(body);
        res.render('listings/individual', { listing: listing });
      } else {
        req.flash('error', 'Sorry, there was an error on our side.');
        res.render('listings/all', { dbError: req.flash('error') });
      }
  });
};

module.exports.updateListing = function(req, res) {
  let listingId = req.params.listingId;
  let putData = {
    start: req.body.start,
    end: req.body.end
  };
  let path = "/api/listings/" + listingId;
  request.put( {
    url: server + path,
    json: putData
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        res.send(body);
      } else {
        req.flash('error', 'Sorry, there was an error on our side.');
        res.render('listings/' + listingId, { dbError: req.flash('error') });
      }
  });
};
