'use strict';
const sinon = require('sinon');
const sinonTest = require('sinon-test');
const sandboxed = sinonTest(sinon);
const sinonChai = require('sinon-chai');
const chai = require('chai');
const expect = chai.expect;
chai.use(sinonChai);
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');
const bookingRequestUpdater = require(path.join(HOMEDIR, 'public', 'javascripts', 'updateRequests'));
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
const $ = global.jQuery = require('jquery')(window);

describe('Updating Booking Request Data', () => {
  beforeEach(sandboxed(function() {
        this.xhr = sinon.useFakeXMLHttpRequest();

        this.requests = [];
        this.xhr.onCreate = function(xhr) {
          console.log("Is an xhr request being made?");
            this.requests.push(xhr);
        }.bind(this);
  }));

  it('should make a post request with JSON data', sandboxed(function() {
    let update = {
      status: 'Approved'
    };
    let updateJSON = JSON.stringify(update);
    this.spy($, 'post');
    bookingRequestUpdater.post(update);
    console.log(this.requests);

    expect($.post).to.have.been.calledOnce;
  }));
});
