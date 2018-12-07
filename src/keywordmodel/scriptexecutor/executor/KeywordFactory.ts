import IKeywordStore from "../../reader/IKeywordStore";
import KeywordBase from "../keywords/KeywordBase";

export default class KeywordFactory {
	
	browser:any;

	constructor(browser:any) {
	  this.browser = browser
  }

	public executeKeyword(keyword:IKeywordStore):void{
    let keywordBase: KeywordBase =  new KeywordBase(this.browser);
    keywordBase.execute(keyword);
	}
}
