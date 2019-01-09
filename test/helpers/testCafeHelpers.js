import { Selector } from 'testcafe';
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
