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
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
        use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    /* 图片大小小于10000字节限制时会自动转成 base64 码引用，可以减少http请求*/
                    name: 'images/[hash:8].[name].[ext]'
                }
            },
            /*对图片进行压缩*/
            {
                loader: 'image-webpack-loader',
                query: {
                    progressive: true,
                    optimizationLevel: 7,
                    interlaced: false,
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    webp: {
                        quality: 75 //将png文件压缩成webp格式
                    }
                }
            }
        ]
    }
    ]
  },
  mode: 'production',
};