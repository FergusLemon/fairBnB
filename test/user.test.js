'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const sinonTest = require('sinon-test');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const User = require(path.join(HOMEDIR, 'app_api', 'models', 'user'));
const ValidObject = require(path.join(HOMEDIR, 'test', 'helpers', 'modelHelpers'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userFactoryDetails = Factory.validUserOne();

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
        let validUser = new ValidObject(userFactoryDetails);
        let noUsername = validUser.removePath('username');
        let user = new User(noUsername);
        user.validate((err) => {
          expect(err.errors.username).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('should be valid', () => {
        let user = new User(userFactoryDetails);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.username).to.equal(userFactoryDetails.username);
        });
      });
    });
  });

  describe('First name is required', () => {
    describe('when not provided', () => {
      it('should be invalid', () => {
        let validUser = new ValidObject(userFactoryDetails);
        let noFirstName = validUser.removePath('firstname');
        let user = new User(noFirstName);
        user.validate( (err) => {
          expect(err.errors.firstname).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('should be valid', () => {
        let user = new User(userFactoryDetails);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.firstname).to.equal(userFactoryDetails.firstname);
        });
      });
    });
  });

  describe('Last name is required', () => {
    describe('when not provided', () => {
      it('should be invalid', () => {
        let validUser = new ValidObject(userFactoryDetails);
        let noLastName = validUser.removePath('lastname');
        let user = new User(noLastName);
        user.validate((err) => {
          expect(err.errors.lastname).to.exist;
        });
      });
    });
    describe('when provided', () => {
      it('should be valid', () => {
        let user = new User(userFactoryDetails);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.lastname).to.equal(userFactoryDetails.lastname);
        });
      });
    });
  });

  describe('Phone number is optional', () => {
    describe('when provided', () => {
      it('should be valid', () => {
        let user = new User(userFactoryDetails);
        user.validate((err) => {
          expect(err).to.equal(null);
          expect(user.phoneNumber).to.equal(userFactoryDetails.phoneNumber);
        });
      });
    });
    describe('when not provided', () => {
      it('should be valid', () => {
        let validUser = new ValidObject(userFactoryDetails);
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
      let user = new User(userFactoryDetails);
      let fullname = user.fullName;
      expect(fullname).to.equal(user.firstname + " " + user.lastname);
    }));
  });
});
