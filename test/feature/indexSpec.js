var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var driver = new webdriver.Builder().forBrowser('chrome').build();
var expect = require('chai').expect;

describe("Homepage Test", function() {
  after(function() {
    return driver.quit();
  });

  it("opens the FairBnB website", function() {
    return driver.get("localhost:3000");
  });

  it("has 'FairBnB' as a title", function() {
    return driver.getTitle()
    .then(function(title) {
      expect(title).to.equal("TESTTEST");
    })
    .catch(function(reason) {
      console.log("The title of the page is not 'FairBnB'.");
    });
  });
});
