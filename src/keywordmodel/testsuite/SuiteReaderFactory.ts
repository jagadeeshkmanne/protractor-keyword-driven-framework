import ExcelSuiteFileReader from "./ExcelSuiteFileReader";
import ISuiteFileReader from "./ISuiteFileReader";
import ITestSuite from "./ITestSuite";

export default class SuiteReaderFactory {

  private suiteReaders:Array<ISuiteFileReader>  = [];
  private filePath: string;
  private args:Array<string>;
  private suiteReader:ISuiteFileReader;

  constructor(filePath:string, args?:any){
    this.filePath = filePath;
    this.args = args;
    this.init();
  }

	private init():void{
		this.suiteReaders.push(new ExcelSuiteFileReader());
	}

  public getAllTestsAsList():Promise<any> {
		let fileSupported:boolean = false;
    this.suiteReaders.forEach( (reader) => {
      if(reader.isSupported(this.filePath)){
        fileSupported = true;
        this.suiteReader = reader;
        return this.suiteReader.readFile(this.filePath, this.args);
      }
    });
		if(!fileSupported)
			console.log("None of the existing suite reader " +
					"supports the given file: "+this.filePath);

		return this.suiteReader.readFile(this.filePath, this.args);
	}

	public getTobeExecutedTestSuites():Promise<any> {
    return this.getAllTestsAsList().then(function (tests) {
      let enabledTestSuites: Array<ITestSuite> = [];

      for (let i = 0; i < tests.length; i++) {
        let testSuite: ITestSuite = tests[i];
        if (testSuite.isEnabled())
          enabledTestSuites.push(testSuite);
      }
     let returnData: object = [enabledTestSuites.length];
      for (let i = 0; i < enabledTestSuites.length; i++) {
        returnData[i] = [];
        returnData[i].push(enabledTestSuites[i]);
      }
      return enabledTestSuites;
    });
  }
}
