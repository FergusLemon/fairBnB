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
const UserController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'user'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const dateHelper = require(path.join(HOMEDIR, 'test', 'helpers', 'dateHelpers'));
const ok = Factory.status('ok');
const error = Factory.status('err');
const errorMessage = Factory.message('err');
const userDetails = Factory.validUserOne();
const stub = sinon.stub();
chai.use(sinonChai);

describe('creating a user', () => {
  let req;
  beforeEach(() => {
    req = { body: userDetails };
  });

  it('makes a post request to the API wrapping the DB', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'post');
    UserController.createUser(req, res);
    expect(request.post).to.have.been.calledOnce;
  }));
  it('responds with an error if it is passed a 403 status code', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'post').yields(null, { statusCode: error });
    UserController.createUser(req, res);
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
    this.stub(request, 'post').yields(null, { statusCode: ok }, { id: "stub" });
    UserController.createUser(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.redirectCalledWith).to.not.contain(errorMessage);
  }));
});

describe("getting all of a user's listngs", () => {
  let req;
  beforeEach(() => {
    req = {
      session: {
        passport: {
          user: sinon.stub()
        }
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
    UserController.getUserListings(req, res);
    expect(request.get).to.have.been.calledOnce;
  }));
  it('responds with an error if it is passed a 403 status code', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'get').yields(null, { statusCode: error });
    UserController.getUserListings(req, res);
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
    UserController.getUserListings(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.sendCalledWith).to.not.contain(errorMessage);
  }));
});

describe('getting all inbound booking requests', () => {
  let req;
  beforeEach(() => {
  req = {
    session: {
      passport: {
        user: stub
      }
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
    UserController.getAllInboundBookingRequests(req, res);
    expect(request.get).to.have.been.calledOnce;
  }));
  it('responds with an error if it is passed a 403 status code', sandboxed(function() {
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'get').yields(null, { statusCode: error });
    UserController.getAllInboundBookingRequests(req, res);
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
    let bookingRequest = {};
    this.stub(dateHelper);
    this.stub(request, 'get').yields(null, { statusCode: ok }, JSON.stringify(bookingRequest));
    UserController.getAllInboundBookingRequests(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.sendCalledWith).to.not.contain(errorMessage);
  }));
});
