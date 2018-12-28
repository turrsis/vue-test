const fs = require('fs')
const utils = require(__dirname + '/../../../utils.js').default
const config = require(__dirname + '/../../../config/config.js').default

class ConfigEditor {
    editRoute (componentPath, value) {
        var routesConfigRaw = fs.readFileSync(config.routesConfig.configFile, 'utf8')
        routesConfigRaw = routesConfigRaw
            .substr(routesConfigRaw.indexOf('{'))
            .replace(/\r/g, '')
            .replace(/\n/g, '')
            .replace(/[']/g, '"')
            .replace(/[ ]/g, '')
        var routesConfig = JSON.parse(routesConfigRaw)
        if (routesConfig.routes[componentPath]) {
            routesConfig.routes[componentPath] = utils.objectAssignDeep({}, routesConfig.routes[componentPath], value)
        }
        var routesConfigRaw2 = 'export default ' + JSON.stringify(routesConfig, null, '    ')
        fs.writeFileSync(config.routesConfig.configFile, routesConfigRaw2)
        return routesConfig
    }
}

module.exports = new ConfigEditor()
