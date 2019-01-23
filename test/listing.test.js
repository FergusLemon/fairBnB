'use strict';
const expect = require('chai').expect;
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const Listing = require(path.join(HOMEDIR, 'app_api', 'models', 'listing'));
const ValidObject = require(path.join(HOMEDIR, 'test', 'helpers', 'modelHelpers'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const listingFactoryDetails = Factory.validListing();

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
        let validListing = new ValidObject(listingFactoryDetails);
        let noName = validListing.removePath('name');
        let listing = new Listing(noName);
        listing.validate((err) => {
          expect(err.errors.name).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let listing = new Listing(listingFactoryDetails);
        listing.validate((err) => {
          expect(err).to.equal(null);
          expect(listing.name).to.equal(listingFactoryDetails.name);
        });
      });
    });
  });

  describe('Description', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validListing = new ValidObject(listingFactoryDetails);
        let noDescription = validListing.removePath('description');
        let listing = new Listing(noDescription);
        listing.validate((err) => {
          expect(err.errors.description).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let listing = new Listing(listingFactoryDetails);
        listing.validate((err) => {
          expect(err).to.equal(null);
          expect(listing.description).to.equal(listingFactoryDetails.description);
        });
      });
    });
  });

  describe('Price', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validListing = new ValidObject(listingFactoryDetails);
        let noPrice = validListing.removePath('price');
        let listing = new Listing(noPrice);
        listing.validate((err) => {
          expect(err.errors.price).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let listing = new Listing(listingFactoryDetails);
        listing.validate((err) => {
          expect(err).to.equal(null);
          expect(listing.price).to.equal(listingFactoryDetails.price);
        });
      });
    });
  });
  describe('Owner', () => {
    describe('when not provided', () => {
      it('is invalid', () => {
        let validListing = new ValidObject(listingFactoryDetails);
        let noOwner = validListing.removePath('owner');
        let listing = new Listing(noOwner);
        listing.validate((err) => {
          expect(err.errors.owner).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('is valid', () => {
        let listing = new Listing(listingFactoryDetails);
        listing.validate((err) => {
          expect(err).to.equal(null);
          expect(listing.owner).to.equal(listingFactoryDetails.owner);
        });
      });
    });
  });
});
