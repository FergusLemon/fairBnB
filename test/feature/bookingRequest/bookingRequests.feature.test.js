'use strict';
import { Selector } from 'testcafe';
import { Role } from 'testcafe';
import { createNewListing } from '../../helpers/testCafeHelpers';
import { signUp } from '../../helpers/testCafeHelpers';
import { signIn } from '../../helpers/testCafeHelpers';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const databaseHelper = require(path.join(HOMEDIR, 'app_api', 'models', 'db'));
const mongoose = require('mongoose');
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userOne = Factory.validUserOne();
const userTwo = Factory.validUserTwo();
const bookingRequest = Factory.validBookingRequest();
const dateField = Selector('#date-range');

fixture `Booking Requests`
  .page `http://localhost:3000/listings/new`
  .beforeEach( async t => {
    await signUp(userOne, t)
    await t
      .click('#add-listing')
    await createNewListing(t)
    await t
      .navigateTo('http://localhost:3000')
    await signUp(userTwo, t)
    await t
      .click('#view-listings-nav')
    })
  .afterEach(async t => {
    databaseHelper.dropCollection('users');
    databaseHelper.dropCollection('listings');
  })
  .after(async t => {
    databaseHelper.closeConnection();
  });

  test('The user should be able to make a booking request', async t => {
    await t
      .click('#name-0')
      .selectText(dateField)
      .typeText(dateField, '2019-02-01 - 2019-02-08')
      .click('#name')
      .expect(dateField.value).eql('2019-02-01 - 2019-02-08')
      .click('#booking-request')
      .expect(Selector('h1').exists).ok();
  })

  test('A property should see booking requests on their property', async t => {
    await t
      .click('#name-0')
      .selectText(dateField)
      .typeText(dateField, '2019-02-01 - 2019-02-08')
      .click('#name')
      .expect(dateField.value).eql('2019-02-01 - 2019-02-08')
      .click('#booking-request')
      .expect(Selector('h1').exists).ok()
    await t
      .navigateTo('http://localhost:3000')
      .click('#sign-in')
    await signIn(userOne, t)
    await t
      .click('#inbound-booking-requests')
      .expect(Selector('#booking-request-0').exists).ok();
  })
