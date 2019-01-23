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
chai.use(sinonChai);

describe('creating a listing', () => {
  it('makes a post request to the API wrapping the DB', sandboxed(function() {
    let listingDetails = Factory.validListing();
    let req = { body: listingDetails };
    let res = {
      sendCalledWith: '',
      send: function(arg) {
        this.sendCalledWith = arg;
      }
    };
    this.stub(request, 'post');
    ListingController.addListing(req, res);
    expect(request.post).to.have.been.calledOnce;
  }));
});
