
export default  interface IKeywordReader {

 isSupported(file: any) : boolean

 readFile(filePath?: any, args?: Array<string>): Promise<any>;

}
