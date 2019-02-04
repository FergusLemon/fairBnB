'use strict';
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const BookingRequest = require(path.join(HOMEDIR, 'app_api', 'models', 'bookingRequest'));
const dateHelper = require(path.join(HOMEDIR, 'test', 'helpers', 'dateHelpers'));

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

module.exports.getAllBookingRequests = (req, res) => {
  let id = req.params.userId;
  let directionOfBookingRequest = req.query.direction;
  let search;
  if (directionOfBookingRequest === 'inbound') {
    search = { owner: id };
  } else {
    search = { requestor: id };
  }
  BookingRequest.find(search, (err, bookingRequests) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, bookingRequests);
    }
  });
};

module.exports.updateBookingRequest = (req, res) => {
  let id = req.body.id;
  let approved = req.body.approved;
  let declined = req.body.declined;
  let status = req.body.status;
  BookingRequest.findByIdAndUpdate(id, {
    approved: approved,
    declined: declined,
    status: status },
    { new: true }, (err, bookingRequest) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, { success: true });
    }
  });
};

module.exports.getAllMatchingRequests = (req, res) => {
  let listingId = req.params.listingId;
  let start = dateHelper.iso(req.query.start);
  let status = false;
  let end = dateHelper.iso(req.query.end);
  BookingRequest.find({
      listing: listingId,
      approved: status,
      $or : [ { requestStartDate: { $gte: start, $lte: end } }, { requestEndDate: { $lte: end, $gte: start } } ]
  }, (err, bookingRequests) => {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, { success: true, bookingRequests: bookingRequests });
    }
  });
};
