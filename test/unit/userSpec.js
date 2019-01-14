//  var sinon = require('sinon');
//  var error = "A user must have a username, first name and a last name.";
//
//  describe("getUsername", function() {
//    it("returns a user's username", function() {
//      var user = new User(userDetails);
//      expect(user.getUsername()).to.equal(userDetails.username);
//    });
//  });
//
//  describe("listings", function() {
//    var user, property;
//    beforeEach(function() {
//      user = new User(userDetails);
//      property = sinon.spy();
//      user.addProperty(property);
//    });
//
//    it("can be added by a user", function() {
//      expect(user.properties).to.include(property);
//    });
//
//    it("that a user owns can be seen collectively", function() {
//      var properties = user.getProperties();
//      expect(properties).to.include(property);
//    });
//  });
