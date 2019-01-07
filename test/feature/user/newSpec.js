'use strict';
const { Builder, By, Key, until } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var driver = new Builder().forBrowser('chrome').build();
var expect = require('chai').expect;
var async = require('async');

describe("The user registration page", function() {
  before(function() {
    return driver.get("http://localhost:3000/user/new");
  });

  after(function() {
    return driver.quit();
  });

  it("has a username field", async function() {
    try {
      var username = await driver.findElement(By.id("username")).getAttribute("name");
      expect(username).to.equal("username");
    } catch (err) {
      console.log("Unable to find the username field on the registration page.");
      console.log("Error message for developers: " + err);
    }
  });
  it("has a password field", async function() {
    try {
      var password = await driver.findElement(By.id("password")).getAttribute("name");
      expect(password).to.equal("password");
    } catch (err) {
      console.log("Unable to find the password field on the registration page.");
      console.log("Error message for developers: " + err);
    }
  });
  it("has a first name field", async function() {
    try {
      var firstname = await driver.findElement(By.id("firstname")).getAttribute("name");
      expect(firstname).to.equal("firstname");
    } catch (err) {
      console.log("Unable to find the first name field on the registration page.");
      console.log("Error message for developers: " + err);
    }
  });
  it("has a last name field", async function() {
    try {
      var lastname = await driver.findElement(By.id("lastname")).getAttribute("name");
      expect(lastname).to.equal("lastname");
    } catch (err) {
      console.log("Unable to find the last name field on the registration page.");
      console.log("Error message for developers: " + err);
    }
  });
  it("has a submit button that takes a user back to the homepage", async function() {
    await driver.findElement(By.id("register")).click();
    try {
      var url = await driver.getCurrentUrl();
      expect(url).to.equal("http://localhost:3000/");
    } catch (err) {
      console.log("The user was not taken back to the homepage.");
      console.log("Error message for developers: " + err);
    }
  });
});
