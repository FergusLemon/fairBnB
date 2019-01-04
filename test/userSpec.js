'use strict';

describe("User", function() {

  var User = require("../src/user");
  var expect = require("chai").expect;
  var userDetails = {
    username: "test@gmail.com"
  };
  var badUserDetails = {
    randomInput: "not a username"
  };

  describe("required details passed in to create a user", function() {
    it("throws an error if no details are provided", function() {
      var badConstruction = function() { var user = new User() };
      expect(badConstruction).to.throw();
    });
    it("throws an error if no username is provided", function() {
      var badConstruction = function() { var user = new User(badUserDetails) };
      expect(badConstruction).to.throw();
    });
  });

  describe("getUsername", function() {
    it("returns a user's username", function() {
      var user = new User(userDetails);
      expect(user.getUsername()).to.equal(userDetails.username);
    });
  });
});
