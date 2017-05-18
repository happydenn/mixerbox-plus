const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const bannerText = fs.readFileSync('./banner.txt', 'utf-8');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dev'),
    filename: 'mixerbox-plus.user.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    filename: 'mixerbox-plus.user.js',
  };

  delete module.exports['devtool'];

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}

module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.BannerPlugin({
    banner: bannerText,
    raw: true,
    entryOnly: true,
  }),
]);
