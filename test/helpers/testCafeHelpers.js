'use strict';
import { Selector } from 'testcafe';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..');

const usernameField = Selector('#username');
const passwordField = Selector('#password');
const firstNameField = Selector('#firstname');
const lastNameField = Selector('#lastname');
const phoneNumberField = Selector('#phoneNumber');
const nameField = Selector('#name');
const descriptionField = Selector('#description');
const priceField = Selector('#price');
const dateField = Selector('#date-range');
const dateRange = '2019-02-01 - 2019-02-08';

export async function fillOutNewUserForm(user, t) {
  await t
    .typeText(usernameField, user.username)
    .typeText(passwordField, user.password)
    .typeText(firstNameField, user.firstname)
    .typeText(lastNameField, user.lastname)
    .typeText(phoneNumberField, user.phoneNumber);
}

export async function fillOutLoginForm(user, t) {
  await t
    .typeText(usernameField, user.username)
    .typeText(passwordField, user.password);
}

export async function signUp(user, t) {
  await t
    .navigateTo('http://localhost:3000/users/new');
  await fillOutNewUserForm(user, t)
  await t
    .click('#register');
}

export async function signIn(user, t) {
  await fillOutLoginForm(user, t)
  await t
    .click('#sign-in');
}

export async function fillOutNewListingForm(t) {
  await t
    .typeText(nameField, 'Casa Test')
    .typeText(descriptionField, 'A nice test casa.')
    .typeText(priceField, String(100));
}

export async function createNewListing(t) {
  await fillOutNewListingForm(t)
  await t
    .click('#create-listing');
}

export async function bookingRequestSetUp(owner, requestor, t) {
  await signUp(owner, t)
  await t
    .click('#add-listing')
  await createNewListing(t)
  await t
    .navigateTo('http://localhost:3000')
  await signUp(requestor, t)
  await t
    .click('#view-listings-nav');
}

export async function makeBookingRequest(t) {
  await t
    .click('#name-0')
    .selectText(dateField)
    .typeText(dateField, dateRange)
    .click('#name')
    .expect(dateField.value).eql(dateRange)
    .click('#booking-request');
}

export async function signInNavigateToBookingRequests(user, t) {
  await t
    .navigateTo('http://localhost:3000')
    .click('#sign-in')
  await signIn(user, t)
  await t
  .click('#inbound-booking-requests');
}
