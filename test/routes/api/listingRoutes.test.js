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
chai.use(sinonChai);

describe('when a listing is saved in the database', () => {
  let listingDetails, listing;
  beforeEach(() => {
    listingDetails = Factory.validListing();
    listing = new Listing(listingDetails);
  });

  it('should call save once', sandboxed(function() {
    let req = {
      body: listingDetails
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith = arg;
      }
    };
    this.stub(Listing.prototype, 'save');
    ListingController.createListing(req, res);
    expect(Listing.prototype.save.callCount).to.equal(1);
    expect(Listing.prototype.save.callCount).to.not.equal(2);
  }));
  it('should respond with a 201 status code', sandboxed(function() {
    let req = {
      body: listingDetails
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: sinon.stub()
    };
    this.stub(Listing.prototype, 'save').yields(null, listing);
    ListingController.createListing(req, res);
    expect(res.statusCalledWith).to.contain(201);
  }));
});

describe('when a listing is not saved in the database', () => {
  it('should respond with a 400 status code', sandboxed(function() {
    let req = {
      body: {}
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: sinon.stub()
    };
    let err = this.stub();
    this.stub(Listing.prototype, 'save').yields(err);
    ListingController.createListing(req, res);
    expect(res.statusCalledWith).to.contain(400);
  }));
});

describe('when listings are successfully retrieved', () => {
  let listingDetails, listing, listings;
  beforeEach(() => {
    listingDetails = Factory.validListing();
    listing = new Listing(listingDetails);
    listings = Listing.find();
  });
  it('should respond with a 201 status code', sandboxed(function() {
    let req = {};
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: sinon.stub()
    };
    this.stub(Listing, 'find').yields(null, listings);
    ListingController.getAllListings(req, res);
    expect(res.statusCalledWith).to.contain(201);
  }));
});
describe('when listings are not retrieved successfully', () => {
  it('should respond with a 400 status code', sandboxed(function() {
    let req = {
      body: {}
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: sinon.stub()
    };
    let err = this.stub();
    this.stub(Listing, 'find').yields(err);
    ListingController.getAllListings(req, res);
    expect(res.statusCalledWith).to.contain(400);
  }));
});

describe('when an individual listing is successfully retrieved', () => {
  let listingDetails, listing, testListing, id;
  beforeEach(() => {
    listingDetails = Factory.validListing();
    testListing = new Listing(listingDetails);
    id = testListing.id;
    listing = Listing.findById(id);
  });
  it('should respond with a 201 status code', sandboxed(function() {
    let req = {
      params: {
        listingId: 1
      }
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: sinon.stub()
    };
    this.stub(Listing, 'findById').yields(null, listing);
    ListingController.getListing(req, res);
    expect(res.statusCalledWith).to.contain(201);
  }));
});
describe('when an individual listing is not retrieved successfully', () => {
  it('should respond with a 400 status code', sandboxed(function() {
    let req = {
      params: {
        listingId: 1
      }
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: sinon.stub()
    };
    let err = this.stub();
    this.stub(Listing, 'findById').yields(err);
    ListingController.getListing(req, res);
    expect(res.statusCalledWith).to.contain(400);
  }));
});
