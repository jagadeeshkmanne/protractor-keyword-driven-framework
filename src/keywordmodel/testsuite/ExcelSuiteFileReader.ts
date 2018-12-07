import ExcelReader from "../util/readers/ExcelReader";
import ISuiteFileReader from "./ISuiteFileReader";
import ITestSuite from "./ITestSuite";
import TestSuite from "./TestSuite";

const path = require('path');

export default class ExcelSuiteFileReader implements ISuiteFileReader{

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
            resolve(me.getTestSuites(excelReader));
          });
        });
      } else {
        return excelReader.openFile(filePath).then(function () {
          return new Promise<any>((resolve) => {
            resolve(me.getTestSuites(excelReader));
          });

        });
      }
    } catch (e) {
      console.log('unable to read file' + e);
    }
  }

	private getTestSuites(excelReader:ExcelReader):Array<ITestSuite> {
		let tests:Array<ITestSuite> = [];
		let noOfTestRows:number = excelReader.getNoOfRows();
		for(let row = 1; row <= noOfTestRows; row++){
			let testSuiteId:string = excelReader.getData(row, 1);
			let testSuiteName:string = excelReader.getData(row, 2);
			let enabledValue:string = excelReader.getData(row, 3);
			let enabled:boolean = enabledValue.toUpperCase() == "Y";
			let testFilePath:string = excelReader.getData(row, 4);
      let testSuite:ITestSuite = new TestSuite(testSuiteName, testSuiteId, enabled, testFilePath);
			tests.push(testSuite);
		}
		return tests;
	}
}
