'use strict';
import { Selector } from 'testcafe';
import { signUp } from '../../helpers/testCafeHelpers';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const User = require(path.join(HOMEDIR, 'app_api', 'models', 'user'));
const databaseHelper = require(path.join(HOMEDIR, 'test', 'helpers', 'dbSetupHelper'));
const { environment } = require(path.join(HOMEDIR, 'config'));
const validUsername = "test@testmail.com";
const validPassword = "P@$$w0rdH3aVy";
const mongoose = require('mongoose');
const username = Selector('#username');
const password = Selector('#password');

if ( `${environment}` === "test" ) {
  databaseHelper.setUpTestDatabase();
}

fixture `User Login`
  .page `http://localhost:3000`
  .beforeEach(async t => {
    await signUp(t)
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
      .expect(username.innerText).eql("")
      .expect(password.innerText).eql("");
  });

  test('A new user cannot log in without first signing up', async t => {
    await t
      .click('#sign-in')
      .typeText(username, 'newUser@newmail.com')
      .typeText(password, 'n3WP@ssword')
      .click('#sign-in')
      .expect(Selector('#search-placeholder').exists).notOk()
      .expect(Selector('#error-message').innerText).eql("Incorrect username.");
  });

  test('An existing user can sign in', async t => {
    await t
      .click('#sign-in')
      .typeText(username, validUsername)
      .typeText(password, validPassword)
      .click('#sign-in')
      .expect(Selector('#search-placeholder').exists).ok();
  });

  test('An existing user cannot sign in with the wrong password', async t => {
    await t
      .click('#sign-in')
      .typeText(username, validUsername)
      .typeText(password, "wrong password")
      .click('#sign-in')
      .expect(Selector('#search-placeholder').exists).notOk()
      .expect(Selector('#error-message').innerText).eql("Incorrect password.");
  });

  test('An existing user cannot sign in with the wrong username', async t => {
    await t
      .click('#sign-in')
      .typeText(username, "wrong@username.com")
      .typeText(password, validPassword)
      .click('#sign-in')
      .expect(Selector('#search-placeholder').exists).notOk()
      .expect(Selector('#error-message').innerText).eql("Incorrect username.");
  });

