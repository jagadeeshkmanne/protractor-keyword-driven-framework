export default interface ITestCaseFileReader {
	
	isSupported(filePath: string):boolean;

  readFile(filePath:string, args:Array<string>):Promise<any>;

}
