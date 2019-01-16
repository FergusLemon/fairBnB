'use strict';
const expect = require('chai').expect;
const BookingRequest = require('../app_server/models/bookingRequests');
const mongoose = require('mongoose');
const listingId = mongoose.Types.ObjectId();
const requestorId = mongoose.Types.ObjectId();
const ValidObject = require('./helpers/modelHelpers');
const dateFormatter = require('./helpers/dateHelpers');
const details = {
  listing: listingId,
  requestor: requestorId,
  requestStartDate: '2019-12-25',
  requestEndDate: '2019-12-31',
  requestMadeDate: '2019-01-12'
};
const validDetails = new ValidObject(details);

describe('A booking request', () => {
  describe('when no details are provided', () => {
    it('is invalid', () => {
      let bookingRequest = new BookingRequest();
      bookingRequest.validate((err) => {
        expect(err.errors.listing).to.exist;
      });
    });
  });
  describe('Listing ID is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(details);
        let noListing = validBookingRequest.removePath('listing');
        let bookingRequest = new BookingRequest(noListing);
        bookingRequest.validate((err) => {
          expect(err.errors.listing).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(validDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          expect(bookingRequest.listing).to.equal(validDetails.listing);
        });
      });
    });
  });
  describe('Requestor ID is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(details);
        let noRequestor = validBookingRequest.removePath('requestor');
        let bookingRequest = new BookingRequest(noRequestor);
        bookingRequest.validate((err) => {
          expect(err.errors.requestor).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(validDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          expect(bookingRequest.requestor).to.equal(validDetails.requestor);
        });
      });
    });
  });
  describe('Start date is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(details);
        let noStartDate = validBookingRequest.removePath('requestStartDate');
        let bookingRequest = new BookingRequest(noStartDate);
        bookingRequest.validate((err) => {
          expect(err.errors.requestStartDate).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(validDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          let formattedDate = dateFormatter.format(bookingRequest.requestStartDate);
          expect(formattedDate).to.equal(validDetails.requestStartDate);
        });
      });
    });
  });
  describe('End date is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(details);
        let noEndDate = validBookingRequest.removePath('requestEndDate');
        let bookingRequest = new BookingRequest(noEndDate);
        bookingRequest.validate((err) => {
          expect(err.errors.requestEndDate).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(validDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          let formattedDate = dateFormatter.format(bookingRequest.requestEndDate);
          expect(formattedDate).to.equal(validDetails.requestEndDate);
        });
      });
    });
  });
  describe('The date and time the request was made is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(details);
        let noMadeDate = validBookingRequest.removePath('requestMadeDate');
        let bookingRequest = new BookingRequest(noMadeDate);
        bookingRequest.validate((err) => {
          expect(err.errors.requestMadeDate).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(validDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          let formattedDate = dateFormatter.format(bookingRequest.requestMadeDate);
          expect(formattedDate).to.equal(validDetails.requestMadeDate);
        });
      });
    });
  });
});
