const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');


//https://github.com/shakacode/bootstrap-loader/blob/master/examples/basic/webpack.bootstrap.config.js
module.exports = {
    devtool: '#cheap-module-eval-source-map',

    entry: {
        main: [
            'webpack-hot-middleware/client',
            'tether',
            'font-awesome-loader',
            'bootstrap-loader',
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
        stats: 'minimal',
        publicPath: "/"
    },

    module: {
        rules: [{
            test: /\.css/,
            use: [{
                    loader: 'style-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url-loader?limit=100',
        }, {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            use: 'file-loader',
        }, {
            test: /\.scss$/,
            use: [{
                    loader: 'style-loader',
                    options: {
                        sourceMap: false
                    }
                },{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },{
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false
                    }
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            //Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            //Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            //Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            //Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            //Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            //Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            //Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
    ]
}
