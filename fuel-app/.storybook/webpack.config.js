var path = require('path')
const webpackConfigAlias = require('../webpack-config-alias').aliases

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    loaders: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      {
        loader: 'sass-loader',
        options: {
          additionalData: '$env: STORYBOOK;',
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.(tsx|js|jsx)$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  })
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./'),
  ]
  config.resolve.alias = {
    ...config.resolve.alias,
    ...webpackConfigAlias(path.resolve(__dirname, '../')),
  }
  return config
}
