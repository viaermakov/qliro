const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: ["./src/index.js"],
  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].bundle.js",
    chunkFilename: "[id].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".svg"],
    alias: {
      src: path.resolve(__dirname, "../src"),
      components: path.resolve(__dirname, "../src/components"),
      model: path.resolve(__dirname, "../src/model"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "chulakov test app",
      template: "./public/index.html",
      filename: "index.html",
      jsExtension: ".gz",
    }),
  ],
};
