const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv()
  ],
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
        {
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto', // Use 'javascript/auto' to avoid "System.import()" deprecation warning
        },
    ],
  },
};