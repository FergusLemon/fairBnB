'use strict';
const mongoose = require('mongoose');
const sinon = require('sinon');
const sinonTest = require('sinon-test');
const sinonChai = require('sinon-chai');
const sinonMongoose = require('sinon-mongoose');
const sandboxed = sinonTest(sinon);
const chai = require('chai');
const expect = chai.expect;
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const ListingController = require(path.join(HOMEDIR, 'app_api', 'controllers', 'listing'));
const Listing = require(path.join(HOMEDIR, 'app_api', 'models', 'listing'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const ok = Factory.status('ok');
const error = Factory.status('api err');
const stub = sinon.stub();
const id = 1;
chai.use(sinonChai);
let err = stub;
let req = {
  body: {
    start: stub,
    end: stub
  },
  params: {
    listingId: id
  }
};
let res = {
  statusCalledWith: '',
  status: function(arg) {
    this.statusCalledWith += arg;
  },
  send: stub
};

describe('saving a listing', () => {
  describe('when a listing is saved in the database', () => {
    it('should call save once', sandboxed(function() {
      this.stub(Listing.prototype, 'save');
      ListingController.createListing(req, res);
      expect(Listing.prototype.save.callCount).to.equal(1);
      expect(Listing.prototype.save.callCount).to.not.equal(2);
    }));
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(Listing.prototype, 'save').yields(null, stub);
      ListingController.createListing(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });

  describe('when a listing is not saved in the database', () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(Listing.prototype, 'save').yields(err);
      ListingController.createListing(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});

describe("retrieving a user's listings", () => {
  describe("when successful", () => {
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(Listing, 'find').yields(null, stub);
      ListingController.getUserListings(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });

  describe("when unsuccessful", () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(Listing, 'find').yields(err);
      ListingController.getUserListings(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});

describe('retrieving all listings', () => {
  describe('when listings are successfully retrieved', () => {
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(Listing, 'find').yields(null, stub);
      ListingController.getAllListings(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });

  describe('when listings are not retrieved successfully', () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(Listing, 'find').yields(err);
      ListingController.getAllListings(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});

describe('retrieving an individual listing', () => {
  describe('when successful', () => {
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(Listing, 'findById').yields(null, stub);
      ListingController.getListing(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });

  describe('when unsuccessful', () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(Listing, 'findById').yields(err);
      ListingController.getListing(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});

describe('updating a listing', () => {

  describe('when successful', () => {
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(Listing, 'findByIdAndUpdate').yields(null, {});
      ListingController.updateListing(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });

  describe('when unsuccessful', () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(Listing, 'findByIdAndUpdate').yields(err);
      ListingController.updateListing(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});
