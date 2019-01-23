'use strict';
import { Selector } from 'testcafe';
import { fillOutNewListingForm } from '../../helpers/testCafeHelpers';

fixture `New Listing Page`
  .page `http://localhost:3000/listings/new`;

  const name = Selector('#name');
  const description = Selector('#description');
  const price = Selector('#price');

  test('There is an empty new listing form', async t => {
    await t
      .expect(name.innerText).eql("")
      .expect(description.innerText).eql("")
      .expect(name.innerText).eql("");
  });

  test('A user can fill out the details of their property', async t => {
    await fillOutNewListingForm(t)
    await t
      .expect(name.value).eql('Casa Test')
      .expect(description.value).eql('A nice test casa.')
      .expect(price.value).eql('100');
  });
