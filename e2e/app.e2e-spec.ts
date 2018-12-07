import { browser } from 'protractor'
var using = require('jasmine-data-provider');
import DataService from "../src/keywordmodel/service/DataService";
import KeywordExecutor from "../src/keywordmodel/scriptexecutor/executor/KeywordExecutor";

beforeAll(function () {
  browser.driver
    .manage()
    .window()
    .maximize();
  browser.get(browser.baseUrl);
  browser.get(browser.baseUrl);
})

beforeEach(function() {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
});

afterEach(function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

var testCasesBySuite = DataService.getInstance().getTestSuites();

using(testCasesBySuite, function (data) {
  describe(data.suiteName, function () {
    using(data.testCases, function (testCase) {
      it(testCase.testCaseName, function () {
         let keywordExecutor: KeywordExecutor = new KeywordExecutor(browser, testCase) ;
           keywordExecutor.execute();
      });
    });
  });
});
