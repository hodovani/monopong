const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/monopong'
  },
  plugins: [
    new HtmlWebpackPlugin({
    title: 'MONOPONG',
    template: 'src/index.html'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    contentBase: './src',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1, modules: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env"
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  }
};