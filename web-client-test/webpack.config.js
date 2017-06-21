const path = require('path')
const webpack = require('webpack')
const PROD = false

module.exports = {
  entry: './app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },

  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ] : [],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'env',
          ],
        },
      },
      { test: /\.css$/, loader: 'style!css' }
    ],
  },
}

