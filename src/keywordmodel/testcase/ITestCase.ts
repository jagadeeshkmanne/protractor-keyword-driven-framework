import IKeywordStore from "../reader/IKeywordStore";

export default interface ITestCase {

  getTestCaseName():string;
	
	setTestCaseName(testCaseName:string):void;

	getTestCaseId():string;

	setTestCaseId(testCaseId:string):void;
	
	isEnabled():boolean;
	
	setEnabled(enabled:boolean):void;
	
	getTestCaseSheetName():string;

	setTestCaseSheetName(testCaseSheetName:string):void;

	setTestSteps(testSteps:Array<IKeywordStore>):void;

	getTestSteps():Array<IKeywordStore>;
	
}
