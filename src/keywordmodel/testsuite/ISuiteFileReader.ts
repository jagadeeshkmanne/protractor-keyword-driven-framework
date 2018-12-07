export default interface ISuiteFileReader {
	
	isSupported(filePath: string):boolean;

  readFile(filePath:string, args:Array<string>):Promise<any>;

}
