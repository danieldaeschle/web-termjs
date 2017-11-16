module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    preprocessors: {
      'spec/**/*.spec.js': ['webpack']
    },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-jasmine-html-reporter',
      'karma-chrome-launcher'
    ],
    files: [
      'spec/**/*.spec.js'
    ],
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    logLevel: config.LOG_INFO,
    colors: true,
    client: {
      clearContext: false
    },
    singleRun: true
  });
}
