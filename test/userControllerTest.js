'use strict';

const sinon = require('sinon');
const sinonTest = require('sinon-test');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const expect = chai.expect;
const UserController = require('../app_server/controllers/user');
const request = require('request');
const Factory = require('./helpers/factories');
chai.use(sinonChai);

describe('creating a user', () => {
  it('makes a post request to the API wrapping the DB', function() {
    let userDetails = Factory.validUserOne();
    let req = { body: userDetails };
    let res = () => {};
    sinon.stub(request, 'post');
    UserController.createUser(req, res);
    expect(request.post).to.have.been.calledOnce;
  });
});
