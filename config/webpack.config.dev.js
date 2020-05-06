const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const {appDevIndex, appDevFile} = require("./webpack.config.commonPath");

module.exports = merge.smart(commonConfig, {
    mode: 'development',
    entry: {
        app: [
            appDevIndex,
            `webpack-hot-middleware/client?path=/__webpack_hmr&reload=true`,
        ],
    },
    output: {
        publicPath: '/static/js/',
        path: appDevFile,
        filename: 'bundle.js',
        hotUpdateChunkFilename: '.hot/hot-update.js',
        hotUpdateMainFilename: '.hot/hot-update.json',
    },
    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: 'even-[hash:base64:8]'
                            }
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                            modules: true,
                        },
                    }],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: './assets/[name].[ext]',
                    limit: 25000,
                }
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
});
