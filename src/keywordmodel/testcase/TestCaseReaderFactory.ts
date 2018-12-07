import ITestCaseFileReader from "./ITestCaseFileReader";
import ExcelTestCaseFileReader from "./ExcelTestCaseFileReader";
import ITestCase from "./ITestCase";

export default class TestCaseReaderFactory {

  private testCaseFileReaders:Array<ITestCaseFileReader>  = [];
  private filePath: string;
  private args:Array<string>;
  private testCaseFileReader:ITestCaseFileReader;

  constructor(filePath:string, args?:any){
    this.filePath = filePath;
    this.args = args;
    this.init();
  }

	private init():void{
		this.testCaseFileReaders.push(new ExcelTestCaseFileReader());
	}

  public getAllTestsAsList():Promise<any> {
		let fileSupported:boolean = false;
    this.testCaseFileReaders.forEach( (reader) => {
      if(reader.isSupported(this.filePath)){
        fileSupported = true;
        this.testCaseFileReader = reader;
        return this.testCaseFileReader.readFile(this.filePath, this.args);
      }
    });
		if(!fileSupported)
			console.log("None of the existing suite reader " +
					"supports the given file: "+this.filePath);

		return this.testCaseFileReader.readFile(this.filePath, this.args);
	}

	public getEnabledTests():Promise<any> {
    return this.getAllTestsAsList().then(function (tests) {
      let enabledTests: Array<ITestCase> = [];
      for (let i = 0; i < tests.length; i++) {
        let test: ITestCase = tests[i];
        if (test.isEnabled())
          enabledTests.push(test);
      }
      let returnData: object = [enabledTests.length];
      for (let i = 0; i < enabledTests.length; i++) {
        returnData[i] = [];
        returnData[i].push(enabledTests[i]);
      }
      return enabledTests;
    });
  }
}
