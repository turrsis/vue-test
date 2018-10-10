var config = {
    onMountedCallback: () => {}
}

function tmpSetDebugAttribute (element, attrName, attrValue) {
    var tmp = Object.assign(attrValue)
    if (tmp.root) {
        tmp.root = tmp.root.id
    }
    element.setAttribute(attrName, JSON.stringify(tmp))
}

function componentChildsReqursiveIterator (element, root, callback) {
    if (element.hasAttribute('d-path')) {
        element.__designer = element.__designer || {}
        element.__designer.path = element.attributes['d-path'].value
        element.removeAttribute('d-path')
    }
    if (element.__designer) {
        tmpSetDebugAttribute(element, 'X-DEBUG', element.__designer)
        callback(element, root)
    } else {
        tmpSetDebugAttribute(element, 'X-XXXXX', {})
    }

    for (let i = 0; i < element.children.length; i++) {
        componentChildsReqursiveIterator(
            element.children[i],
            root,
            callback
        )
    }
}

function componentOnMounted (component) {
    var element = component.$el
    if (!element.hasAttribute('d-designer')) {
        if (element.hasAttribute('d-designer-outer')) {
            element.removeAttribute('d-designer-outer')
        }
        return
    }

    var dir = JSON.parse(element.attributes['d-designer'].value)
    var dirOuter = element.hasAttribute('d-designer-outer')
        ? JSON.parse(element.attributes['d-designer-outer'].value)
        : {}

    element.removeAttribute('d-designer')
    element.removeAttribute('d-designer-outer')

    dirOuter.arg = Object.assign(dir.arg || {}, dirOuter.arg || {})
    dirOuter.modifiers = Object.assign(dir.modifiers || {}, dirOuter.modifiers || {})
    element.__designer = Object.assign(dir, dirOuter, {
        source: component.$options.__file
    })

    componentChildsReqursiveIterator(element, null, config.onMountedCallback)
}

function componentOnDestroy (component) {

}

export default {
    config,
    componentOnMounted,
    componentOnDestroy
}
