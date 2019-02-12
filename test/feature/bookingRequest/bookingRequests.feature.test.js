'use strict';
import { Selector } from 'testcafe';
import { signIn } from '../../helpers/testCafeHelpers';
import { bookingRequestSetUp } from '../../helpers/testCafeHelpers';
import { makeBookingRequest } from '../../helpers/testCafeHelpers';
import { signInNavigateToBookingRequests } from '../../helpers/testCafeHelpers';
import { clickOutboundBookingRequests } from '../../helpers/testCafeHelpers';
import { clickInboundBookingRequests } from '../../helpers/testCafeHelpers';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const databaseHelper = require(path.join(HOMEDIR, 'app_api', 'models', 'db'));
const mongoose = require('mongoose');
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userOne = Factory.validUserOne();
const userTwo = Factory.validUserTwo();
const bookingRequest = Factory.validBookingRequest();

fixture `Booking Requests`
  .page `http://localhost:3000/listings/new`
  .beforeEach( async t => {
    await bookingRequestSetUp(userOne, userTwo, t)
    })
  .afterEach(async t => {
    databaseHelper.dropCollection('users');
    databaseHelper.dropCollection('listings');
  })
  .after(async t => {
    databaseHelper.closeConnection();
  });

  test('The user should be able to make a booking request', async t => {
    await makeBookingRequest(t)
    await t
      .expect(Selector('h1').exists).ok();
  })

  test('The user should be able to see booking requests they have made', async t => {
    await makeBookingRequest(t)
    await clickOutboundBookingRequests(t)
    await t
      .expect(Selector('#booking-request-0').exists).ok();
  })

  test('A property owner should see booking requests on their property', async t => {
    await makeBookingRequest(t)
    await t
      .click('#sign-out')
      .click('#sign-in')
    await signIn(userOne, t)
    await clickInboundBookingRequests(t)
    await t
      .expect(Selector('#booking-request-0').exists).ok();
  })

  test('A property owner can approve or decline a booking request', async t => {
    await makeBookingRequest(t)
    await t
      .click('#sign-out')
      .click('#sign-in')
    await signIn(userOne, t)
    await clickInboundBookingRequests(t)
    await t
      .expect(Selector('#approve-request-0').exists).ok()
      .expect(Selector('#decline-request-0').exists).ok();
  })
