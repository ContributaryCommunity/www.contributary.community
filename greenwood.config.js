const googleAnalyticsPlugin = require('@greenwood/plugin-google-analytics');
const pluginImportCSS = require('@greenwood/plugin-import-css');
const pluginPolyfills = require('@greenwood/plugin-polyfills');
const pluginPostcss = require('@greenwood/plugin-postcss');

module.exports = {
  title: 'Contributary Community',
  
  devServer: {
    proxy: {
      '/api': 'https://www.contributary.community'
    }
  },

  mode: 'spa',

  plugins: [
    pluginPostcss(),
    ...pluginImportCSS(),
    ...pluginPolyfills(),
    googleAnalyticsPlugin({
      analyticsId: 'G-0F85VEMETN'
    })
  ]
};