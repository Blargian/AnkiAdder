const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {

  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev,next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: ['babel-polyfill','./src/app.js'],
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
        },
        {
        test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                              sourceMap: true
                            },
                        },
                        {
                          loader: 'resolve-url-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                              sourceMap: true,
                            }
                        },
                    ],
                  },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({filename: 'styles.css'}),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/public',
      lazy: false,
      liveReload: true,
      writeToDisk: true
    },
  }
};