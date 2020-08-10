const path = require('path');

module.exports = {
  entry: './src/match-height.js',
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: './docs',
    watchContentBase: true,
  },
  output: {
    filename: 'match-height.js',
    path: path.resolve(__dirname, 'docs'),
    library: 'MatchHeight',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};
