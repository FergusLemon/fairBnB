'use strict';
import { Selector } from 'testcafe';

const username = Selector('#username');
const password = Selector('#password');

fixture `User Login`
  .page `http://localhost:3000`;

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

  test('A user is taken to the homepage once signed in', async t => {
    await t
      .click('#sign-in')
      .typeText(username, 'test@testmail.com')
      .typeText(password, 'P@$$w0rdH3aVy')
      .click('#sign-in')
      .expect(Selector('#search-placeholder').exists).ok();
  });
