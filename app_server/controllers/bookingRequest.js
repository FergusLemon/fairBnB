'use strict';
const request = require('request');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const { server } = require(path.join(HOMEDIR, 'config'));

module.exports.createBookingRequest = function(req, res) {
  let postData = {
    listing: req.body.listing,
    requestor: req.session.passport.user,
    requestStartDate: req.body.requestStartDate,
    requestEndDate: req.body.requestEndDate,
    requestMadeDate: req.body.requestMadeDate
  };
  let path = "/api/bookingRequests";
  request.post( {
    url: server + path,
    json: postData
  },
    (err, response, body) => {
      if (response.statusCode === 201) {
        let id = body.requestor
        res.redirect('users/' + id);
      } else {
        res.send("Something went wrong with the database.");
      }
  });
};
