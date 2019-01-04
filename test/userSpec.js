'use strict';

describe("User", function() {

  var User = require("../src/user");
  var expect = require("chai").expect;

  describe("name property", function() {
    it("returns a user's username", function() {
      var user = new User();
      expect(user.name).to.equal("Alice");
    });
  });
});
