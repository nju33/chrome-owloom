const path = require('path');

module.exports = {
  entry: './src/scripts/background.js',
  output: {
    path: path.resolve('extension/scripts'),
    filename: 'background.bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        options: {
          presets: ["env"]
        }
      }
    ]
  }
}
