const path = require("path");
const webpack = require("webpack");

// Common Configuration for SkeletonJS
const commonConfig = {
  entry: path.resolve(__dirname, "src", "skeleton.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "SkeletonJS",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this",
    libraryExport: "default",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

// Development Build Configuration for SkeletonJS
const devConfig = {
  ...commonConfig,
  mode: "development",
  output: {
    ...commonConfig.output,
    filename: "skeleton.js",
  },
 
};

// Production Build Configuration for SkeletonJS
const prodConfig = {
  ...commonConfig,
  mode: "production",
  output: {
    ...commonConfig.output,
    filename: "skeleton.min.js",
  },
  optimization: {
    minimize: true,
  }
};

// Export both configurations
module.exports = [devConfig, prodConfig];
