import ExcelReader from '../util/readers/ExcelReader'
import IKeywordStore from "./IKeywordStore";
import IKeywordReader from "./IKeywordReader";
import KeywordStore from "./KeywordStore";
const path = require('path');


export default class ExcelKeywordReader implements IKeywordReader {

	public isSupported(filePath: any): boolean {
	 let supported: boolean = false;
	 let fileName:string = path.basename(filePath);
   if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx"))
			supported = true;
		return supported;
	}

	public readFile(filePath: any, args?: Array<string>):Promise<any> {
		let excelReader:ExcelReader = null;
		const me = this;
		try {
			excelReader = new ExcelReader();
      if(args && args.length>1) {
        return excelReader.openFile(filePath, args[0]).then(function () {
          return new Promise<any>((resolve) => {
            resolve(me.readData(excelReader));
          });
        });
      } else {
        return excelReader.openFile(filePath).then(function () {
          return new Promise<any>((resolve) => {
            resolve(me.readData(excelReader));
          });
        });
      }
		} catch (e) {
			console.log('unable to read file' + e);
		}
	}

	public readData(excelReader:ExcelReader): Array<IKeywordStore>  {
		const noOfRows: number = excelReader.getNoOfRows();
		let keyStores:Array<IKeywordStore> = Array<IKeywordStore>();

		for (let rowNo = 2; rowNo <= noOfRows; rowNo++) {
			let key:string = excelReader.getData(rowNo, 1);
      let locator:string = excelReader.getData(rowNo, 2);
      let locatorType:string = excelReader.getData(rowNo, 3);
			let value:string = excelReader.getData(rowNo, 4);
			let params = [];
      for (var columnNo = 4; columnNo < excelReader.getNoOfColumn(rowNo); columnNo++) {
        var param = excelReader.getData(rowNo, columnNo);
        params.push(param);
      }
			let keyStore:IKeywordStore = new KeywordStore();
			keyStore.setKeyword(key);
			keyStore.setParams(params);
			keyStore.setLocator(locator);
			keyStore.setLocatorType(locatorType);
			keyStores.push(keyStore);
		}
		return keyStores;
	}

}
