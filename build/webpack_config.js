const path = require('path');
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('../src/config')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {

    const isProd = argv.mode === "production"

    return {
        target: 'web',
        mode: 'production',

        devtool: false,

        entry:[
            "./src/main.js",
        ],

        output: {
            path: path.resolve(__dirname, './../dist'),
            publicPath: '/',
            filename: 'bundle.js',
            clean: true,
        },

        resolve: {
            extensions: [ '.js', '.vue' ],
            alias: {
                src: path.resolve(__dirname + '/../src'),
            },
            fallback: {
                fs: false,
                assert: false,
                crypto: false,
                stream: false,
                util: false,
                http: false,
                https: false,
                net: false,
                path: false,
                tls: false,
                zlib: false,
                buffer: false,
                child_process: false,
                dgram: false,
                uws: false,
                os: false,
            }
        },
        module: {
            rules: [{
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                use: [ {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[contenthash].[ext]',
                        publicPath: '/',
                    },
                }],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: isProd,
                    preserveWhitespace: false,
                }
            }, {
                test: /\.css$/,
                use: [  'vue-style-loader', 'css-loader']
            }]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: "static", to: "static" }
                ],
            }),
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
                __VUE_I18N_FULL_INSTALL__: true,
                __VUE_I18N_LEGACY_API__: false,
                __INTLIFY_PROD_DEVTOOLS__: false,
            }),
            new HtmlWebpackPlugin({
                hash: true,
                name: config.name,
                title: config.title, //60
                description: config.description, //150
                keywords: config.keywords,
                url: config.url,
                img: config.url + config.img.replace(/^\/|\/$/g, ''),
                template:  path.resolve(__dirname + '/../src/index.hbs'),
                filename: path.resolve(__dirname + `/../dist/index.html`) //relative to root of the application
            }),
            new VueLoaderPlugin(),
        ],
    }
}