'use strict';
import { Selector } from 'testcafe';
import { signUp } from '../../helpers/testCafeHelpers';
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const databaseHelper = require(path.join(HOMEDIR, 'app_api', 'models', 'db'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userOne = Factory.validUserOne();

fixture `User Overview Page`
  .page `http://localhost:3000/users/new`
  .beforeEach(async t => {
    await signUp(userOne, t)
  })
  .afterEach(async t => {
    databaseHelper.dropCollection('users');
  })
  .after(async t => {
    databaseHelper.closeConnection();
  });

  test('Does not have a sign in or sign up link in the nav bar', async t => {
    await t
      .expect(Selector('#sign-in').exists).notOk()
      .expect(Selector('#sign-up').exists).notOk();
  });

  test("Has an overview of options available to the user", async t => {
    await t
      .expect(Selector('#add-listing').innerText).eql("Add A Property")
      .expect(Selector('#view-listings').innerText).eql("Your Properties")
      .expect(Selector('#inbound-booking-requests').innerText).eql("Booking Requests");
  });

  test("A user can see listings when they click on the 'view listings link'", async t => {
    await t
      .click('#view-listings-nav')
      .expect(Selector('#name-0').exists).ok()
  });
