const path = require('path');
const isCI = process.env.CI === 'true';

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      { pattern: './src/**/*.spec.js', type: 'module', watched: true }
    ],
    preprocessors: {
      './src/**/*.spec.js': ['webpack']
    },
    frameworks: ['jasmine', 'webpack'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack'),
      require('karma-sourcemap-loader')
    ],
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.css/, exclude: /node_modules/, loader: 'css-loader?url=false' }, // ignores url in CSS files
          { test: /\.js$/, enforce: 'post',
            exclude: [/\.spec.js$/, /node_modules/, /karma-test-shim.js$/],
            loader: 'istanbul-instrumenter-loader',
            query: {
              esModules: true
            }
          }
        ]
      },
      watch: true
    },
    reporters: ['progress', 'dots', 'junit', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: isCI ? config.LOG_DEBUG : config.LOG_INFO,
    autoWatch: !isCI,
    browsers: ['ChromiumHeadlessConfigured'],
    customLaunchers: {
      ChromiumHeadlessConfigured: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      }
    },
    singleRun: isCI,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    concurrency: Infinity,
    junitReporter: {
      outputDir: './reports/test-results/',
      outputFile: 'test-results.xml',
      suite: 'www.thegreenhouse.io',
      useBrowserName: false
    },
    coverageIstanbulReporter: {
      'dir': path.join(__dirname, 'reports'),
      'reports': ['html', 'cobertura', 'text-summary'],
      'report-config': {
        'html': {
          subdir: 'test-coverage'
        },
        'cobertura': {
          file: 'test-coverage/coverage.xml'
        },
        'text-summary': {}
      },
      'fixWebpackSourcePaths': true,
      'remapOptions': {
        exclude: [/\*.spec.ts/]
      },
      'thresholds': {
        // set to `true` to not fail the test command when thresholds are not met
        emitWarning: false,
        // thresholds for all files
        global: {
          statements: 90,
          branches: 80,
          functions: 90,
          lines: 90
        }
      }
    }
  });
};