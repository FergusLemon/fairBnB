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
chai.use(sinonChai);

describe('creating a user', () => {
  let userDetails, req;
  beforeEach(() => {
    userDetails = Factory.validUserOne();
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
    this.stub(request, 'post').yields(null, { statusCode: 403 });
    UserController.createUser(req, res);
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
    this.stub(request, 'post').yields(null, { statusCode: 201 }, { id: "stub" });
    UserController.createUser(req, res);
    expect(res.sendCalledWith).to.contain('');
    expect(res.redirectCalledWith).to.not.contain('Something went wrong');
  }));
});
