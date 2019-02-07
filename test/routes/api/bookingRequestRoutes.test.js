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
const ok = Factory.status('ok');
const error = Factory.status('api err');
const stub = sinon.stub();
const id = 1;
const date = '01 Mar 2019';
chai.use(sinonChai);
let req = {
  body: {
    id: id
  },
  params: {
    listingId: id
  },
  query: {
    start: date,
    end: date,
    direction: stub
  }
};
let res = {
  statusCalledWith: '',
  status: function(arg) {
    this.statusCalledWith += arg;
  },
  send: stub
};
let err = stub;

describe('when a booking request is saved in the database', () => {
  it('should call save once', sandboxed(function() {
    this.stub(BookingRequest.prototype, 'save');
    BookingRequestController.createBookingRequest(req, res);
    expect(BookingRequest.prototype.save.callCount).to.equal(1);
    expect(BookingRequest.prototype.save.callCount).to.not.equal(2);
  }));
  it('should respond with a 201 status code', sandboxed(function() {
    this.stub(BookingRequest.prototype, 'save').yields(null, stub);
    BookingRequestController.createBookingRequest(req, res);
    expect(res.statusCalledWith).to.contain(ok);
  }));
});

describe('when a booking request is not saved in the database', () => {
  it('should respond with a 400 status code', sandboxed(function() {
    this.stub(BookingRequest.prototype, 'save').yields(err);
    BookingRequestController.createBookingRequest(req, res);
    expect(res.statusCalledWith).to.contain(error);
  }));
});

describe('retrieving booking requests', () => {
  describe('when inbound booking requests are successfully retrieved', () => {
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(BookingRequest, 'find').yields(null, stub);
      BookingRequestController.getAllBookingRequests(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });
  describe('when inbound booking requests are not retrieved successfully', () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(BookingRequest, 'find').yields(err);
      BookingRequestController.getAllBookingRequests(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});

describe('updating a booking request', () => {
  describe('when a booking request is successfully updated', () => {
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(BookingRequest, 'findByIdAndUpdate').yields(null, {});
      BookingRequestController.updateBookingRequest(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });
  describe('when a booking request is not updated successfully', () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(BookingRequest, 'findByIdAndUpdate').yields(err);
      BookingRequestController.updateBookingRequest(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});

describe('retrieving matching booking requests', () => {
  describe('when booking requests are successfully retrieved', () => {
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(BookingRequest, 'find').yields(null, {});
      BookingRequestController.getAllMatchingRequests(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });
  describe('when booking requests are not retrieved successfully', () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(BookingRequest, 'find').yields(err);
      BookingRequestController.getAllMatchingRequests(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});
