const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./webpack.config.commonPath');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const WorkBoxPlugin = require('workbox-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.js', '.jsx', '.json'],
    },
    devtool: 'source-map',
    module: {
        noParse: /node_modules\/dist/,
        rules: [
            {
                test: /\.(jsx?|tsx?|ts?|js?)$/,
                loader: 'happypack/loader?id=happy-babel-ts',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HappyPack({
            id: 'happy-babel-ts',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            ],
            threadPool: happyThreadPool,
            verbose: true,
        }),
        new HardSourceWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '配置页面title',
            template: paths.appHtml,
            inject: false,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            },
            hash: true
        }),
        new WorkBoxPlugin.GenerateSW({
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    handler: "StaleWhileRevalidate",
                    options: {
                        cacheName: "images",
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60
                        },
                        backgroundSync: {
                            name: "queue",
                            options: {
                                maxRetentionTime: 60 * 60
                            }
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                            headers: {"x-test": "true"}
                        },
                        broadcastUpdate: {
                            channelName: "update"
                        },
                        fetchOptions: {
                            mode: "no-cors"
                        },
                        matchOptions: {
                            ignoreSearch: true
                        }
                    }
                }
            ],
            skipWaiting: false,
            clientsClaim: false,
            cacheId: "work-webpack-plugin",
            offlineGoogleAnalytics: true
        }),
    ],
};
