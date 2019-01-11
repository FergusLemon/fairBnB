'use strict';
import { Selector } from 'testcafe';
import { signUp } from '../../helpers/testCafeHelpers';

fixture `User Overview Page`
  .page `http://localhost:3000/users/new`
  .beforeEach( async t => {
    await signUp(t)
    });

  test('Has the welcome message for new users', async t => {
    await t
      .expect(Selector('#message').innerText).eql("Let's get started!");
  });

  test('Does not have a sign in or sign up link in the nav bar', async t => {
    await t
      .expect(Selector('#sign-in').exists).notOk()
      .expect(Selector('#sign-up').exists).notOk();
  });

  test("Has a 'add listing' option", async t => {
    await t
      .expect(Selector('#add-listing').innerText).eql("Add Listing");
  });

  test("Has a 'view listings' option", async t => {
    await t
      .expect(Selector('#view-listings').innerText).eql("View Listings");
  });

  test("A user can see listings when they click on the 'view listings link'", async t => {
    await t
      .click('#view-listings')
      .expect(Selector('#name-1').exists).ok()
      .expect(Selector('#name-2').exists).ok();
  });
