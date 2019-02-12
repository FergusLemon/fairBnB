'use strict';
import { Selector } from 'testcafe';
import { signUp } from '../../helpers/testCafeHelpers';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const User = require(path.join(HOMEDIR, 'app_api', 'models', 'user'));
const databaseHelper = require(path.join(HOMEDIR, 'app_api', 'models', 'db'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userOne = Factory.validUserOne();
const mongoose = require('mongoose');
const usernameField = Selector('#username');
const passwordField = Selector('#password');

fixture `User Login`
  .page `http://localhost:3000`
  .beforeEach(async t => {
    await signUp(userOne, t)
    await t
      .click('#sign-out');
    console.log("Test User added to database.");
  })
  .afterEach(async t => {
    databaseHelper.dropCollection('users');
  })
  .after(async t => {
    databaseHelper.closeConnection();
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

