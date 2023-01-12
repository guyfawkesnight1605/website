const path = require('path')
const base = require('./webpack_config')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const PrerenderSPAPlugin = require('prerender-spa-plugin-next')

module.exports = (env, argv) => merge( base(env, argv), {

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },

    plugins: [
        new CompressionPlugin(),
        new TerserPlugin(),
        new PrerenderSPAPlugin({

            routes: [ '/', '/articles', '/how-to-access-the-dark-web', '/how-to-access-the-deep-web', '/how-to-access-darknet', '/tor-dark-web', '/dark-web-browser'],

            //The options to pass to the renderer class's constructor
            rendererOptions: {
                // Optional - The name of the property to add to the window object with the contents of `inject`.
                injectProperty: '__PRERENDER_INJECTED',
                maxConcurrentRoutes: 4,
                renderAfterDocumentEvent: "render-event",
                renderAfterElementExists: '#website',
            },

            postProcess: function (context) {
                context.html = context.html.replace(
                    /<script src="w3counter">/i,
                    `<script type="text/javascript" src="https://www.w3counter.com/tracker.js?id=148062">`
                )
            }

        }),
    ]

});
