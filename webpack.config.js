//================
// Import webpack
//================
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//================
// This is the complicated part, where we'll be configuring our
// webpack file to work with our application.
//================
module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  debug: true,
  devtool: "#eval-source-map",
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css'),
        options: {minimize: true}
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
    new ExtractTextPlugin('src/stylesheet/app.css', { allChunks: true })
  ]
};
