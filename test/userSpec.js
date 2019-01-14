'use strict';
const expect = require('chai').expect;
const User = require('../app_server/models/users');

let userDetails = {
  username: "test@gmail.com",
  password: "p@$$W0rd",
  firstname: "First",
  lastname: "Test",
  phoneNumber: "+447778988989"
};

let noUsername = {
  password: "p@$$W0rd",
  firstname: userDetails.firstname,
  lastname: userDetails.lastname
};

let noFirstName = {
  username: userDetails.username,
  password: "p@$$W0rd",
  lastname: userDetails.lastname
};

let noLastName = {
  username: userDetails.username,
  password: "p@$$W0rd",
  firstname: userDetails.firstname
};

let userDetailsNoPhone = {
  username: "test@gmail.com",
  password: "p@$$W0rd",
  firstname: "First",
  lastname: "Test"
};

describe('username', function() {
  describe('when no details are provided', function() {
    it('should be invalid', function() {
      let user = new User();
      user.validate(function(err) {
        expect(err.errors.username).to.exist;
      });
    })
  });
  describe('when no username is provided', function() {
    it('should be invalid', function() {
      let user = new User(noUsername);
      user.validate(function(err) {
        expect(err.errors.username).to.exist;
      });
    });
  });
  describe('when a username is provided that does not already exist', function() {
    it('should be valid', function() {
      let user = new User(userDetails);
      user.validate(function(err) {
        expect(err).to.equal(null);
        expect(user.username).to.equal(userDetails.username);
      });
    });
  });
//  describe('when a username is provided that already exists', function() {
//    it('should be invalid', function() {
//      let user = new User(userDetails);
//      let userCopy = new User(userDetails);
//      userCopy.validate(function(err) {
//        console.log(user);
//        console.log(userCopy);
//        expect(err.errors.username).to.exist;
//      });
//    });
//  });
});

describe('firstname', function() {
  it('should be invalid if no firstname is provided', function() {
    let user = new User(noFirstName);
    user.validate(function(err) {
      expect(err.errors.firstname).to.exist;
    });
  });
  it('should be valid when a firstname is provided', function() {
    let user = new User(userDetails);
    user.validate(function(err) {
      expect(err).to.equal(null);
      expect(user.firstname).to.equal(userDetails.firstname);
    });
  });
});

describe('lastname', function() {
  it('should be invalid if no lastname is provided', function() {
    let user = new User(noLastName);
    user.validate(function(err) {
      expect(err.errors.lastname).to.exist;
    });
  });
  it('should be valid when a lastname is provided', function() {
    let user = new User(userDetails);
    user.validate(function(err) {
      expect(err).to.equal(null);
      expect(user.lastname).to.equal(userDetails.lastname);
    });
  });
});

describe('phoneNumber', function() {
  it('is optional, there should be no error if one is provided', function() {
    let user = new User(userDetails);
    user.validate(function(err) {
      expect(err).to.equal(null);
      expect(user.phoneNumber).to.equal(userDetails.phoneNumber);
    });
  });
  it('is optional, there should be no error if one is not provided', function() {
    let user = new User(userDetailsNoPhone);
    user.validate(function(err) {
      expect(err).to.equal(null);
      expect(user.phoneNumber).to.equal(undefined);
    });
  });
});
