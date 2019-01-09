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

  test("Has a 'add listing' option", async t => {
    await t
      .expect(Selector('#add-listing').innerText).eql("Add Listing");
  });

  test("Has a 'view listings' option", async t => {
    await t
      .expect(Selector('#view-listings').innerText).eql("View Listings");
  });
