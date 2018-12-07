import ExcelKeywordReader from "./ExcelKeywordReader";
import IKeywordReader from "./IKeywordReader";


export default class KeywordReaderFactory {
	filePath: any = null;
	args: Array<string> = [];
  keyReaders: Array<IKeywordReader>=[];

	constructor(file: any, args: string[]){
		this.filePath = file;
		this.args = args;
		this.initialize();
	}
	
	private initialize(){
		this.keyReaders.push(new ExcelKeywordReader());
	}
	
	public getKeywordTestData():Promise<any> {
		let supported:boolean = false;
		let supportedReader:IKeywordReader = null;
		var me = this;
    this.keyReaders.forEach( (reader) => {
      if(reader.isSupported(this.filePath)){
        supported = true;
        supportedReader = reader;
        return me.getData(supportedReader);
      }
    });
    return this.getData(supportedReader);
	}
	
	private getData(reader: IKeywordReader): Promise<any>{
		if(this.args == null){
			return reader.readFile(this.filePath);
		}else{
			return reader.readFile(this.filePath, this.args);
		}
	}
}
