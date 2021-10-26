const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const commonConfig = require('./webpack.common')

const config = merge(commonConfig, {
  mode: 'production',
  devtool: 'eval',
  optimization: {
    minimize: true,
    sideEffects: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [new webpack.optimize.AggressiveMergingPlugin()],
})

module.exports = config
