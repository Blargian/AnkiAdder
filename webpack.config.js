const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {

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