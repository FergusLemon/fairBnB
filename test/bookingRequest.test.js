'use strict';
const expect = require('chai').expect;
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const BookingRequest = require(path.join(HOMEDIR, 'app_api', 'models', 'bookingRequest'));
const ValidObject = require(path.join(HOMEDIR, 'test', 'helpers', 'modelHelpers'));
const dateFormatter = require(path.join(HOMEDIR, 'test', 'helpers', 'dateHelpers'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const bookingRequestFactoryDetails = Factory.validBookingRequest();

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
        let validBookingRequest = new ValidObject(bookingRequestFactoryDetails);
        let noListing = validBookingRequest.removePath('listing');
        let bookingRequest = new BookingRequest(noListing);
        bookingRequest.validate((err) => {
          expect(err.errors.listing).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(bookingRequestFactoryDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          expect(bookingRequest.listing).to.equal(bookingRequestFactoryDetails.listing);
        });
      });
    });
  });
  describe('Owner ID is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(bookingRequestFactoryDetails);
        let noOwner = validBookingRequest.removePath('owner');
        let bookingRequest = new BookingRequest(noOwner);
        bookingRequest.validate((err) => {
          expect(err.errors.owner).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(bookingRequestFactoryDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          expect(bookingRequest.owner).to.equal(bookingRequestFactoryDetails.owner);
        });
      });
    });
  });
  describe('Requestor ID is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(bookingRequestFactoryDetails);
        let noRequestor = validBookingRequest.removePath('requestor');
        let bookingRequest = new BookingRequest(noRequestor);
        bookingRequest.validate((err) => {
          expect(err.errors.requestor).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(bookingRequestFactoryDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          expect(bookingRequest.requestor).to.equal(bookingRequestFactoryDetails.requestor);
        });
      });
    });
  });
  describe('Start date is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(bookingRequestFactoryDetails);
        let noStartDate = validBookingRequest.removePath('requestStartDate');
        let bookingRequest = new BookingRequest(noStartDate);
        bookingRequest.validate((err) => {
          expect(err.errors.requestStartDate).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(bookingRequestFactoryDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          let formattedDate = dateFormatter.format(bookingRequest.requestStartDate);
          expect(formattedDate).to.equal(bookingRequestFactoryDetails.requestStartDate);
        });
      });
    });
  });
  describe('End date is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(bookingRequestFactoryDetails);
        let noEndDate = validBookingRequest.removePath('requestEndDate');
        let bookingRequest = new BookingRequest(noEndDate);
        bookingRequest.validate((err) => {
          expect(err.errors.requestEndDate).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(bookingRequestFactoryDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          let formattedDate = dateFormatter.format(bookingRequest.requestEndDate);
          expect(formattedDate).to.equal(bookingRequestFactoryDetails.requestEndDate);
        });
      });
    });
  });
  describe('The date and time the request was made is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validBookingRequest = new ValidObject(bookingRequestFactoryDetails);
        let noMadeDate = validBookingRequest.removePath('requestMadeDate');
        let bookingRequest = new BookingRequest(noMadeDate);
        bookingRequest.validate((err) => {
          expect(err.errors.requestMadeDate).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let bookingRequest = new BookingRequest(bookingRequestFactoryDetails);
        bookingRequest.validate((err) => {
          expect(err).to.equal(null);
          let formattedDate = dateFormatter.format(bookingRequest.requestMadeDate);
          expect(formattedDate).to.equal(bookingRequestFactoryDetails.requestMadeDate);
        });
      });
    });
  });
});
