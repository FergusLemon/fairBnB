'use strict';
import { Selector } from 'testcafe';
import { fillOutForm } from '../../helpers/testCafeHelpers';

const username = Selector('#username');
const password = Selector('#password');
const firstName = Selector('#firstname');
const lastName = Selector('#lastname');


fixture `New User Registration Test`
  .page `http://localhost:3000/user/new`;

  test('Has a page title', async t => {
    await t
      .expect(Selector('title').innerText).eql("FairBnB");
  });

  test('There is an empty new user registration form', async t => {
    await t
      .expect(username.innerText).eql("")
      .expect(password.innerText).eql("")
      .expect(firstName.innerText).eql("")
      .expect(lastName.innerText).eql("");
  });

  test('A new user can fill out his or her details', async t => {
    await fillOutForm(t)
    await t
      .expect(username.value).eql('test@testmail.com')
      .expect(password.value).eql('P@$$w0rdH3aVy')
      .expect(firstName.value).eql('Test')
      .expect(lastName.value).eql('User');
  });


  test('A new user recieves a welcome messasge when they register', async t => {
    await fillOutForm(t)
    await t
      .click('#register')
      .expect(Selector('#message').innerText).eql('Welcome test@testmail.com!');
  });
