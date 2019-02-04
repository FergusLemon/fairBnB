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
const listingDetails = Factory.validListing();
const stub = sinon.stub();
const id = 1;
chai.use(sinonChai);

describe('when a listing is saved in the database', () => {
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
      send: stub
    };
    this.stub(Listing.prototype, 'save').yields(null, stub);
    ListingController.createListing(req, res);
    expect(res.statusCalledWith).to.contain(ok);
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
      send: stub
    };
    let err = this.stub();
    this.stub(Listing.prototype, 'save').yields(err);
    ListingController.createListing(req, res);
    expect(res.statusCalledWith).to.contain(error);
  }));
});

describe("when a user's listings are successfully retrieved", () => {
  let req = {
    params: {
      userId: id
    }
  };
  it('should respond with a 201 status code', sandboxed(function() {
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: stub
    };
    this.stub(Listing, 'find').yields(null, stub);
    ListingController.getUserListings(req, res);
    expect(res.statusCalledWith).to.contain(ok);
  }));
});
describe('when listings are not retrieved successfully', () => {
  let req = {
    params: {
      userId: id
    }
  };
  it('should respond with a 400 status code', sandboxed(function() {
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: stub
    };
    let err = this.stub();
    this.stub(Listing, 'find').yields(err);
    ListingController.getUserListings(req, res);
    expect(res.statusCalledWith).to.contain(error);
  }));
});

describe('when listings are successfully retrieved', () => {
  it('should respond with a 201 status code', sandboxed(function() {
    let req = {};
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: stub
    };
    this.stub(Listing, 'find').yields(null, stub);
    ListingController.getAllListings(req, res);
    expect(res.statusCalledWith).to.contain(ok);
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
      send: stub
    };
    let err = this.stub();
    this.stub(Listing, 'find').yields(err);
    ListingController.getAllListings(req, res);
    expect(res.statusCalledWith).to.contain(error);
  }));
});

describe('when an individual listing is successfully retrieved', () => {
  it('should respond with a 201 status code', sandboxed(function() {
    let req = {
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
    this.stub(Listing, 'findById').yields(null, stub);
    ListingController.getListing(req, res);
    expect(res.statusCalledWith).to.contain(ok);
  }));
});
describe('when an individual listing is not retrieved successfully', () => {
  it('should respond with a 400 status code', sandboxed(function() {
    let req = {
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
    let err = this.stub();
    this.stub(Listing, 'findById').yields(err);
    ListingController.getListing(req, res);
    expect(res.statusCalledWith).to.contain(error);
  }));
});

describe('when a listing is successfully updated', () => {
  it('should respond with a 201 status code', sandboxed(function() {
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
    this.stub(Listing, 'findByIdAndUpdate').yields(null, {});
    ListingController.updateListing(req, res);
    expect(res.statusCalledWith).to.contain(ok);
  }));
});

describe('when a listing is not updated successfully', () => {
  it('should respond with a 400 status code', sandboxed(function() {
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
    let err = this.stub();
    this.stub(Listing, 'findByIdAndUpdate').yields(err);
    ListingController.updateListing(req, res);
    expect(res.statusCalledWith).to.contain(error);
  }));
});
