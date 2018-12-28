import utils from "./../utils.js"
import config from "./../config/config.js"

function getNodeIndex(node) {
    if (node.parent) {
        for (let i = 0; i < node.parent.children.length; i++) {
            if (node.parent.children[i] === node) {
                return i
            }
        }
    }
    return null
}

function setNodeAttribute (node, name, value) {
    node.plain = false
    value = (typeof value == 'object')
        ? value = utils.encodeJSON(JSON.stringify(value, (key, value) => { return (value === undefined || key[0] === '_') ? undefined : value }))
        : value

    if (node.attrsMap[name] && node.attrs) {
        for (var i = 0, l = node.attrs.length; i < l; i++) {
            if (node.attrs[i].name === name) {
                node.attrs.splice(i, 1);
                break
            }
        }
    }
    
    node.attrs = node.attrs || []
    node.attrs.push({
        name: name,
        value: '"' + value + '"'
    })

    delete node.attrsMap[name]
    node.attrsMap[name] = value
}

function getDirective (node, name) {
    if (node.directives) {
        for (var i = 0; i < node.directives.length; i++) {
            if (node.directives[i].name === name) {
                return node.directives[i]
            }
        }
    }
}

function initNode(node, directiveContext) {
    if (directiveContext && directiveContext.modifiers && directiveContext.modifiers.layout && node.tag == 'nuxt') {
        setNodeAttribute(node, 'NNN', 'nnn')
    }
    if (node.type !== 1 || (node.__design && node.__design._initialized)) {
        return
    }

    var parentDesign = node.parent ? node.parent.__design : undefined
    if (parentDesign) {
        node.__design = Object.assign(node.__design || {}, {
            path: parentDesign.path + '/' + parentDesign._childIndex,
            root_guid: parentDesign._root.__design.guid,
            condition: ['if', 'elseif', 'else', 'for'].find(cond => node[cond]),
            type: 'tpl',
            _initialized: true,
            _root: parentDesign._root,
            _childIndex: 0,
            _isRealTemplate: node.tag == 'template' ? (node.children[0].parent === node) : null
        })

        if (parentDesign._isRealTemplate === true) {
            node.__design.tpl_path = parentDesign.path
        }
        if (node.__design._isRealTemplate !== false) {
            parentDesign._childIndex++
        }
    }
    // =================================================================
    const props = {
        'children': (el) => { return el },
        'ifConditions': (el) => { return el.block }
    }
    for (var prop in props) {
        if (!node[prop]) {
            continue
        }
        var iterator = node[prop]
        var resolver = props[prop]
        for (let i = 0; i < iterator.length; i++) {
            let child = resolver(iterator[i])
            if (child.type != 1) {
                continue
            }
            let childDirective = getDirective(child, config.directives.name)
            if (childDirective) {
                initDirective(child, childDirective)
            } else {
                initNode(child, directiveContext)
            }
        }
    }
    // =================================================================
    if (directiveContext.mode != 'editable' && !node.__design.directive) {
        return
    }
    //node.__design.ts = utils.stringTime()
    setNodeAttribute(
        node,
        node.__design.guid ? config.directives.attrName : config.directives.attrChilds,
        node.__design
    )
}
function initDirective (node, directive) {
    if (node.__design && node.__design._initialized) {
        return
    }

    node.__design = Object.assign(node.__design || {}, {
        path: '',
        directive: utils.normalizeDirective(directive),
    })
    if (!node.parent) {
        node.__design = Object.assign(node.__design, {
            guid: utils.guid(),
            _root: node,
            _childIndex: 0,
            _isRealTemplate: node.tag == 'template' ? (node.children[0].parent === node) : null
        })
    } else if (!node.__design._root) {
        var root = node
        var path = ''
        while (root.parent) {
            path = '/' + getNodeIndex(root) + path
            root = root.parent
        }
        root.__design = root.__design || {
            guid: utils.guid(),
        }
        node.__design._root = root
        node.__design.path = path
    }
    initNode(node, node.__design.directive)
    //return true
}
export default {
    designer: initDirective
}
