module.exports = function(env) {
  return require(`./webpack.${env}.config.js`)
}



// var path = require("path");
// var webpack = require("webpack");
//
// module.exports = {
//     entry: {
//         app:[
//             'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
//             'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
//             './app/main' // Your appʼs entry point
//         ]
//     },
//     output: {
//         path: path.resolve(__dirname, "build"),
//         publicPath: "/assets/",
//         filename: "bundle.js"
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin()
//     ],
//     loaders: [{
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: "babel",
//         include: __dirname,
//         query: {
//             presets: [ 'es2015' ]
//         }
//     }]
// };
