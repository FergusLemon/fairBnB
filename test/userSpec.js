'use strict';

describe("User", function() {

  var User = require("../src/user");
  var expect = require("chai").expect;
  var userDetails = {
    username: "test@gmail.com",
    firstname: "First",
    lastname: "Test"
  };
  var noUsername = {
    firstname: "First",
    lastname: "Test"
  };
  var noFirstName = {
    username: "test@gmail.com",
    lastname: "Test"
  };
  var noLastName = {
    username: "test@gmail.com",
    firstname: "First"
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
});
