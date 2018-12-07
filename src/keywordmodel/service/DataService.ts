import KeywordExecutor from "../scriptexecutor/executor/KeywordExecutor";

export default class DataService {
  testSuites: any;
  private static instance: DataService;
  keywordExecuter: KeywordExecutor

  private constructor() {
  }

  static getInstance() {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public getTestSuites(): string {
    return this.testSuites;
  }

  public setTestSuites(testSuites: any): void {
    this.testSuites = testSuites;
  }

  public getExecutor(): any {
    return this.keywordExecuter;
  }

  public setExecutor(executor: any): void {
    this.keywordExecuter = executor;
  }
}
