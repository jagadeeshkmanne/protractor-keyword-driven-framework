// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {
  allScriptsTimeout: 11000,
  params:{
    dev: {
      baseUrl: 'https://angularjs.org/'
    },
    qa: {
      baseUrl: 'https://angularjs.org/'
    },
    prod: {
      baseUrl: 'https://angularjs.org/'
    }
  },
  specs: [
    './e2e/**/app.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('@babel/register')({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
    var environment = browser.params[browser.params.env];
    if (browser.params[browser.params.env]) {
      browser.baseUrl = environment['baseUrl'];
    } else {
      browser.baseUrl = 'https://angularjs.org/';
    }
    //load all suites in the application startup;
    var automationModule = require('./src/startup/bootloader.ts');
    var defer = protractor.promise.defer();
    automationModule.load.then(function(res) {
      defer.fulfill(res);
    });

    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });

    jasmine.getEnv().addReporter(new HtmlReporter({
             baseDirectory: 'report'
            , screenshotsSubfolder: 'images'
            , jsonsSubfolder: 'jsons'
            , preserveDirectory: false
    }).getJasmine2Reporter());
    return defer.promise;
  }
};

