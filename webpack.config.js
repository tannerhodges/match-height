const path = require('path');

module.exports = {
  entry: './src/match-height.js',
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: './docs',
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-spread',
            ],
          },
        },
      },
    ],
  },
  output: {
    filename: 'match-height.js',
    path: path.resolve(__dirname, 'docs'),
    library: 'MatchHeight',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};
