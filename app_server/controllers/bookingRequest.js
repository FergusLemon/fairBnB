'use strict';
const request = require('request');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const { server } = require(path.join(HOMEDIR, 'config'));
const dateHelper = require(path.join(HOMEDIR, 'test', 'helpers', 'dateHelpers'));

module.exports.createBookingRequest = function(req, res) {
  let dateSplit = dateHelper.splitDate(req.body.dates);
  let postData = {
    listing: req.params.listingId,
    listingName: req.body.listingName,
    owner: req.body.owner,
    requestor: req.session.passport.user,
    requestStartDate: dateSplit[0],
    requestEndDate: dateSplit[1],
    requestMadeDate: Date.now()
  };
  let path = "/api/bookingRequests";
  request.post( {
    url: server + path,
    json: postData
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        let id = body.requestor;
        res.redirect('http://localhost:3000/users/' + id);
      } else {
        req.flash('error', 'Sorry, there was an error on our side.');
        res.render('listings/' + req.params.listingId, { dbError: req.flash('error') });
      }
  });
};

module.exports.updateBookingRequest = function(req, res) {
  let bookingRequestId = req.params.bookingRequestId;
  let putData = {
    id: bookingRequestId,
    approved: req.body.approved,
    declined: req.body.declined,
    status: req.body.status
  };
  let path = "/api/bookingRequests/" + bookingRequestId;
  request.put( {
    url: server + path,
    json: putData
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        res.send(body);
      } else {
        req.flash('error', 'Sorry, there was an error on our side.');
        res.render('users/' + res.locals.userId + '/listings/bookingRequests', { dbError: req.flash('error') });
      }
  });
};

module.exports.getAllMatchingRequests = function(req, res) {
  let listingId = req.params.listingId;
  let query = req.query;
  let path = "/api/listings/" + listingId + "/bookingRequests";
  request.get( {
    url: server + path,
    qs: query
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
