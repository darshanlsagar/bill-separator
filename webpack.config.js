
var webpack = require('webpack');

module.exports = {
    entry:  __dirname + "/src/index.jsx",
    output: {
      path: __dirname + "/public",
      filename: "bundle.js"
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }]
    },
    plugins : [
      new webpack.EvalSourceMapDevToolPlugin()
    ]
  }