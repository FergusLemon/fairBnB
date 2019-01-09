import { Selector } from 'testcafe';

const username = Selector('#username');
const password = Selector('#password');
const firstName = Selector('#firstname');
const lastName = Selector('#lastname');
const name = Selector('#name');
const description = Selector('#description');
const price = Selector('#price');

export async function fillOutNewUserForm(t) {
  await t
    .typeText(username, 'test@testmail.com')
    .typeText(password, 'P@$$w0rdH3aVy')
    .typeText(firstName, 'Test')
    .typeText(lastName, 'User')
};

export async function signUp(t) {
  await t
    .navigateTo('http://localhost:3000/users/new');
  await fillOutNewUserForm(t)
  await t
    .click('#register');
};

export async function fillOutNewListingForm(t) {
  await t
    .typeText(name, 'Casa Test')
    .typeText(description, 'A nice test casa.')
    .typeText(price, String(100));
};
