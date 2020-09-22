const commonConfig = require('./webpack.config.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
  
  mode: 'production',

  performance: {
    hints: 'error',
    assetFilter: (assetFilename) => {
      return assetFilename.indexOf('webcomponents') < 0;
    }
  },

  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'src', 'favicon.png'),
      emitStats: true,
      statsFilename: 'icons/stats.json',
      inject: true,
      title: 'Contributary',
      background: '#efefef',
      icons: {
        android: true,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: false
      }
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
  
});