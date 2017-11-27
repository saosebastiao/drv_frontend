//https://webpack.github.io/docs/webpack-dev-server.html
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const BACKEND =
  process.env.BACKEND === "local"
    ? "localhost:9000"
    : "getdrover.com/api";
console.log(`BACKEND: ${BACKEND}`);

module.exports = {
  entry: {
    index: ["./src/index.tsx"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "postcss-loader", // runs autoprefixer
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              sourceMap: true,
              includePaths: ["node_modules/bulma"]
            }
          }
        ]
      },
      { test: /\.(ttf|eot)$/, loader: "file-loader" },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: "url-loader?limit=10000"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    modules: ["src", "node_modules"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest" //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    https: true,
    historyApiFallback: {
      index: "/"
    },
    proxy: {
      "/api": {
        target: `http://${BACKEND}`,
        pathRewrite: { "^/api": "" },
      },
      "/ws": {
        target: `ws://${BACKEND}`,
        pathRewrite: { "^/ws": "" },
        ws: true
      }
    }
  }
};
