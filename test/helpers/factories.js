'use strict';
const mongoose = require('mongoose');
const ownerID = mongoose.Types.ObjectId();
const listingID = mongoose.Types.ObjectId();
const requestorID = mongoose.Types.ObjectId();

module.exports.validUserOne = () => {
  return {
    username: "test@testmail.com",
    password: "p@$$W0rd",
    firstname: "Tess",
    lastname: "User",
    phoneNumber: "+447777777777"
  };
};

module.exports.validUserTwo = () => {
  return {
    username: "user@usermail.com",
    password: "p@$$W0rd",
    firstname: "Another",
    lastname: "User",
    phoneNumber: "+4488888888888"
  };
};

module.exports.validListing = () => {
  return {
    name: "Casa Test",
    description: "A delightful little test casa.",
    price: 100,
    owner: ownerID
  };
};

module.exports.validBookingRequest = () => {
  return {
    listing: listingID,
    owner: ownerID,
    requestor: requestorID,
    requestStartDate: '2019-12-25',
    requestEndDate: '2019-12-31',
    requestMadeDate: '2019-01-26'
  };
};
