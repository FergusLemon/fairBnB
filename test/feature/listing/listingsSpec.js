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
      .expect(Selector('#1')).exists;
  });

  test('The listing is the one the user created', async t => {
    const name = Selector('#name');
    const description = Selector('#description');
    const price = Selector('#price');
    await t
      .expect(name.innerText).eql('Name: Casa Test')
      .expect(description.innerText).eql('Description: A nice test casa.')
      .expect(price.innerText).eql('Price Per Night: 100');
  });
