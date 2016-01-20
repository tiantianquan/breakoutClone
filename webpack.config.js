var webpack = require('webpack')
var path = require('path')

var ExtractTextPlugin = require("extract-text-webpack-plugin")



module.exports = {
  entry: {
    entry: [
      'webpack/hot/dev-server',
      'babel-polyfill',
      './script/index.js'
    ]
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(jpg|png|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }],
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
}
