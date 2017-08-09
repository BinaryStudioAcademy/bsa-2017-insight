const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: './src/main.jsx',
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
            presets: ['env', 'es2015', 'react'],
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
};
