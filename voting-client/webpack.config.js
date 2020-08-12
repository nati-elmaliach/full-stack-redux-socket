module.exports = {
  entry: ["./src/index.js"],

  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "boundle.js",
  },
  devServer: {
    contentBase: "./dist",
  },
};
