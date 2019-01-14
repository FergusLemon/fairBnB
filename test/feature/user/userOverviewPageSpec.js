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

  test("Has an overview of options available to the user", async t => {
    await t
      .expect(Selector('#add-listing').innerText).eql("Add Listing")
      .expect(Selector('#view-listings').innerText).eql("View Listings")
      .expect(Selector('#booking-requests').innerText).eql("Booking Requests");
  });

  test("A user can see listings when they click on the 'view listings link'", async t => {
    await t
      .click('#view-listings')
      .expect(Selector('#name-1').exists).ok()
      .expect(Selector('#name-2').exists).ok();
  });

  test("A user can see his or her booking requests", async t => {
    await t
      .click('#booking-requests')
      .expect(Selector('#inbound-booking-requests').exists).ok()
      .expect(Selector('li').withAttribute('id', '0').innerText).contains("Request for: Test Casa");
  });
