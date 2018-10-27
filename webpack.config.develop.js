const commonConfig = require('./webpack.config.common');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {

  mode: 'development',
  
  devServer: {
    contentBase: '/',
    port: 1981,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      '/api.github.com/*': {
        target: 'http://api.github.com/',
        secure: false,
        changeOrigin: true
      }
    }
  }

});