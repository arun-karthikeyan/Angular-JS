//Karma configuration

module.exports = function(config){
  config.set({
    //base path that will be used to resolve all patterns (e.g., files, exclude)
    basePath: '../', //anything that is referred to here is relative to the 'conFusion' directory

    //frameworks to use
    //available frameworks: https://npmjs.org/browse/keywords/karma-adapter
    //mocha, chair, etc.
    frameworks: ['jasmine'],

    //list of files/patterns to load in the browser

    files:[
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/scripts/*.js',
      'test/unit/**/*.js'
    ],

    //list of files to exclude
    exclude:[
      'test/protractor.conf.js',
      'test/e2e/*.js'
    ],

    //preprocess matching files before serving them to the browser
    //available preprocessors: https://npmjs.org/browser/keyword/karma-preprocessor

    preprocessors: {

    },

    //test results reporter to use
    //possible values : 'dots', 'progress'
    //available reporters: https://npmjs.org/browser/keyword/karma-reporter

    reporters: ['progress'],

    //web server protractor
    port: 9876,

    //enable/disable colors in the output (reporters and logs)
    colors: true,

    //level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    //enable/disable watching file and executing tests whenever any test file or the actual script file changes
    autoWatch: true,

    //start these browsers
    //available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Firefox', 'PhantomJS', 'PhantomJS_custom'],
    // browsers: ['Firefox'],
      browsers: ['PhantomJS'],

    //you can define custom flags
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      //Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    //Continuous Integration module
    //if true, Karma captures browsers, runs the test again exits
    //re-runs tests on file modification if singleRun: false
    singleRun: false,

    //Concurrency level
    //how many browser should be started simultaneous
    concurrency: Infinity

  })
}
