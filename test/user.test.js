'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const sinonTest = require('sinon-test');
const User = require('../app_api/models/users');
const ValidObject = require('./helpers/modelHelpers');
const details = {
  username: "validate@user.com",
  password: "schema",
  firstname: "Valid",
  lastname: "User",
  phoneNumber: "+447777777777"
};
const validDetails = new ValidObject(details);

describe('A user', () => {
  describe('when no details are provided', () => {
    it('should be invalid', () => {
      let user = new User();
      user.validate((err) => {
        expect(err.errors.username).to.exist;
      });
    })
  });
  describe('Username is required', () => {
    describe('when not provided', () => {
      it('should be invalid', () => {
        let validUser = new ValidObject(details);
        let noUsername = validUser.removePath('username');
        let user = new User(noUsername);
        user.validate((err) => {
          expect(err.errors.username).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('should be valid', () => {
        let user = new User(validDetails);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.username).to.equal(validDetails.username);
        });
      });
    });
  });

  describe('First name is required', () => {
    describe('when not provided', () => {
      it('should be invalid', () => {
        let validUser = new ValidObject(details);
        let noFirstName = validUser.removePath('firstname');
        let user = new User(noFirstName);
        user.validate( (err) => {
          expect(err.errors.firstname).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('should be valid', () => {
        let user = new User(validDetails);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.firstname).to.equal(validDetails.firstname);
        });
      });
    });
  });

  describe('Last name is required', () => {
    describe('when not provided', () => {
      it('should be invalid', () => {
        let validUser = new ValidObject(details);
        let noLastName = validUser.removePath('lastname');
        let user = new User(noLastName);
        user.validate((err) => {
          expect(err.errors.lastname).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('should be valid', () => {
        let user = new User(validDetails);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.lastname).to.equal(validDetails.lastname);
        });
      });
    });
  });

  describe('Phone number is optional', () => {
    describe('when provided', () => {
      it('should be valid', () => {
        let user = new User(validDetails);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.phoneNumber).to.equal(validDetails.phoneNumber);
        });
      });
    });
    describe('when not provided', () => {
      it('should be valid', () => {
        let validUser = new ValidObject(details);
        let noPhone = validUser.removePath('phoneNumber');
        let user = new User(noPhone);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.phoneNumber).to.equal('');
        });
      });
    });
  });

  describe('Full Name', () => {
    it('should return the full name of a user', (function() {
      let user = new User(validDetails);
      let fullname = user.fullName;
      expect(fullname).to.equal(user.firstname + " " + user.lastname);
    }));
  });
});
