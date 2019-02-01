'use strict';
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const BookingRequest = require(path.join(HOMEDIR, 'app_api', 'models', 'bookingRequest'));

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.send(content);
};

module.exports.createBookingRequest = (req, res) => {
  let bookingRequest = new BookingRequest(req.body);
  bookingRequest.save((err, bookingRequest) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, bookingRequest);
    }
  });
};

module.exports.getAllInboundBookingRequests = (req, res) => {
  let id = req.params.ownerId;
  BookingRequest.find({ owner: id }, (err, bookingRequests) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, bookingRequests);
    }
  });
};

module.exports.updateBookingRequest = (req, res) => {
  let id = req.params.id;
  let approved = req.params.approved;
  let declined = req.params.declined;
  BookingRequest.findByIdAndUpdate(id, { approved: approved, declined: declined }, (err, bookingRequest) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, bookingRequest);
    }
  });
};
