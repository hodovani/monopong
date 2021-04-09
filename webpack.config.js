const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'MONOPONG',
    template: 'src/index.html'
  })],
  devServer: {
    contentBase: './dist',
  },
};