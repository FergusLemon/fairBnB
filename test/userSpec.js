'use strict';

describe("User", function() {

  var User = require('../src/user');
  var expect = require('chai').expect;
  var sinon = require('sinon');

  var userDetails = {
    username: "test@gmail.com",
    firstname: "First",
    lastname: "Test"
  };
  var noUsername = {
    firstname: userDetails.firstname,
    lastname: userDetails.lastname
  };
  var noFirstName = {
    username: userDetails.username,
    lastname: userDetails.lastname
  };
  var noLastName = {
    username: userDetails.username,
    firstname: userDetails.firstname
  };
  var error = "A user must have a username, first name and a last name.";


  describe("required details passed in to create a user", function() {
    it("throws an error if no details are provided", function() {
      var badConstruction = function() { var user = new User(); };
      expect(badConstruction).to.throw(error);
    });
    it("throws an error if no username is provided", function() {
      var badConstruction = function() { var user = new User(noUsername); };
      expect(badConstruction).to.throw(error);
    });
    it("throws an error if no first name is provided", function() {
      var badConstruction = function() { var user = new User(noFirstName); };
      expect(badConstruction).to.throw(error);
    });
    it("throws an error if no last name is provided", function() {
      var badConstruction = function() { var user = new User(noLastName); };
      expect(badConstruction).to.throw(error);
    });
  });

  describe("getUsername", function() {
    it("returns a user's username", function() {
      var user = new User(userDetails);
      expect(user.getUsername()).to.equal(userDetails.username);
    });
  });

  describe("listings", function() {
    var user, property;
    beforeEach(function() {
      user = new User(userDetails);
      property = sinon.spy();
      user.addProperty(property);
    });

    it("can be added by a user", function() {
      expect(user.properties).to.include(property);
    });

    it("that a user owns can be seen collectively", function() {
      var properties = user.getProperties();
      expect(properties).to.include(property);
    });
  });
});
