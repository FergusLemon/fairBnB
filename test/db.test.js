'use strict';

const expect = require('chai').expect;
const mongoose = require('mongoose');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const databaseHelper = require(path.join(HOMEDIR, 'test', 'helpers', 'dbSetupHelper'));
const Factory = require(path.join(HOMEDIR, 'test', 'helpers', 'factories'));
const { environment } = require(path.join(HOMEDIR, 'config'));
const User = require(path.join(HOMEDIR, 'app_api', 'models', 'users'));
const firstUserDetails = Factory.validUserOne();
const secondUserDetails = Factory.validUserTwo();

if ( `${environment}` === "test" ) {
  databaseHelper.setUpTestDatabase();
}

beforeEach(() => {
  databaseHelper.dropCollection('users');
});

after(() => {
  databaseHelper.closeConnection();
});

describe('CRUD operations on a user', () => {
  let user, query;

  beforeEach(() => {
    user = new User(firstUserDetails);
    query = { username: user.username };
  });

  it('creates a new user in the database', async () => {
    let result = await user.save();
    expect(result.isNew).to.equal(false);
  });

  it("reads an existing user's details from the database", async () => {
    await user.save();
    let result = await (User.findOne(query));
    expect(result.username).to.equal(query.username);
  });

  it("updates an existing user's details in the database", async () => {
    await user.save();
    let newUsername = { username: "new@newmail.com" };
    await (User.updateOne(query, newUsername ));
    let result = await User.findOne(query);
    let updatedUser = await User.findOne(newUsername);
    expect(result).to.equal(null);
    expect(updatedUser.username).to.equal(newUsername.username);
  })

  it('deletes an existing user from the database', async () => {
    await user.save();
    await User.deleteOne(query);
    let result = await (User.findOne(query));
    expect(result).to.equal(null);
  });
});

describe('Storing passwords securely', () => {
  let user, query, result;
  beforeEach( async () => {
    user = new User(firstUserDetails);
    query = { username: user.username };
    await user.save();
    result = await (User.findOne(query));
  });

  it('does not store passwords as plaintext', async () => {
    expect(result.password).to.not.equal(firstUserDetails.password);
  });
  it("stores the hash of the user's password", async () => {
    expect(result.password).to.equal(user.password);
  });
});

describe("Comparing a user's password with the database record", () => {
  let user, result, query;
  beforeEach( async () => {
    user = new User(firstUserDetails);
    query = { username: user.username };
    await user.save();
    result = await (User.findOne(query));
  });

  it('returns true when two passwords match', async () => {
    let promise = await result.comparePassword(firstUserDetails.password);
    expect(promise).to.equal(true);
  });
  it('returns false when two passwords match', async () => {
    let promise = await result.comparePassword('random password');
    expect(promise).to.equal(false);
  });
});
