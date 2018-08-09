const path = require("path");

module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: "awesome-typescript-loader" } },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  devtool: "source-map"
};
