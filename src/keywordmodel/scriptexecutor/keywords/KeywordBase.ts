import IKeyword from "./IKeyword";
import IKeywordStore from "../../reader/IKeywordStore";
import {browser, by, element, ExpectedConditions, protractor} from 'protractor';


export default class KeywordBase implements IKeyword {

  browser: any;
  driver: any;
  keyword: IKeywordStore;

  constructor(browser: any) {
    this.browser = browser;
    this.driver = browser.driver;
  }

  public execute(keyword: IKeywordStore): void {
    this.keyword = keyword;
    let method = keyword['keyword'];
    let keywordBase = this;
    keywordBase[method](keyword);
  }

  public findLocator(): any {
    const keyword = this.keyword;
    let locatorType = keyword['locatorType'];
    let locator = keyword['locator'];
    switch (locatorType) {
      case "id":
        return by.id(locator);
      case "name":
        return by.name(locator);
      case "class":
        return by.className(locator);
      case "xpath":
        return by.xpath(locator);
      case "css":
        return by.cssSelector(locator);
      case "linkText":
        return by.linkText(locator);
      case "partialLinkText":
        return by.partialLinkText(locator);
      case "tagName":
        return by.tagName(locator);
      case "model":
        return by.model(locator);
      default:
        return null;
    }
  }

  public navigateToUrl(url: string): void {
    //this.browser.get('/');
  }

  public inputText(): void {
    let params = this.keyword['params'];
    let text = params[0];
    let locator = this.findLocator();
    console.log("element  -----" + locator);
    element(locator).sendKeys(text);

  }

  /* Start of Click methods*/
  public click() {
    let locator = this.findLocator();
    console.log("elementttttt" + locator);
    element(locator).click();
    // browser.waitForAngular();
  }

  public clickForcefully() {
    const keyword = this.keyword;
  }

  public doubleClick() {
    const keyword = this.keyword;
  }

  public selectdropdownByIndex() {
    let params = this.keyword['params'];
    let index = params[0];
    let optionLocator = params[1];
    let locator = this.findLocator();
    console.log("----option locator--------------" + optionLocator);
    element(locator).click();
    let options = element.all(by.css(optionLocator));
    console.log("----------------------------" + index);
    console.log("-------------------------------" + options);
    browser.waitForAngular();
    options.get(index).click();
  }

  public selectRadioButtonByIndex() {
    let params = this.keyword['params'];
    let index = params[0];
    let locator = this.findLocator();
    let options = element.all(locator);
    console.log("------------------------" + locator);
    options.get(index).click();
  }


  public selectdropdownByText() {
    let params = this.keyword['params'];
    let text = params[0];
    let locator = this.findLocator();
    element(locator).click();
    browser.waitForAngular();
    element(by.cssContainingText('mat-option', text)).click();
  }

  public selectradiobuttonByText(){
    let params = this.keyword['params'];
    let text = params[0];
    element(by.cssContainingText('mat-radio-button',text)).click();
  }

}
