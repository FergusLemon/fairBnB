'use strict';
import { Selector } from 'testcafe';
const User = require('../../../app_api/models/users');
const Factory = require('../../helpers/factories');
const validUserDetails = Factory.validUserOne();

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/TestCafeFairBnB';
mongoose.connect(mongoDB, { useNewUrlParser: true } );
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const username = Selector('#username');
const password = Selector('#password');

fixture `User Login`
  .page `http://localhost:3000`
  .beforeEach(async t => {
    let user = new User(validUserDetails);
    user.save();
  })
  .after(async t => {
    const dbDropCollection = await mongoose.connection.db.dropCollection('users', (err) => {
      console.log('Collection dropped.');
    })
    const dbTearDown = await mongoose.connection.close((err) => {
      console.log("Connection closed.");
    })
  });

  test('There is a sign in link for the user', async t => {
    await t
      .expect(Selector('#sign-in').exists).ok();
  });

  test('There are empty username and password fields to fill in', async t => {
    await t
      .click('#sign-in')
      .expect(username.innerText).eql("")
      .expect(password.innerText).eql("");
  });

  test('A new user cannot log in without first signing up', async t => {
    await t
      .click('#sign-in')
      .typeText(username, 'newUser@newmail.com')
      .typeText(password, 'n3WP@ssword')
      .click('#sign-in')
      .expect(Selector('#search-placeholder').exists).notOk()
      .expect(Selector('#error-message').innerText).eql("Incorrect username.");
  });

  test('An existing user can sign in', async t => {
    await t
      .click('#sign-in')
      .typeText(username, validUserDetails.username)
      .typeText(password, validUserDetails.password)
      .click('#sign-in')
      .expect(Selector('#search-placeholder').exists).ok();
  });
