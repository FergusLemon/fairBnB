'use strict';

const mongoose = require('mongoose');
const sinon = require('sinon');
const sinonTest = require('sinon-test');
const sinonChai = require('sinon-chai');
const sinonMongoose = require('sinon-mongoose');
const sandboxed = sinonTest(sinon);
const chai = require('chai');
const expect = chai.expect;
const UserController = require('../../../app_api/controllers/users');
const User = require('../../../app_api/models/users');
const Factory = require('../../helpers/factories');
chai.use(sinonChai);

describe('when a user is saved in the database', () => {
  it('should call save once', sandboxed(function() {
    let userDetails = Factory.validUserOne();
    let req = {
      body: userDetails
    };
    let res = {
      statusCalledWith: '',
      status: function(arg) {
        this.statusCalledWith = arg;
      }
    };
    let user = new User(req.body);
    this.stub(User.prototype, 'save');
    UserController.createUser(req, res);
    expect(User.prototype.save.callCount).to.equal(1);
    expect(User.prototype.save.callCount).to.not.equal(2);
    }));
  it('should respond with a 201 status code', sandboxed(async function() {
    let userDetails = Factory.validUserOne();
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
    let user = new User(req.body);
    this.stub(User.prototype, 'save').yields(null, user);
    await UserController.createUser(req, res);
    expect(res.statusCalledWith).to.contain(201);
    }));
});
