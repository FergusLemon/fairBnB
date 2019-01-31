'use strict';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const sinon = require('sinon');
const sinonTest = require('sinon-test');
const sandboxed = sinonTest(sinon);
const sinonChai = require('sinon-chai');
const chai = require('chai');
const expect = chai.expect;
const request = require('request');
const BookingRequestController = require(path.join(HOMEDIR, 'app_server', 'controllers', 'bookingRequest'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const ok = Factory.status('ok');
const error = Factory.status('err');
const errorMessage = Factory.message('err');
const bookingRequestDetails = Factory.validBookingRequest();
const stub = sinon.stub();
const id = 1;
chai.use(sinonChai);


describe('creating a booking request', () => {
  let req;
  beforeEach(() => {
    req = {
      body: {
        owner: bookingRequestDetails.owner,
        dates: bookingRequestDetails.requestStartDate + ' - ' + bookingRequestDetails.requestEndDate
      },
      session: {
        passport: { user: id }
      },
      params: {
        listing: id
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
    BookingRequestController.createBookingRequest(req, res);
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
    BookingRequestController.createBookingRequest(req, res);
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
    this.stub(request, 'post').yields(null, { statusCode: ok }, { requestor: id });
    BookingRequestController.createBookingRequest(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.sendCalledWith).to.not.contain(errorMessage);
    expect(res.redirectCalledWith).to.contain('users/' + id);
  }));
});
