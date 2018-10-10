module.exports = {
    configureWebpack: {
      plugins: [
        //new MyAwesomeWebpackPlugin()
      ]
    },
    chainWebpack: config => {
        config.module
          .rule('vue')
          .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
              // изменение настроек...
              /* options.compilerOptions.modules = [
                require("./src/plugins/designer/ssr/compiler/modules.js")
              ]*/
              options.compilerOptions.directives = require("./src/plugins/designer/ssr/compiler/directives.js")
              return options
        })
    }
}