'use strict';
import { Selector } from 'testcafe';
import { createNewListing } from '../../helpers/testCafeHelpers';

fixture `Listings Page`
  .page `http://localhost:3000/listings/new`
  .beforeEach( async t => {
    await createNewListing(t)
    });

  test('There is a listing on the page', async t => {
    await t
      .expect(Selector('#name-0').exists).ok();
  });

  test('The listing is the one the user created', async t => {
    const name = Selector('#name-0');
    const description = Selector('#description-0');
    const price = Selector('#price-0');
    await t
      .expect(name.innerText).eql('Name: Casa Test')
      .expect(description.innerText).eql('Description: A nice test casa.')
      .expect(price.innerText).eql('Price Per Night: 100');
  });

  test('When there other listings, the user can see those also', async t => {
    await t
      .expect(Selector('#name-1').exists).ok()
      .expect(Selector('#name-2').exists).ok();
  })

  test('A user can click on a listed property to see more information', async t => {
    await t
      .click('#name-1')
      .expect(Selector('#booking-request').exists).ok();
  })

  test('The start and end date pickers should be empty by default', async t => {
    await t
      .click('#name-1')
      .expect(Selector('#booking-start-date').value).eql("")
      .expect(Selector('#booking-end-date').value).eql("");
  })

  test('The user should be able to choose a start and an end date', async t => {
    await t
    .click('#name-1')
      .typeText('#booking-start-date', "2019-12-25")
      .typeText('#booking-end-date', "2019-12-31")
      .expect(Selector('#booking-start-date').value).eql("2019-12-25")
      .expect(Selector('#booking-end-date').value).eql("2019-12-31");
  })

  test('The user is taken back to his or her profile page once a booking request is made', async t => {
    await t
    .click('#name-1')
      .typeText('#booking-start-date', "2019-12-25")
      .typeText('#booking-end-date', "2019-12-31")
      .click('#booking-request')
      .expect(Selector('#add-listing').exists).ok();
  })

  test("When signed in a user should not see 'sign in' or 'sign up' links in the nav bar", async t => {
    await t
      .expect(Selector('#sign-in').exists).notOk()
      .expect(Selector('#sign-out').exists).notOk();
  })
