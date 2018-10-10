function normalizeDirective (directive, opt1, opt2) {
    if (!directive) {
        directive = {}
    } else if (typeof directive === 'string') {
        directive = JSON.parse(directive.replace(/[']/g, '"'))
    }

    if (!directive.value) {
        var dirValue = {}
    } else if (typeof directive.value === 'string') {
        var dirValue = JSON.parse(directive.value.replace(/[']/g, '"'))
    }
    return Object.assign(dirValue, {
        arg: directive.arg,
        modifiers: directive.modifiers
    }, opt1 || {}, opt2 || {})
}

function addNodeAttribute (node, name, value) {
    value = typeof value == 'object'
        ? JSON.stringify(value).replace(/["]/g, '\\\"')
        : value

    node.attrs = node.attrs || []
    node.attrs.push({
        name: name,
        value: '"' + value + '"'
    })
}

function injectPaths (node, index) {
    if (node.type !== 1) {
        return
    }

    node.plain = false
    // node.__path = node.tag + '?' + ('000000' + index).substr(-5)
    node.__path = /* node.tag + '?' + */
                  ((node.attrsMap && node.attrsMap['id']) ? node.attrsMap['id'] : ('000000' + index).substr(-5))
    if (node.parent) {
        node.__path = node.parent.__path + '/' + node.__path
    }

    if (index === null || index === undefined) {
        index = 0
        node.__path = ''
    } else {
        addNodeAttribute(node, 'd-path', node.__path)
    }
    if (node.children) {
        index = 0
        node.children.forEach(element => {
            injectPaths (element, index++)
        })
    }
}
function __logNodeProperties (node, prefix) {
    prefix = prefix ? prefix : ''
    if (node['tag']) {
        console.log(prefix + "--- tag : " + node['tag'] + "--------------------------------------------------------")
    }
    console.log(prefix + "   parent : " + (node['parent'] ? node['parent'].tag : 'null'))
    var th = typeof this
    console.log(prefix + "   this : " + th + '  class : ' + this.constructor.name)
    for(let p in node) {
        if (p === 'Qglobal' || p === 'process' || p === 'Buffer') {
            console.log('******************************************')
            console.log(prefix + p)
            __logNodeProperties(node[p], prefix)
            console.log('******************************************')
            continue
        }
        if (p != 'parent' && p != 'children') {
            try {
                console.log(prefix + '   ' + p + ' = ' + JSON.stringify(node[p]) + '')
            } catch (er) {
                console.log(prefix + '   ' + p + ' = ERROR')
            }
            
        }
    }
}
module.exports = {
    designer: function (node, dir) {
        // __logNodeProperties(node)
        if (node.parent) {
            addNodeAttribute(node,
                'd-designer-outer',
                normalizeDirective(dir)
            )
            return
        }

        addNodeAttribute(node,
            'd-designer',
            normalizeDirective(dir, {isComponent: true})
        )
        injectPaths(node)
    }
}