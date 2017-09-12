const path = require('path');
const webpack = require('webpack');

module.exports = [{
  devtool: 'eval-source-map',
  entry: ['whatwg-fetch', './src/main.jsx'],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  context: `${__dirname}/frontend`,
  devServer: {
    contentBase: 'public',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './frontend/src'),
    },
    extensions: ['.js', '.jsx'],
    modules: ['./node_modules'],
    symlinks: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: false,
        },
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react', 'stage-3'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['file-loader?name=[name].[ext]', 'image-webpack-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}, {
  devtool: 'eval-source-map',
  entry: ['whatwg-fetch', './src/components/insightWidget/insightWidget.jsx'],
  output: {
    path: `${__dirname}/dist/resources/widget`,
    filename: 'insight-widget.js',
  },
  context: `${__dirname}/frontend`,
  devServer: {
    contentBase: 'public',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './frontend/src'),
    },
    extensions: ['.js', '.jsx'],
    modules: ['./node_modules'],
    symlinks: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: false,
        },
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react', 'stage-3'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['file-loader?name=[name].[ext]', 'image-webpack-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}];
