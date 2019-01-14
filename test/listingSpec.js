'use strict';
const expect = require('chai').expect;
const Listing = require('../app_server/models/listings');

let listingDetails = {
  name: "Casa Test",
  description: "A delightful small test listing.",
  price: 100
};

let noName = {
  description: listingDetails.description,
  price: listingDetails.price
};

let noDescription = {
  name: listingDetails.name,
  price: listingDetails.price
};

let noPrice = {
  name: listingDetails.name,
  description: listingDetails.description
};

describe('name', () => {
  describe('when no details are provided', () => {
    it('is invalid', () => {
      let listing = new Listing();
      listing.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    });
  });
  describe('when no name is provided', () => {
    it('is invalid', () => {
      let listing = new Listing(noName);
      listing.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    });
  });
  describe('when details are provided', () => {
    it('is valid', () => {
      let listing = new Listing(listingDetails);
      listing.validate((err) => {
        expect(err).to.equal(null);
        expect(listing.name).to.equal(listingDetails.name);
      });
    });
  });
});

describe('description', () => {
  describe('when no description is provided', () => {
    it('is invalid', () => {
      let listing = new Listing(noDescription);
      listing.validate((err) => {
        expect(err.errors.description).to.exist;
      });
    });
  });
  describe('when details are provided', () => {
    it('is valid', () => {
      let listing = new Listing(listingDetails);
      listing.validate((err) => {
        expect(err).to.equal(null);
        expect(listing.description).to.equal(listingDetails.description);
      });
    });
  });
});

describe('price', () => {
  describe('when no price is provided', () => {
    it('is invalid', () => {
      let listing = new Listing(noPrice);
      listing.validate((err) => {
        expect(err.errors.price).to.exist;
      });
    });
  });
  describe('when details are provided', () => {
    it('is valid', () => {
      let listing = new Listing(listingDetails);
      listing.validate((err) => {
        expect(err).to.equal(null);
        expect(listing.price).to.equal(listingDetails.price);
      });
    });
  });
});
