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
const startDateField = Selector('#booking-start-date');
const endDateField = Selector('#booking-end-date');

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

  test('The user should be able to choose a start and an end date', async t => {
    await t
      .click('#name-0')
      .typeText(startDateField, bookingRequest.requestStartDate)
      .typeText(endDateField, bookingRequest.requestEndDate);
      let start = startDateField.value;
      let end = endDateField.value;
    await t
      .expect(start).eql(bookingRequest.requestStartDate)
      .expect(end).eql(bookingRequest.requestEndDate);
  })

  test('The user is taken back to his or her profile page once a booking request is made', async t => {
    await t
      .click('#name-0')
      .typeText(startDateField, bookingRequest.requestStartDate)
      .typeText(endDateField, bookingRequest.requestEndDate)
      .click('#booking-request')
      .expect(Selector('#add-listing').exists).ok();
  })

  test('The booking request is sent to the property owner', async t => {
    await t
      .click('#name-0')
      .typeText(startDateField, bookingRequest.requestStartDate)
      .typeText(endDateField, bookingRequest.requestEndDate)
      .click('#booking-request')
      .expect(Selector('#add-listing').exists).ok()
      .navigateTo('http://localhost:3000')
      .click('#sign-in')
    await signIn(userOne, t);
    await t
      .click('#inbound-booking-requests')
      .expect(Selector('#booking-request-0').exists).ok();
  })
