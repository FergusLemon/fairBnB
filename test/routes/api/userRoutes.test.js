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
const ok = Factory.status('ok');
const error = Factory.status('api err');
const stub = sinon.stub();
chai.use(sinonChai);
let err = stub;
let req = {
  body: {}
};
let res = {
  statusCalledWith: '',
  status: function(arg) {
    this.statusCalledWith += arg;
  },
  json: stub
};

describe('saving a user', () => {
  it('should call save once', sandboxed(function() {
    this.stub(User.prototype, 'save');
    UserController.createUser(req, res);
    expect(User.prototype.save.callCount).to.equal(1);
    expect(User.prototype.save.callCount).to.not.equal(2);
  }));
  describe('when successful', () => {
    it('should respond with a 201 status code', sandboxed(function() {
      this.stub(User.prototype, 'save').yields(null, stub);
      UserController.createUser(req, res);
      expect(res.statusCalledWith).to.contain(ok);
    }));
  });
  describe('when unsuccessful', () => {
    it('should respond with a 400 status code', sandboxed(function() {
      this.stub(User.prototype, 'save').yields(err);
      UserController.createUser(req, res);
      expect(res.statusCalledWith).to.contain(error);
    }));
  });
});
