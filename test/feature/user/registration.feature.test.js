'use strict';
import { Selector } from 'testcafe';
import { fillOutNewUserForm } from '../../helpers/testCafeHelpers';
import { createNewListing } from '../../helpers/testCafeHelpers';

const usernameField = Selector('#username');
const passwordField = Selector('#password');
const firstNameField = Selector('#firstname');
const lastNameField = Selector('#lastname');
const phoneNumberField = Selector('#phoneNumber');
const username = 'test@testmail.com';
const password = 'P@$$w0rdH3aVy';
const firstName = 'Test';
const lastName = 'User';
const phoneNumber = '07777 777 7777';
const message = "Let's get started!";

fixture `New User Registration Test`
  .page `http://localhost:3000/users/new`;

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
    await fillOutNewUserForm(t)
    await t
      .expect(usernameField.value).eql(username)
      .expect(passwordField.value).eql(password)
      .expect(firstNameField.value).eql(firstName)
      .expect(lastNameField.value).eql(lastName)
      .expect(phoneNumberField.value).eql(phoneNumber);
  });


  test('A new user can add a listing', async t => {
    await fillOutNewUserForm(t)
    await t
      .click('#register')
      .expect(Selector('#add-listing').exists).ok()
      .click('#add-listing')
    await createNewListing(t)
    await t
      .expect(Selector('#view-listings').exists).ok();
  });
