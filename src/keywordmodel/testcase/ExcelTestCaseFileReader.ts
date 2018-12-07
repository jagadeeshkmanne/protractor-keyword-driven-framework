import ExcelReader from "../util/readers/ExcelReader";
import ITestCaseFileReader from "./ITestCaseFileReader";
import ITestCase from "./ITestCase";
import TestCase from "./TestCase";
import {Workbook, Worksheet} from "exceljs";
import IKeywordStore from "../reader/IKeywordStore";
import KeywordStore from "../reader/KeywordStore";

const path = require('path');

export default class ExcelTestCaseFileReader implements ITestCaseFileReader {

  public isSupported(filePath: any): boolean {
    let supported: boolean = false;
    let fileName:string = path.basename(filePath);
    if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx"))
      supported = true;
    return supported;
  }

  public readFile(filePath: any, args: Array<string>): Promise<any> {
    let excelReader:ExcelReader = null;
    const me = this;
    try {
      excelReader = new ExcelReader();
      if(args && args.length>1) {
        return excelReader.openFile(filePath, args[0]).then(function () {
          return new Promise<any>((resolve) => {
            resolve(me.getAllTestCases(excelReader));
          });
        });
      } else {
        return excelReader.openFile(filePath).then(function () {
          return new Promise<any>((resolve) => {
            resolve(me.getAllTestCases(excelReader));
          });

        });
      }
    } catch (e) {
      console.log('unable to read file' + e);
    }
  }

	private getAllTestCases(excelReader:ExcelReader):Array<ITestCase> {
		let tests:Array<ITestCase> = [];
		let workbook:Workbook = excelReader.getOpenWorkbook();
		let worksheet:Worksheet = workbook.getWorksheet('TestCases')
    let noOfRows:number = worksheet.rowCount
		for(let row = 2; row <= noOfRows; row++){
		  excelReader.setWorkSheet(worksheet);
			let testCaseId:string = excelReader.getData(row, 1);
			let testCaseName:string = excelReader.getData(row, 2);
			let enabledValue:string = excelReader.getData(row, 3);
			let enabled:boolean = enabledValue.toUpperCase() == "Y";
			let testCaseSheetName:string = excelReader.getData(row, 4);
      let testCase:ITestCase = new TestCase(testCaseName, testCaseId, enabled, testCaseSheetName);
      let testSteps:Array<IKeywordStore> = this.getTestSteps(excelReader, testCase);
      testCase.setTestSteps(testSteps);
			tests.push(testCase);
		}
		return tests;
	}

	private getTestSteps(excelReader, testCase) {
    let keyStores:Array<IKeywordStore> = Array<IKeywordStore>();
    let workbook:Workbook = excelReader.getOpenWorkbook();
    let worksheet:Worksheet = workbook.getWorksheet(testCase.testCaseSheetName)
    excelReader.setWorkSheet(worksheet);
    let noOfRows:number = worksheet.rowCount
    for (let rowNo = 2; rowNo <= noOfRows; rowNo++) {
      let key:string = excelReader.getData(rowNo, 1);
      let locator:string = excelReader.getData(rowNo, 2);
      let locatorType:string = excelReader.getData(rowNo, 3);
      let value:string = excelReader.getData(rowNo, 4);
      let keyStore:IKeywordStore = new KeywordStore();
      let params = [];
      for (var columnNo = 4; columnNo <= excelReader.getNoOfColumn(rowNo); columnNo++) {
        var param = excelReader.getData(rowNo, columnNo);
        params.push(param);
      }
      keyStore.setKeyword(key);
      keyStore.setParams(params);
      keyStore.setLocator(locator);
      keyStore.setLocatorType(locatorType);
      keyStores.push(keyStore);
    }
    return keyStores;
  }

}
