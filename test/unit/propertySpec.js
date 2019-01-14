'use strict';

describe("Property", function() {

  var Property = require("../../src/property");
  var expect = require("chai").expect;

  var propertyDetails = {
    name: "Casa Test",
    description: "A delightful small test property.",
    price: "100"
  };
  var noName = {
    description: propertyDetails.description,
    price: propertyDetails.price
  };
  var noDescription = {
    name: propertyDetails.name,
    price: propertyDetails.price
  };
  var noPrice = {
    name: propertyDetails.name,
    description: propertyDetails.description
  };
  var error = "A property must have a name, description and a price per night.";

  describe("required details passed in to create a property", function() {
    it("throws an error if no details are provided", function() {
      var badConstruction = function() { var property = new Property(); };
      expect(badConstruction).to.throw(error);
    });
    it("throws an error if no name is provided", function() {
      var badConstruction = function() { var property = new Property(noName); };
      expect(badConstruction).to.throw(error);
    });
    it("throws an error if no description is provided", function() {
      var badConstruction = function() { var property = new Property(noDescription); };
      expect(badConstruction).to.throw(error);
    });
    it("throws an error if no price is provided", function() {
      var badConstruction = function() { var property = new Property(noPrice); };
      expect(badConstruction).to.throw(error);
    });
  });
});
