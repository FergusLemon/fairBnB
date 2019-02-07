'use strict';
import { Selector } from 'testcafe';

fixture `Homepage Test`
  .page `http://localhost:3000`;

  test('Has a page title', async t => {
    await t
      .expect(Selector('title').innerText).eql("FairBnB");
  });

  test('Has a sign up link', async t => {
    await t
      .expect(Selector('#sign-up').innerText).eql("SIGN UP");
  });

  test('Sign up links takes a user to the new user registration page', async t => {
    await t
      .click('#sign-up')
      .expect(Selector('#username').innerText).eql("")
      .expect(Selector('#password').innerText).eql("")
      .expect(Selector('#firstname').innerText).eql("")
      .expect(Selector('#lastname').innerText).eql("");
  });
