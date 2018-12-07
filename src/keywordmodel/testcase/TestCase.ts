import ITestCase from "./ITestCase";
import IKeywordStore from "../reader/IKeywordStore";

export default class TestCase implements ITestCase{
	
	testCaseName:string;
	testCaseId:string;
	enabled:boolean;
	testCaseSheetName:string;
	testSteps:Array<IKeywordStore>

	constructor(testCaseName:string, testCaseId:string, enabled:boolean,testCaseSheetName:string){
		this.testCaseName = testCaseName;
		this.testCaseId = testCaseId;
		this.enabled = enabled;
		this.testCaseSheetName = testCaseSheetName;
	}
	
	public getTestCaseName():string {
		return this.testCaseName;
	}

	public setTestCaseName(testCaseName:string):void {
		this.testCaseName = testCaseName;
		
	}

	public getTestCaseId():string {
		return this.testCaseId;
	}

	public setTestCaseId(testCaseId:string):void {
		this.testCaseId = testCaseId;
	}

	public isEnabled():boolean {
		return this.enabled;
	}

	public setEnabled(enabled:boolean):void {
		this.enabled = enabled;		
	}

	public getTestCaseSheetName():string {
		return this.testCaseSheetName;
	}

	public setTestCaseSheetName(testCaseSheetName:string):void {
		this.testCaseSheetName = testCaseSheetName;
	}

  public getTestSteps():Array<IKeywordStore> {
    return this.testSteps;
  }

  public setTestSteps(testSteps:Array<IKeywordStore>):void {
    this.testSteps = testSteps;
  }
}
