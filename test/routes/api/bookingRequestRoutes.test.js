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
const BookingRequestController = require(path.join(HOMEDIR, 'app_api', 'controllers', 'bookingRequest'));
const BookingRequest = require(path.join(HOMEDIR, 'app_api', 'models', 'bookingRequest'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
chai.use(sinonChai);

describe('when a booking request is saved in the database', () => {
  let bookingRequestDetails, bookingRequest;
  beforeEach(() => {
    bookingRequestDetails = Factory.validBookingRequest();
    bookingRequest = new BookingRequest(bookingRequestDetails);
  });

  it('should call save once', sandboxed(function() {
    let req = {
      body: bookingRequestDetails
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith = arg;
      }
    };
    this.stub(BookingRequest.prototype, 'save');
    BookingRequestController.createBookingRequest(req, res);
    expect(BookingRequest.prototype.save.callCount).to.equal(1);
    expect(BookingRequest.prototype.save.callCount).to.not.equal(2);
  }));
  it('should respond with a 201 status code', sandboxed(function() {
    let req = {
      body: bookingRequestDetails
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      send: sinon.stub()
    };
    this.stub(BookingRequest.prototype, 'save').yields(null, bookingRequest);
    BookingRequestController.createBookingRequest(req, res);
    expect(res.statusCalledWith).to.contain(201);
  }));
});

describe('when a booking request is not saved in the database', () => {
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
    this.stub(BookingRequest.prototype, 'save').yields(err);
    BookingRequestController.createBookingRequest(req, res);
    expect(res.statusCalledWith).to.contain(400);
  }));
});