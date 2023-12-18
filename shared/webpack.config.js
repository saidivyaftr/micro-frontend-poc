const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { FederatedTypesPlugin } = require('@module-federation/typescript');
const webpack = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require('path');

const pkg = require('./package.json');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      }, {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "src/raw")
        ],
        use: [
          { loader: "style-loader" },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              namedexport: true,
              camelcase: true,
              modules: true
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new CaseSensitivePathsPlugin(),
    new ModuleFederationPlugin({
    // new FederatedTypesPlugin({
    //   federationConfig: {
        name: 'components',
        filename: 'remoteEntry.js',
        exposes: {
          './Typography': './src/components/Typography',
          './Button': './src/components/Button',
          './Footer': './src/components/Footer',
          './Accordion': './src/components/Accordion',
          './Header': './src/components/Header',
          './UtilityNav': './src/components/UtilityNav',
        },
        shared: [{
          react: {
            singleton: true,
            requiredVersion: pkg.dependencies.react,
          }},
          {
            'react-dom': {
              singleton: true,
              requiredVersion: pkg.dependencies['react-dom'],
            },
          }
        ],
      // }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
