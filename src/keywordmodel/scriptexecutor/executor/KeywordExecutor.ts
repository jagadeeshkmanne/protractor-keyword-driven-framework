import IKeywordStore from "../../reader/IKeywordStore";
import KeywordFactory from "./KeywordFactory";
import ITestCase from "../../testcase/ITestCase";

export default class KeywordExecutor {

  driver:any;
	testCase: ITestCase;
  keyfactory:KeywordFactory;

	public constructor(driver?:any, testCase?:ITestCase){
		this.driver = driver;
		this.testCase = testCase;
    this.keyfactory = new KeywordFactory(this.driver);
	}

	public execute():void{
    const me = this
    let keywords:Array<IKeywordStore> = this.testCase.getTestSteps();
    keywords.forEach( (keyword) => {
       me.keyfactory.executeKeyword(keyword);
    });
	}
}

