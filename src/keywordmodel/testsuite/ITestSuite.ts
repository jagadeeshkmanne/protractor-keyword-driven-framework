export default interface ITestSuite {

  getTestSuiteName():string;
	
	setTestSuiteName(testSuiteName:string):void;

	getTestSuiteId():string;

	setTestSuiteId(testSuiteId:string):void;
	
	isEnabled():boolean;
	
	setEnabled(enabled:boolean):void;
	
	getTestFilePath():string;

	setTestFilePath(testFilePath:string):void;
	
}
