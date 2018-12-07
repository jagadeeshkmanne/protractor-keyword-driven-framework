import {Row, Cell, Workbook, Worksheet} from "exceljs";
import * as _ from 'underscore';

const Excel = require('exceljs');
const path = require('path');

export default class ExcelReader {
	private openCell:Cell;
	private openRow: Row;
	private openSheet: Worksheet;
	private openWorkbook: Workbook;
	public static noOfSheet: number = 0;

	private storedData = new Map();

  constructor() {
  }

	public openWorkSheet(indexOrName: number|string){
		this.openSheet = this.openWorkbook.getWorksheet(indexOrName);
	}

  public setWorkSheet(worksheet: Worksheet){
    this.openSheet = worksheet;
  }
	public getOpenWorkbook(): any{
		return this.openWorkbook;
	}

	public getNoOfRows():number {
		return this.openSheet.rowCount;
	}

	public getNoOfColumn(rowNo: number = 0): number {
		const rw:Row = this.openSheet.getRow(rowNo);
		return rw.cellCount;
	}


	public openFile(filePath?: string, sheetNoOrName?: string) {
    const workbook = new Excel.Workbook();
    const me = this;
    return workbook.xlsx.readFile(filePath)
      .then(function(workbook) {
        me.openWorkbook = workbook
        me.openSheet = me.openWorkbook.getWorksheet(sheetNoOrName);
        return me.openWorkbook;
     });
  }

  public storeData() {
    let rw:Row;
    const rowCount:number = this.openSheet.rowCount;
    this.storedData.clear();
    for (let i = 1; i < rowCount; i++) {
      rw = this.openSheet.getRow(i);
      let key: string = this.getData(0, i);
      let valueList:Array<string> = [];
      this.storedData.set(key, valueList);
      for (let j  = 1; j <= rw.cellCount; j++) {
        let data:string = this.getData(j, i);
        valueList.push(data);
      }
    }
  }

  public getStoredData(){
    if(_.isEmpty(this.storedData)){
      this.storeData();
    }
    return this.storedData;
  }

  public getData(row:number, column:number):string {
    let data:string = "";
    this.openRow = this.openSheet.getRow(row);
    this.openCell = this.openRow.getCell(column);
    if (this.openCell.value) {
      data = this.openCell.text
      if (_.isNull(data)) {
        data = "";
      }
    }
      return data;
  }
}
