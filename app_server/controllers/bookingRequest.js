'use strict';
const request = require('request');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const { server } = require(path.join(HOMEDIR, 'config'));

module.exports.createBookingRequest = function(req, res) {
  let postData = {
    listing: req.params.listingId,
    owner: req.body.owner,
    requestor: req.session.passport.user,
    requestStartDate: req.body.startDate,
    requestEndDate: req.body.endDate,
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
        res.send("Something went wrong with the database.");
      }
  });
};
