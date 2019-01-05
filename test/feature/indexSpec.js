var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var driver = new webdriver.Builder().forBrowser('chrome').build();
var expect = require('chai').expect;

describe("Homepage Test", function() {
  after(function() {
    return driver.quit();
  });

  it("has 'FairBnB' as a title", function() {
    driver.get("localhost:3000");
    var title = driver.getTitle().then(function(title) {
      return expect(title).to.equal("FairBnB");
    });
    process.on('unhandledRejection', function(reason, promise) {
      console.log('Unhandled Rejection at:', reason.stack || reason);
    });
  });
});
