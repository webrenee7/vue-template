const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV && process.env.NODE_ENV.indexOf('production') >= 0;

let config = {
    entry: {
        app: path.join(__dirname, 'source/app/app.js'),
        vendor: [
            'moment',
            'jquery',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/',                                 // 设置引入静态资源(image)的目录
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        { loader: 'sass-loader' }
                    ]
                }),
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'main.[contenthash].css' }),
        new HtmlWebpackPlugin({ template: './source/index.html' }),
        new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({ compress: env, warning: env }),
    ],
    resolve: {
        alias: {
            other: path.join(__dirname, 'source/other')
        },
        extensions: ['.js', '.jsx'],
        modules: [path.join(__dirname, 'source'), 'node_modules']
    }
};

if (env) {
    // 生成环境
    config = webpackMerge(config, {
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: "[name].[chunkhash].js",                 // 按需加载（异步）模块 require.ensure || import()
        },
        plugins: [
            new webpack.DefinePlugin({                              // 去除 React Warning 提示
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),
        ]
    })
} else {
    // 开发环境
    config = webpackMerge(config, {
        devtool: 'eval',
        output: {
            filename: '[name].js',
            chunkFilename: "[name].js",                             // 按需加载（异步）模块 require.ensure || import()
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ],
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            port: 7777,
            host: 'localhost',
            hot: true,
            inline: true,
            filename: '[name].js',
            historyApiFallback: true,
            publicPath: '/assets/',
            // proxy: {
            //     "/api": {
            //         target: "http://localhost:8075",
            //         secure: false
            //     }
            // }
        }
    })
}

module.exports = config;
