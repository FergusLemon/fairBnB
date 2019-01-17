'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bookingRequestSchema = new mongoose.Schema({
  listing: { type: ObjectId, required: true },
  requestor: { type: ObjectId, required: true },
  requestStartDate: { type: Date, required: true },
  requestEndDate: { type: Date, required: true },
  requestMadeDate: { type: Date, required: true}
});

module.exports = mongoose.model('BookingRequest', bookingRequestSchema);
module.exports.schema = bookingRequestSchema;