const { Builder, By, Key, until } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var driver = new Builder().forBrowser('chrome').build();
var expect = require('chai').expect;

describe("The homepage", function() {
  after(function() {
    return driver.quit();
  });

  describe("exists and has a title", function() {
    it("opens on the FairBnB website", function() {
      return driver.get("localhost:3000");
    });
    it("has 'FairBnB' as a title", function() {
      return driver.getTitle()
      .then(function(title) {
        expect(title).to.equal("FairBnB");
      })
      .catch(function(reason) {
        console.log("The title of the page is not 'FairBnB'.");
      });
    });
  });

  describe("has a sign up link", function() {
    it("that users can click on", function() {
      return driver.findElement(By.id("sign-up")).getText()
      .then(function(text) {
        expect(text).to.equal("Sign Up");
      })
      .catch(function(reason) {
        console.log("There doesn't appear to be a sign up link.");
      });
    });
    it("that when clicked goes to the new user registration page", async function() {
      try {
        await driver.findElement(By.id("sign-up")).click();
        var url = await driver.getCurrentUrl();
        expect(url).to.equal("http://localhost:3000/user/new");
      } catch (err) {
          console.log("The sign up link does not go to the new user registration page.");
      }
    });
  });
});
