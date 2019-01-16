'use strict';
const expect = require('chai').expect;
const Listing = require('../app_api/models/listings');
const ValidObject = require('./helpers/modelHelpers');
const mongoose = require('mongoose');
const ownerId = mongoose.Types.ObjectId();
const details = {
  name: "Casa Test",
  description: "A delightful small test listing.",
  price: 100,
  owner: ownerId
};
const validDetails = new ValidObject(details);

describe('A listing', () => {
  describe('when no details are provided', () => {
    it('is invalid', () => {
      let listing = new Listing();
      listing.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    });
  });

  describe('Name is required', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validListing = new ValidObject(details);
        let noName = validListing.removePath('name');
        let listing = new Listing(noName);
        listing.validate((err) => {
          expect(err.errors.name).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let listing = new Listing(validDetails);
        listing.validate((err) => {
          expect(err).to.equal(null);
          expect(listing.name).to.equal(validDetails.name);
        });
      });
    });
  });

  describe('Description', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validListing = new ValidObject(details);
        let noDescription = validListing.removePath('description');
        let listing = new Listing(noDescription);
        listing.validate((err) => {
          expect(err.errors.description).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let listing = new Listing(validDetails);
        listing.validate((err) => {
          expect(err).to.equal(null);
          expect(listing.description).to.equal(validDetails.description);
        });
      });
    });
  });

  describe('Price', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validListing = new ValidObject(details);
        let noPrice = validListing.removePath('price');
        let listing = new Listing(noPrice);
        listing.validate((err) => {
          expect(err.errors.price).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let listing = new Listing(validDetails);
        listing.validate((err) => {
          expect(err).to.equal(null);
          expect(listing.price).to.equal(validDetails.price);
        });
      });
    });
  });
  describe('Owner', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validListing = new ValidObject(details);
        let noOwner = validListing.removePath('owner');
        let listing = new Listing(noOwner);
        listing.validate((err) => {
          expect(err.errors.owner).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let listing = new Listing(validDetails);
        listing.validate((err) => {
          expect(err).to.equal(null);
          expect(listing.owner).to.equal(validDetails.owner);
        });
      });
    });
  });
});
