// webpack.config.base.js
/* eslint-disable */
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require('os');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: getAbsolutePath('dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '...'],
    alias: {
      '@components': getAbsolutePath('src/components/'),
      '@pages': getAbsolutePath('src/pages/'),
      '@styles': getAbsolutePath('src/styles/'),
      '@actions': getAbsolutePath('src/actions/'),
      '@reducers': getAbsolutePath('src/reducers/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      template: getAbsolutePath('public/index.html'),
      inject: true,
      hash: true,
      favicon: 'public/assets/favicon.ico',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.resolve(process.cwd(), 'build/**/*'),
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    port: 3001,
    hot: 'only',
    compress: true,
    historyApiFallback: true,
    open: true,
    client: {
      overlay: true,
    },
    devMiddleware: {
      writeToDisk: true,
      index: 'index.html',
    },
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
  },
};
