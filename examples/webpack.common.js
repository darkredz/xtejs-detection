const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1500,
    ignored: /node_modules/
  },
  entry: {
    index: './src/index.js',
    detectFaceOfWebcam: './src/detectFaceOfWebcam.js',
    detectFaceInVideo: './src/detectFaceInVideo.js',
    detectFaceInImage: './src/detectFaceInImage.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './webfonts',
              publicPath: './webfonts'
            }
          }
        ]
      }
      // {
      //   test: /\.(gif|png|jpg|jpeg|eot|wof|woff|woff2|ttf|svg)$/,
      //   use: 'url-loader'
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin([
      { from: 'src/images/', to: 'images/' },
      { from: 'node_modules/xtejs-detection/dist/models/', to: 'models/' }
    ]),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          // test: (() => new RegExp([
          //   'node_modules/bootstrap/dist/js/bootstrap.min.js',
          //   'node_modules/jquery/dist/jquery.js',
          //   'node_modules/js-cookie/src/js.cookie.js',
          //   'node_modules/moment/min/moment.min.js',
          //   'node_modules/popper.js/dist/popper.min.js',
          //   'node_modules/xtejs-utils/dist/build.js',
          //   'node_modules/xtejs-detection/dist/build.js'
          // ].map(module => module.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')))(),
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    }
  },
  resolve: {
    modules: [ 'node_modules' ],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: [
      '.css',
      '.js'
    ]
  },
  performance: {
    hints: false
  }
}