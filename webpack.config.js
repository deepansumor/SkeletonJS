const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/skeleton.ts',
  output: {
    filename: 'skeleton.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: 'SkeletonJS',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this",
    libraryExport: 'default',
  },
  
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      // TypeScript handling
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // LESS handling
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate file
          'css-loader',   // Translates CSS into CommonJS
          'less-loader'   // Compiles LESS to CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'skeleton.css', // Output CSS file in dist
    }),
  ],
  devtool: 'source-map',
};
