const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  module: {
      rules: [{
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/dist/'
  }
};