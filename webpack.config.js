const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return 'source-map';
  }

  return false;
}

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: './dist/[name].js'
  },
  devtool: getDevTool(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/main.css',
    }),
    new CopyWebpackPlugin([
      { from: 'robots.txt', to: 'dist/' },
      { from: 'index.html', to: 'dist/' },
    ], { copyUnmodified: true })
  ]
};
