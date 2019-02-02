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
const ok = Factory.status('ok');
const error = Factory.status('err');
const errorMessage = Factory.message('err');
const listingDetails = Factory.validListing();
const stub = sinon.stub();
const id = 1;
chai.use(sinonChai);

describe('creating a listing', () => {
  let req;
  beforeEach(() => {
    req = {
      body: listingDetails,
      session: {
        passport: { user: id }
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
    this.stub(request, 'post').yields(null, { statusCode: error });
    ListingController.createListing(req, res);
    expect(res.sendCalledWith).to.contain(errorMessage);
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
    this.stub(request, 'post').yields(null, { statusCode: ok }, { owner: id });
    ListingController.createListing(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.redirectCalledWith).to.contain('users/' + id);
    expect(res.redirectCalledWith).to.not.contain(errorMessage);
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
    this.stub(request, 'get').yields(null, { statusCode: error });
    ListingController.getAllListings(req, res);
    expect(res.sendCalledWith).to.contain(errorMessage);
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
    let listings = {};
    this.stub(request, 'get').yields(null, { statusCode: ok }, JSON.stringify(listings));
    ListingController.getAllListings(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.sendCalledWith).to.not.contain(errorMessage);
    expect(res.renderCalledWith).to.contain('listings/all');
  }));
});

describe('retrieving an individual listing', () => {
  let req;
  beforeEach(() => {
    req = {
      params: {
        listing: id
      }
    };
  });

  it('makes a get request to the API wrapping the DB', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'get');
    ListingController.getListing(req, res);
    expect(request.get).to.have.been.calledOnce;
  }));
  it('responds with an error if it is passed a 403 status code back from the API', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'get').yields(null, { statusCode: error });
    ListingController.getListing(req, res);
    expect(res.sendCalledWith).to.contain(errorMessage);
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
    let listing = {};
    this.stub(request, 'get').yields(null, { statusCode: ok }, JSON.stringify(listing));
    ListingController.getListing(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.sendCalledWith).to.not.contain(errorMessage);
    expect(res.renderCalledWith).to.contain('listings/individual');
  }));
});
