'use strict';
import { Selector } from 'testcafe';
import { Role } from 'testcafe';
import { createNewListing } from '../../helpers/testCafeHelpers';
import { signUp } from '../../helpers/testCafeHelpers';
import { signIn } from '../../helpers/testCafeHelpers';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const databaseHelper = require(path.join(HOMEDIR, 'test', 'helpers', 'dbSetupHelper'));
const { environment } = require(path.join(HOMEDIR, 'config'));
const mongoose = require('mongoose');
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userOne = Factory.validUserOne();
const userTwo = Factory.validUserTwo();
const bookingRequest = Factory.validBookingRequest();

if ( `${environment}` === "test" ) {
  databaseHelper.setUpTestDatabase();
}

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
      .click('#view-listings')
    })
  .afterEach(async t => {
    databaseHelper.dropCollection('users');
    databaseHelper.dropCollection('listings');
  })
  .after(async t => {
    databaseHelper.closeConnection();
  });

  test('A user can make a booking request for the listing', async t => {
    await t
      .click('#name-0')
      .expect(Selector('#booking-request').exists).ok();
  })

  test('The start and end date pickers should be empty by default', async t => {
    await t
      .click('#name-0')
      .expect(Selector('#booking-start-date').value).eql("")
      .expect(Selector('#booking-end-date').value).eql("");
  })

  test('The user should be able to choose a start and an end date', async t => {
    await t
      .click('#name-0')
      .typeText('#booking-start-date', bookingRequest.requestStartDate)
      .typeText('#booking-end-date', bookingRequest.requestEndDate)
      .expect(Selector('#booking-start-date').value).eql(bookingRequest.requestStartDate)
      .expect(Selector('#booking-end-date').value).eql(bookingRequest.requestEndDate);
  })

  test('The user is taken back to his or her profile page once a booking request is made', async t => {
    await t
      .click('#name-0')
      .typeText('#booking-start-date', bookingRequest.requestStartDate)
      .typeText('#booking-end-date', bookingRequest.requestEndDate)
      .click('#booking-request')
      .expect(Selector('#add-listing').exists).ok();
  })

  test('The booking request is sent to the property owner', async t => {
    await t
      .click('#name-0')
      .typeText('#booking-start-date', bookingRequest.requestStartDate)
      .typeText('#booking-end-date', bookingRequest.requestEndDate)
      .click('#booking-request')
      .expect(Selector('#add-listing').exists).ok()
      .navigateTo('http://localhost:3000')
      .click('#sign-in')
    await signIn(userOne, t);
    await t
      .click('#inbound-booking-requests')
      .expect(Selector('#booking-request-0').exists).ok();
  })
