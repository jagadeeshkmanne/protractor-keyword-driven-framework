export default interface IKeywordStore {

  setKeyword(keyword: string): void;

  getKeyword(): string;

  setLocator(locator: string): void;

  getLocator(): string;

  setLocatorType(locatorType: string): void;

  getLocatorType(): string;

	setParams(args: any);
	
	getParams(): any;

}
