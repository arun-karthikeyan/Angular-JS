exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:3001',

  framework: 'jasmine',

  //allows protractor to connect to chrome/firefox withour requiring selenium setup
  directConnect: true,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: true
  }
};
