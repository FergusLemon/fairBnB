'use strict';
import { Selector } from 'testcafe';
import { fillOutNewUserForm } from '../../helpers/testCafeHelpers';
import { createNewListing } from '../../helpers/testCafeHelpers';

const usernameField = Selector('#username');
const passwordField = Selector('#password');
const firstNameField = Selector('#firstname');
const lastNameField = Selector('#lastname');
const phoneNumberField = Selector('#phoneNumber');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userOne = Factory.validUserOne();
const databaseHelper = require(path.join(HOMEDIR, 'app_api', 'models', 'db'));
const message = "Let's get started!";

fixture `New User Registration Test`
  .page `http://localhost:3000/users/new`
  .afterEach(async t => {
    databaseHelper.dropCollection('users');
  })
  .after(async t => {
    databaseHelper.closeConnection();
  });

  test('Has a page title', async t => {
    await t
      .expect(Selector('title').innerText).eql("FairBnB");
  });

  test('There is an empty new user registration form', async t => {
    await t
      .expect(usernameField.innerText).eql("")
      .expect(passwordField.innerText).eql("")
      .expect(firstNameField.innerText).eql("")
      .expect(lastNameField.innerText).eql("")
      .expect(phoneNumberField.innerText).eql("");
  });

  test('A new user can fill out his or her details', async t => {
    await fillOutNewUserForm(userOne, t)
    await t
      .expect(usernameField.value).eql(userOne.username)
      .expect(passwordField.value).eql(userOne.password)
      .expect(firstNameField.value).eql(userOne.firstname)
      .expect(lastNameField.value).eql(userOne.lastname)
      .expect(phoneNumberField.value).eql(userOne.phoneNumber);
  });


  test('A new user can add a listing', async t => {
    await fillOutNewUserForm(userOne, t)
    await t
      .click('#register')
      .expect(Selector('#add-listing').exists).ok()
      .click('#add-listing')
    await createNewListing(t)
    await t
      .expect(Selector('#view-listings').exists).ok();
  });
