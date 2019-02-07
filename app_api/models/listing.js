'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const BookingRequest = require('./bookingRequest');
const bookingRequestSchema = BookingRequest.schema;
const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  owner: { type: ObjectId, required: true },
  image: mongoose.Schema.Types.Mixed,
  bookingRequests: [bookingRequestSchema],
  datesUnavailable: { type: Array, default: []}
});

module.exports = mongoose.model('Listing', listingSchema);
