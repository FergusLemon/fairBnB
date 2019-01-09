import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

const username = Selector('#username');
const password = Selector('#password');
const firstName = Selector('#firstname');
const lastName = Selector('#lastname');

export async function fillOutForm(t) {
  await t
    .typeText(username, 'test@testmail.com')
    .typeText(password, 'P@$$w0rdH3aVy')
    .typeText(firstName, 'Test')
    .typeText(lastName, 'User')
};

export async function signUp(t) {
  await t
    .navigateTo('http://localhost:3000/users/new');
  await fillOutForm(t)
  await t
    .click('#register');
};
