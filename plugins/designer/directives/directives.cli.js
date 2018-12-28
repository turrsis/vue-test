import utils from "./../utils.js"
import config from "./../config/config.js"

function setDEBUGAttribute (element) {
    if (element.__designer) {
        let sorted = {}
        if (element.__designer.guid) { sorted.guid = element.__designer.guid}
        if (element.__designer.root_guid) { sorted.root_guid = element.__designer.root_guid}
        //sorted.root_guid2 = getOwnedElement(element)
        if (element.__designer.path) { sorted.path = element.__designer.path}
        if (element.__designer.mode) { sorted.mode = element.__designer.mode}
        if (element.__designer.type) { sorted.type = element.__designer.type}

        element.setAttribute(config.directives.attrName, JSON.stringify(
            Object.assign({}, sorted, element.__designer),
            (key, value) => { return (value === undefined || key[0] === '_') ? undefined : value }
        ))
    } else {
        element.setAttribute('XXX', 'XXX')
    }
}

function getDesignAttribute(element) {
    if (element.__designer) {
        return element.__designer
    }
    if (!element.attributes || (!element.attributes[config.directives.attrName] && !element.attributes[config.directives.attrChilds])) {
        return null
    }

    element.__designer = Object.assign({},
        element.attributes[config.directives.attrName]
            ? JSON.parse(utils.decodeJSON(element.attributes[config.directives.attrName].value))
            : {},
        element.attributes[config.directives.attrChilds]
            ? JSON.parse(utils.decodeJSON(element.attributes[config.directives.attrChilds].value))
            : {}
    )

    element.removeAttribute(config.directives.attrName)
    element.removeAttribute(config.directives.attrChilds)

    return element.__designer
}

function getOwnedElement (element) {
    var root_guid = element.__designer.root_guid
    var parent = element
    while (parent.parentElement) {
        var parent__designer = getDesignAttribute(parent)
        if (parent__designer && parent__designer.guid == root_guid) {
            return '--' + root_guid + '--'
        }
        parent = parent.parentElement
    }
    return ''
}

function initElementCallback (component, element, designer, level) {
    if (designer && designer._initialized) {
        return false
    }
    if (!designer) {
        return
    }

    designer._initialized = true
    if (designer.guid) {
        designer.componentTag = component.$options._componentTag || 'ERROR'
        designer.source = component.$options.__file || 'ERROR'
    }
    setDEBUGAttribute(element)
}

function initElement (component, currentElement, level, callback) {
    var designer = getDesignAttribute(currentElement)
    for (let i = 0; i < callback.length; i++) {
        if (callback[i](component, currentElement, designer, level) === false) {
            return
        }
    }

    level = level + 1
    for (let i = 0; i < currentElement.children.length; i++) {
        initElement(component, currentElement.children[i], level, callback)
    }
}

function initComponent (component, callback) {
    if (component.$el.__designer) {
        return
    }

    if (!getDesignAttribute(component.$el)) {
        return
    }

    initElement(component, component.$el, 0, callback || [])
}

function destroyComponent (component) {

}

export default {
    initComponent,
    initElementCallback,
    destroyComponent,
    directives: {
        designer: {
            // bind: (el, binding, vnode, oldVnode) => { console.log('directives:designer:bind') },
            // inserted: function (el, binding, vnode, oldVnode) { console.log('directives:designer:inserted') },
            // update: function (el, binding, vnode, oldVnode) { console.log('directives:designer:update') },
            // componentUpdated: function (el, binding, vnode, oldVnode) { console.log('directives:designer:componentUpdated') },
            // unbind: function (el, binding, vnode, oldVnode) { console.log('directives:designer:unbind') },
        }
    }
}