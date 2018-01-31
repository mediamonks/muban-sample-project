/**
 * Webpack config used during development
 */
const path = require('path');
const merge = require('webpack-merge');
const config = require('../index');

const {
  getBabelLoaderConfig,
  getHbsInlineLoaderConfig,
  getESLintLoader,
  getTSLintLoader,
  getStyleLintPlugin,
} = require('../webpack/webpack-helpers');

const projectRoot = path.resolve(__dirname, '../../../');
const port = process.env.PORT || config.storybook.port;

module.exports = merge(require('../webpack/webpack.config.base'), {
  entry: {
    storybook: [
      './src/app/polyfills.js',
      './src/storybook/storybook.js',
      './build-tools/config/storybook/config.js',
    ],
    story: [
      './src/app/polyfills.js',
      './src/storybook/story.js',
      './build-tools/config/storybook/config.js',
    ],
  },
  output: {
    path: config.storybook.buildPath,
    publicPath: config.storybook.publicPath,
  },
  resolve: {
    extensions: ['.hbs', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /preset\.js$/,
        include: [
          /src[\/\\]app/,
        ],
        use: [
          {
            loader :'preset-loader',
            options: {},
          },
          getHbsInlineLoaderConfig(),
          getBabelLoaderConfig(),
        ]
      },
      getESLintLoader(config.storybook.enableESLintLoader),
      getTSLintLoader(config.storybook.enableTSLintLoader),
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
    ]
  },
  plugins: [
    getStyleLintPlugin(config.storybook.enableStyleLintPlugin),
  ].filter(_ => _),
});
