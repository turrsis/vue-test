'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

var preLoader = require.resolve(process.cwd() + "/src/plugins/designer/pre-loader.js")
var preLoaderModule = require.resolve(process.cwd() + "/src/plugins/designer/pre-loader-module.js")
//var preLoader = require.resolve(process.cwd() + "./src/plugins/designer/pre-loader.js")

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  preLoaders: {
    html: preLoader
  },
  compilerOptions: {
    modules: [
      preLoaderModule
    ]
  },
  compilerModules: [
    preLoaderModule
  ]
}
