const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const outputDir = path.join(__dirname, 'public');
const webcomponentsDepRoot = path.join(__dirname, 'node_modules/@webcomponents/webcomponentsjs');

module.exports = {
  context: path.resolve('./src'),

  entry: {
    index: './index'
  },

  output: {
    path: outputDir,
    filename: '[name].[chunkhash].bundle.js'
  },
  
  module: {
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['css-to-string-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg|jpe?g|png|gif|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }]
  },

  plugins: [

    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(webcomponentsDepRoot, 'bundles/'),
        to: outputDir
      }, {
        from: path.join(webcomponentsDepRoot, 'webcomponents-loader.js'),
        to: outputDir
      }, {
        from: path.join(webcomponentsDepRoot, 'webcomponents-bundle.js'),
        to: outputDir
      }]
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency'
    })
  
  ]

};