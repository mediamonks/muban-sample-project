/**
 * Webpack config to compile production bundle
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const config = require('../index');
const { addStandalone } = require('./webpack-helpers');

const {
  getESLintLoader,
  getTSLintLoader,
  getStyleLintPlugin,
} = require('./webpack-helpers');

const projectRoot = path.resolve(__dirname, '../../../');

const webpackConfig = merge(require('./webpack.config.code.base'), {
  entry: {
    'component/blog-post/blog-post': './src/app/component/block/blog-post/blog-post.hbs',
    'component/navigation/navigation': './src/app/component/block/navigation/navigation.hbs',
    'component/footer/footer': './src/app/component/block/footer/footer.hbs',
    'component/hero/hero': './src/app/component/block/hero/hero.hbs',
    'component/intro-content/intro-content': './src/app/component/block/intro-content/intro-content.hbs',
    'component/default-button/default-button': './src/app/component/element/default-button/default-button.hbs',
    'component/paragraph/paragraph': './src/app/component/element/paragraph/paragraph.hbs',
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
  module: {
    rules: [
      getESLintLoader(config.dist.enableESLintLoader),
      getTSLintLoader(config.dist.enableTSLintLoader),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dist.env,
    }),
    // new UglifyJSPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    //   generateStatsFile: true,
    //   statsFilename: path.resolve(config.distPath, 'bundlesize-profile.json'),
    // }),
    new ImageminPlugin({
      disable: !config.dist.enableImageOptimization,
      svgo: null,
      gifsicle: null,
      jpegtran: null,
      optipng: !config.dist.enablePNGQuant ? { optimizationLevel: 3 } : null,
      pngquant: config.dist.enablePNGQuant ? { quality: '65' } : null,
      plugins: [
        imageminMozjpeg({
          quality: 85,
          progressive: true
        })
      ],
    }),
    getStyleLintPlugin(config.dist.enableStyleLintPlugin),
  ].filter(_ => _),
});

module.exports = webpackConfig;
