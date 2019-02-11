'use strict';
import { Selector } from 'testcafe';
import { clickAddListing } from '../../helpers/testCafeHelpers';
import { createNewListing } from '../../helpers/testCafeHelpers';
import { signUp } from '../../helpers/testCafeHelpers';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..', '..', '..');
const databaseHelper = require(path.join(HOMEDIR, 'app_api', 'models', 'db'));
const mongoose = require('mongoose');
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const userOne = Factory.validUserOne();
const name = "Casa Test";
const description = "A nice test casa.";
const price = "100";
const startDate = "2019-12-25";
const endDate = "2019-12-31";

fixture `Listings Page`
  .page `http://localhost:3000/listings/new`
  .beforeEach( async t => {
    await signUp(userOne, t)
    await clickAddListing(t)
    await createNewListing(t)
    await t
      .click('#view-listings-nav')
    })
  .afterEach(async t => {
    databaseHelper.dropCollection('users');
    databaseHelper.dropCollection('listings');
  })
  .after(async t => {
    databaseHelper.closeConnection();
  });

  test('There is a listing on the page', async t => {
    await t
      .expect(Selector('#name-0').exists).ok();
  });

  test('The listing is the one the user created', async t => {
    const nameElement = Selector('#name-0');
    const descriptionElement = Selector('#description-0');
    const priceElement = Selector('#price-0');
    await t
      .expect(nameElement.innerText).eql(name)
      .expect(descriptionElement.innerText).eql(description)
      .expect(priceElement.innerText).eql(price);
  });

  test('When there other listings, the user can see those also', async t => {
    await t
      .expect(Selector('#name-1').exists).ok()
      .expect(Selector('#name-2').exists).ok();
  })

  test('A user can click on a listed property to see more information', async t => {
    await t
      .click('#name-0')
      .expect(Selector('#name').innerText).eql(name)
      .expect(Selector('#description').innerText).eql(description)
      .expect(Selector('#price').innerText).eql(price);
  })

  test("When signed in a user should not see 'sign in' or 'sign up' links in the nav bar", async t => {
    await t
      .expect(Selector('#sign-in').exists).notOk()
      .expect(Selector('#sign-out').exists).notOk();
  })
