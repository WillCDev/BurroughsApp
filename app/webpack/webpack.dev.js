const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const config = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // inline: true,
    port: 9003,
    historyApiFallback: true,
    client: {
      overlay: { errors: true, warnings: false },
    },
  },
})

// Turn off minimizing for dev builds
config.optimization.minimizer = []

module.exports = config
