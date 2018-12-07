import SuiteReaderFactory from "../keywordmodel/testsuite/SuiteReaderFactory";
import TestCaseReaderFactory from "../keywordmodel/testcase/TestCaseReaderFactory";
import DataService from "../keywordmodel/service/DataService";
import KeywordExecutor from "../keywordmodel/scriptexecutor/executor/KeywordExecutor";

let filePath = process.cwd() + "\\e2e\\suite\\TestSuite.xlsx";
let readerFactory = new SuiteReaderFactory(filePath);

var load = new Promise(function (resolve, reject) {
  readerFactory.getTobeExecutedTestSuites().then(function (testsuites) {
	new KeywordExecutor(); // small hack to ignore the compile error;
    let testSuitesList = [];
    for (let i = 0; i < testsuites.length; i++) {
      let testSuite = testsuites[i];
      let filePath = process.cwd() + testSuite['testFilePath'];
      let testCaseReaderFactory = new TestCaseReaderFactory(filePath);
      testCaseReaderFactory.getEnabledTests().then(function (testCases) {
          let testCasesBySuite = {}
          testCasesBySuite['suiteName'] = testSuite.testSuiteName;
          testCasesBySuite['testCases'] = testCases;
          testSuitesList.push(testCasesBySuite);
          if(i == testsuites.length - 1) {
            DataService.getInstance().setTestSuites(testSuitesList);
            resolve(DataService.getInstance());
          }
        })
      }
    });
});

exports.load = load;
