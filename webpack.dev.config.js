const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',

    entry: {
        app:[
            // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
            // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            './src/index.js' // Your appʼs entry point
        ]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: "/",
        sourceMapFilename: '[name].map'
    },

    devServer: {
        hot: true,
        port: 7777,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        contentBase: "./dist",
        stats: 'minimal',
        publicPath: "/assets/"
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    },

    plugins: [
        //new HtmlWebpackPlugin({inject:true,template:"src/layouts/default.html"}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
}
