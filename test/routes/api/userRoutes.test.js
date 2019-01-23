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
const UserController = require(path.join(HOMEDIR, 'app_api', 'controllers', 'user'));
const User = require(path.join(HOMEDIR, 'app_api', 'models', 'user'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
chai.use(sinonChai);

describe('when a user is saved in the database', () => {
  let userDetails, user;
  beforeEach(() => {
    userDetails = Factory.validUserOne();
    user = new User(userDetails);
  });

  it('should call save once', sandboxed(function() {
    let req = {
      body: userDetails
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith = arg;
      }
    };
    this.stub(User.prototype, 'save');
    UserController.createUser(req, res);
    expect(User.prototype.save.callCount).to.equal(1);
    expect(User.prototype.save.callCount).to.not.equal(2);
  }));
  it('should respond with a 201 status code', sandboxed(function() {
    let req = {
      body: userDetails
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      json: sinon.stub()
    };
    this.stub(User.prototype, 'save').yields(null, user);
    UserController.createUser(req, res);
    expect(res.statusCalledWith).to.contain(201);
  }));
});

describe('when a user is not saved in the database', () => {
  it('should respond with a 400 status code', sandboxed(function() {
    let req = {
      body: {}
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith += arg;
      },
      json: sinon.stub()
    };
    let err = this.stub();
    this.stub(User.prototype, 'save').yields(err);
    UserController.createUser(req, res);
    expect(res.statusCalledWith).to.contain(400);
  }));
});
