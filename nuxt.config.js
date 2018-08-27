const serveStatic = require('serve-static');
//const path require('path');

module.exports = {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        title: 'cms',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    build: {
        /*resolveLoader: {
            modules: [
                'node_modules',
                'modules'
            ]
        },*/
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        modules : ['a_d2']
                    }
                    /*enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'vue-loader',
                    exclude: /(node_modules)/,
                    options: {
                        loaders: {
                            js: 'eslint-loader',
                            html: 'eslint-loader'
                        }
                    }*/
                })
            }
            if (isDev) {
                /*config.module.rules.push({
                    test: /\.(vue)$/,
                    loader: 'vue-loader',
                    exclude: /(node_modules)/
                })*/
                /*config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(vue)$/,
                    loader: 'a_d1',
                    exclude: /(node_modules)/
                })*/
            }
        }
    },
    plugins: [
        { src: '~/plugins/_register_plugins.js'}
    ],
    /*serverMiddleware: [
        '~/api/designer'
    ]*/
    serverMiddleware: [
        // Will register redirect-ssl npm package
        //'redirect-ssl',

        // Will register file from project api directory to handle /api/* requires
        { path: '/api/designer', handler: '~/serverMiddleware/api/designer/index' },

        // We can create custom instances too
        //{ path: '/static2', handler: serveStatic(__dirname + '/static2') }
    ]
}

