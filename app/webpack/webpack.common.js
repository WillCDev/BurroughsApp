const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const babelConfig = require('../.babelrc.json')

const fromCWD = (relPath) => path.resolve(process.cwd(), relPath)
const BUILD_DIR = fromCWD('./app/dist')
const APP_DIR = fromCWD('./app/src')
const ASSETS_DIR = fromCWD('./app/public')
const MODULES_DIR = fromCWD('./node_modules')

module.exports = {
  target: 'web',
  entry: { app: APP_DIR },
  output: {
    path: BUILD_DIR,
    chunkFilename: 'js/[name].[contenthash].js',
    filename: 'js/[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /^((?!\.test\.).)*\.(ts|js)x?$/,
        include: APP_DIR,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
      {
        test: /\.(less|css)$/,
        include: [APP_DIR, MODULES_DIR],
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: { localIdentName: '[name]__[local]__[hash:base64:5]' }
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: [autoprefixer] },
            },
          },
          { loader: 'less-loader' },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    modules: [APP_DIR, ASSETS_DIR, MODULES_DIR],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${ASSETS_DIR}`,
          to: `${BUILD_DIR}/assets`,
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      meta: { robots: 'noindex' },
      templateParameters: {
        faviconPath: `assets/images/favicon.png`,
      },
      template: fromCWD(`./app/src/index.html`),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          maxSize: 244000,
          reuseExistingChunk: true,
        },
        app: {
          name: 'app',
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  stats: 'minimal'
}
