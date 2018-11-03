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
      '/api/*': {
        target: 'http://stage.contributary.community/',
        secure: false,
        changeOrigin: true
      }
    }
  }

});