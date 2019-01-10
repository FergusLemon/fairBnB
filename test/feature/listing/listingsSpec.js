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

  test("When there other listings, the user can see those also", async t => {
    await t
      .expect(Selector('#name-1').exists).ok()
      .expect(Selector('#name-2').exists).ok();
  })
