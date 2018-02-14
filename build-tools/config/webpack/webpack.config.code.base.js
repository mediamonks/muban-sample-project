/**
 * Webpack config to compile production bundle
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../index');

const {
  getStyleRules,
  getCodeRules,
  getHandlebarsRules,
} = require('./webpack-helpers');

const projectRoot = path.resolve(__dirname, '../../../');

module.exports = merge(require('./webpack.config.base'), {
  entry: {
    common: [
      './src/app/polyfills.js',
      'modernizr',
      './src/app/component/layout/app/app.hbs',
    ],
    bundle: [
      './src/app/bundle.js',
      './src/app/dist.js',
    ],
  },
  resolve: {
    extensions: ['.hbs', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      ...getHandlebarsRules({ development: false, buildType: 'code'}),
      ...getCodeRules(),
      ...getStyleRules({ development: false }),
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        // copy files to public root (not versioned)
        context: config.dist.staticPath,
        from: '**/*',
        to: config.buildPath,
      },
      {
        // copy over hbs templates
        context: path.resolve(projectRoot, 'src/app/component'),
        from: '**/*.hbs',
        to: path.resolve(config.distPath, 'templates'),
      },
      {
        // copy over component json
        context: path.resolve(projectRoot, 'src/app/component'),
        from: '**/*.json',
        to: path.resolve(config.distPath, 'data/component'),
      },
      {
        // copy over data json
        context: path.resolve(projectRoot, 'src/data'),
        from: '**/*.json',
        to: path.resolve(config.distPath, 'data'),
      },
      {
        // copy over readme
        context: path.resolve(projectRoot, 'docs'),
        from: 'dist-implementation-guide.md',
        to: path.resolve(config.distPath),
      },
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',

      minChunks: function(module){
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new ExtractTextPlugin({
      filename: 'asset/[name].css',
      allChunks : true,
    }),
  ]
});
