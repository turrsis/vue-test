var userConfig = require("./plugins/designer/config/config.js").default

export default {
    build: {
        babel: {
            presets({ isServer }) {
                return [
                    [ "@nuxt/babel-preset-app", {
                        useBuiltIns: "entry"
                    } ]
                ]
            }
        },
        extend (config, { isDev, isClient, isServer, loaders: { vue } }) {
            if (isClient) {
                config.devtool = userConfig.dev.devtool
            } else if (isServer) {
                for (var testName in userConfig.compiler) {
                    for (let i = 0; i < config.module.rules.length; i++) {
                        let rule = config.module.rules[i]
                        if (rule.test.source.indexOf(testName) != -1) {
                            rule.options = Object.assign({}, rule.options, userConfig.compiler[testName])
                            if (rule.options.compilerOptions && rule.options.compilerOptions.directives && rule.options.compilerOptions.directives.designer) {
                                rule.options.compilerOptions.directives.designer = rule.options.compilerOptions.directives.designer.bind(this)
                            }
                            break
                        }
                    }
                }
            }
        }
    },
    plugins: [
        { src: '~/plugins/designer/index.js'}
    ],
    serverMiddleware: [
        { path: '/api/designer', handler: '~/plugins/designer/serverMiddleware/api/designer/index' },
    ],
    router: {
        extendRoutes(routes, resolve) {
            var userRoutes = Object.assign({}, userConfig.routes)
            var rootPath = resolve(process.cwd())
            for (let i in routes) {
                var route = routes[i]
                var componentPath = route.component || route.components.default
                var userRoute = userRoutes[componentPath.substr(rootPath.length + 2).replace(/\\\\/g, '\\')]
                if (!userRoute) {
                    continue
                }
                route = Object.assign(route, {
                    components: {
                        default: route.component
                    },
                    chunkNames: {
                        default: route.chunkName
                    }
                })
                for (var userComponentName in userRoute.components) {
                    if (userComponentName == 'default') {
                        continue
                    }
                    var userComponentPath = resolve(
                        __dirname,
                        userRoute.components[userComponentName] || userConfig.routesConfig.emptyRoute
                    )
                    route.components[userComponentName] = userComponentPath
                    route.chunkNames[userComponentName] = userComponentPath.substr(rootPath.length + 2, userComponentPath.length - rootPath.length - 6).replace(/\\\\/g, '_')
                }
            }
        }
    }
}