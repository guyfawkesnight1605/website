const path = require('path')
const webpack = require('webpack')
const base = require('./webpack_config');
const merge = require('webpack-merge');

module.exports = (env, argv) => merge( base(env, argv), {

    devtool: 'eval-cheap-module-source-map',
    mode: 'development',

    entry: [
        'webpack-hot-middleware/client',
    ],

    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        port: 8081,
        static: path.resolve(__dirname, "./../dist"),
    },

    plugins: [
        new webpack.DefinePlugin({
            DEVSERV: true,
        })
    ]

});
