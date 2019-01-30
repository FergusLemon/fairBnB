'use strict';
import { Selector } from 'testcafe';
import { signUp } from '../../helpers/testCafeHelpers';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const User = require(path.join(HOMEDIR, 'app_api', 'models', 'user'));
const databaseHelper = require(path.join(HOMEDIR, 'test', 'helpers', 'dbSetupHelper'));
const { environment } = require(path.join(HOMEDIR, 'config'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userOne = Factory.validUserOne();
const mongoose = require('mongoose');
const usernameField = Selector('#username');
const passwordField = Selector('#password');

if ( `${environment}` === "test" ) {
  databaseHelper.setUpTestDatabase();
}

fixture `User Login`
  .page `http://localhost:3000`
  .beforeEach(async t => {
    await signUp(userOne, t)
    await t.navigateTo('http://localhost:3000')
    console.log("Test User added to database.");
  })
  .afterEach(async t => {
    databaseHelper.dropCollection('users');
  })
  .after(async t => {
    databaseHelper.closeConnection();
  });

  test('There is a sign in link for the user', async t => {
    await t
      .expect(Selector('#sign-in').exists).ok();
  });

  test('There are empty username and password fields to fill in', async t => {
    await t
      .click('#sign-in')
      .expect(usernameField.innerText).eql("")
      .expect(passwordField.innerText).eql("");
  });

  test('A new user cannot log in without first signing up', async t => {
    await t
      .click('#sign-in')
      .typeText(usernameField, 'newUser@newmail.com')
      .typeText(passwordField, 'n3WP@ssword')
      .click('#sign-in')
      .expect(Selector('#add-listing').exists).notOk()
      .expect(Selector('#error-message').innerText).eql("Incorrect username.");
  });

  test('An existing user can sign in', async t => {
    await t
      .click('#sign-in')
      .typeText(usernameField, userOne.username)
      .typeText(passwordField, userOne.password)
      .click('#sign-in')
      .expect(Selector('#add-listing').exists).ok();
  });

  test('An existing user cannot sign in with the wrong password', async t => {
    await t
      .click('#sign-in')
      .typeText(usernameField, userOne.username)
      .typeText(passwordField, "wrong password")
      .click('#sign-in')
      .expect(Selector('#add-listing').exists).notOk()
      .expect(Selector('#error-message').innerText).eql("Incorrect password.");
  });

  test('An existing user cannot sign in with the wrong username', async t => {
    await t
      .click('#sign-in')
      .typeText(usernameField, "wrong@username.com")
      .typeText(passwordField, userOne.password)
      .click('#sign-in')
      .expect(Selector('#add-listing').exists).notOk()
      .expect(Selector('#error-message').innerText).eql("Incorrect username.");
  });

