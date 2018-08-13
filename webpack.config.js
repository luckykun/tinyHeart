const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    compress: true, //服务器压缩
    open: true, //自动打开浏览器
    hot: true //热更新
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: './images'
      }
    ]),
    new ExtractTextWebpackPlugin({
      filename: 'index.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
      },
    }),
    new CleanWebpackPlugin(['./dist']),
  ],
  module: {
    rules: [ //从右往左写，解析顺序
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [{
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
    ]
  },
  mode: 'production',
};