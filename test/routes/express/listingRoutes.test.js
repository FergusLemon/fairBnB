'use strict';

const sinon = require('sinon');
const sinonTest = require('sinon-test');
const sandboxed = sinonTest(sinon);
const sinonChai = require('sinon-chai');
const chai = require('chai');
const expect = chai.expect;
const request = require('request');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const ListingController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'listing'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
chai.use(sinonChai);

describe('creating a listing', () => {
  let listingDetails, req;
  beforeEach(() => {
    listingDetails = Factory.validListing();
    req = {
      body: listingDetails,
      session: {
        passport: { user: "stubbedID" }
      }
    };
  });
  it('makes a post request to the API wrapping the DB', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'post');
    ListingController.createListing(req, res);
    expect(request.post).to.have.been.calledOnce;
  }));
  it('responds with an error if it is passed a 403 status code back from the API', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'post').yields(null, { statusCode: 403 });
    ListingController.createListing(req, res);
    expect(res.sendCalledWith).to.contain('Something went wrong');
  }));
  it('does not send an error if it is passed a 201 status code', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      },
      redirectCalledWith: '',
      redirect: function(arg) {
        this.redirectCalledWith = arg;
      }
    };
    this.stub(request, 'post').yields(null, { statusCode: 201 }, { owner: "stubbedOwnerID" });
    ListingController.createListing(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.redirectCalledWith).to.contain('users/stubbedOwnerID');
    expect(res.redirectCalledWith).to.not.contain('Something went wrong');
  }));
});

describe('retrieving all listings', () => {
  let req;
  beforeEach(() => {
    req = {};
  });

  it('makes a get request to the API wrapping the DB', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'get');
    ListingController.getAllListings(req, res);
    expect(request.get).to.have.been.calledOnce;
  }));
  it('responds with an error if it is passed a 403 status code back from the API', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'get').yields(null, { statusCode: 403 });
    ListingController.getAllListings(req, res);
    expect(res.sendCalledWith).to.contain('Something went wrong');
  }));
  it('does not send an error if it is passed a 201 status code', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      },
      renderCalledWith: '',
      render: function(arg) {
        this.renderCalledWith = arg;
      }
    };
    this.stub(request, 'get').yields(null, { statusCode: 201 }, { listings: { name: "Test Casa", description: "Nice test casa.", price: 100 } });
    ListingController.getAllListings(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.renderCalledWith).to.contain('listings/all');
    expect(res.renderCalledWith).to.not.contain('Something went wrong');
  }));
});
