import IKeywordStore from "./IKeywordStore";

export default class KeywordStore implements IKeywordStore{
	private keyword:string = "";
	private params:any = [];
	private locatorType:string = "";
	private locator:string = "";
	
	public setKeyword(keyword: string): void {
		this.keyword = keyword;		
	}

	public getKeyword(): string {
		return this.keyword;
	}

	public  setParams(params:string ):void {
		this.params = params;
	}

	public getParams():string {
		return this.params;
	}

  public setLocatorType(locatorType: string): void {
    this.locatorType = locatorType;
  }

  public getLocatorType(): string {
    return this.locatorType;
  }

  public setLocator(locator: string): void {
    this.locator = locator;
  }

  public getLocator(): string {
    return this.locator;
  }
}
