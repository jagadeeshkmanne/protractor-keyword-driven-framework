import ITestSuite from "./ITestSuite";

export default class TestSuite implements ITestSuite{
	
	testSuiteName:string;
	testSuiteId:string;
	enabled:boolean;
	testFilePath:string;

	constructor(testSuiteName:string, testSuiteId:string, enabled:boolean,testFilePath:string){
		this.testSuiteName = testSuiteName;
		this.testSuiteId = testSuiteId;
		this.enabled = enabled;
		this.testFilePath = testFilePath;
	}
	
	public getTestSuiteName():string {
		return this.testSuiteName;
	}

	public setTestSuiteName(testSuiteName:string):void {
		this.testSuiteName = testSuiteName;
		
	}

	public getTestSuiteId():string {
		return this.testSuiteId;
	}

	public setTestSuiteId(testSuiteId:string):void {
		this.testSuiteId = testSuiteId;
	}

	public isEnabled():boolean {
		return this.enabled;
	}

	public setEnabled(enabled:boolean):void {
		this.enabled = enabled;		
	}

	public getTestFilePath():string {
		return this.testFilePath;
	}

	public setTestFilePath(testFilePath:string):void {
		this.testFilePath = testFilePath;
	}
}
