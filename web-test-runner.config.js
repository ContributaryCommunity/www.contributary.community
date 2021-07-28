const { defaultReporter } = require('@web/test-runner');
const greenwoodPluginImportCss = require('@greenwood/plugin-import-css/src/index');
const { junitReporter } = require('@web/test-runner-junit-reporter');
const path = require('path');

// create a direct instance of ImportCssResource
const importCssResource = greenwoodPluginImportCss()[0].provider({});

module.exports = {
  files: './src/**/*.spec.js',
  nodeResolve: true,
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    junitReporter({
      outputPath: './reports/test-results.xml'
    })
  ],
  coverage: true,
  coverageConfig: {
    reportDir: './reports'
  },
  plugins: [{
    name: 'import-css',
    async transform(context) {
      const { url } = context.request;
      const shouldIntercept = await importCssResource.shouldIntercept(url, context.body, { request: context.headers });
      
      if (shouldIntercept) {
        const cssResource = await importCssResource.intercept(url, context.body);
        const { body, contentType } = cssResource;

        return {
          body,
          headers: {
            'content-type': contentType
          }
        };
      }
    }
  }],
  middleware: [
    function rewriteIndex(context, next) {
      const { url } = context.request;

      if (url.indexOf('/assets') === 0) {
        context.request.url = path.join(process.cwd(), 'src', url);
      }

      return next();
    }
  ]
};