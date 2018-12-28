import axios from 'axios'
import config from "./../config/config.js"

class Drop {
    getDropMode (context) {
        if (!context.reference.element) {
            return
        }
        var sourceType = context.source.element.__designer
            ? context.source.element.__designer.type
            : 'undefined'
        var referenceType = context.reference.element.__designer
            ? context.reference.element.__designer.type
            : 'undefined'

        return sourceType + 'To' + referenceType.charAt(0).toUpperCase() + referenceType.slice(1)
    }

    onDrop (context) {
        var dropMode = this.getDropMode(context)
        if (!dropMode) {
            throw 'Drop.onDrop "targetType" not found'
        }
        var dropModeFunc = '__' + dropMode
        if (!this[dropModeFunc]) {
            throw 'Drop.onDrop function "' + dropModeFunc + '" not found'
        }
        console.log('Drop.onDrop : ' + dropModeFunc)
        this[dropModeFunc](context)
        // this.__dropUI(context)
    }
    buildQuery(cmd, params) {
        var res = ''
        for (var name in params) {
            res += '&' + name + '=' + params[name]
        }
        return config.apiUrl + cmd + '?' + res.slice(1)
    }
    getOwnedComponent (element) {
        if (!element.__designer) {
            throw 'Element "' + element.id + '" is not designable'
        }
        if (element.__designer.source) {
            return element
        }
        var rootGuid = element.__designer.root_guid
        var current = element.parentElement
        while (current) {
            if (current.__designer && current.__designer.guid == rootGuid) {
                return current
            }
            current = current.parentElement
        }
    }
    __dropUI (context) {
        var reference = context.reference
        var before = null
        if (reference.position === 'after') {
            before = reference.reverse
                ? reference.element
                : reference.element.nextElementSibling
        } else if (reference.position === 'before') {
            before = reference.reverse
                ? reference.element.nextElementSibling
                : reference.element
        }

        
        reference.element.parentElement.insertBefore(context.source.element, before)

        context.source.items.reverse().forEach(item => {
            for (let prop in item.state) {
                Object.assign(item.element[prop], item.state[prop])   
            }
        })
        context.source.element.style.backgroundColor = 'lightcoral'
    }

    __componentToTpl (context) { // __componentToTemplateNode
        var source = context.source.element
        var reference = context.reference
        var targetComponent = this.getOwnedComponent(reference.element)

        var url = this.buildQuery('insertComponent', {
            source: source.__designer.name,
            source_type: source.__designer.type,
            target: targetComponent.__designer.source + (reference.element === targetComponent ? '' : reference.element.__designer.path),
            target_position: reference.position,
            target_reverse: reference.reverse ? 'true' : false
        })
        console.log(location.origin + url + '\nURL:/' + url.trim().replace(/[&?]/g, '\n    ').replace(/[=]/g, '  =  '))
        axios.get(url)
    }

    __tplToTpl (context) {
        var source = context.source.element
        var reference = context.reference
        var sourceComponent = this.getOwnedComponent(source)
        var targetComponent = this.getOwnedComponent(reference.element)

        if (!targetComponent) {
            throw new Error('Target Component for "' + reference.element.id + '" not found')
        }
        if (!sourceComponent) {
            throw new Error('Source Component for "' + reference.element.__designer.owner.id + '" not found')
        }

        var routeComponents = context.route.matched[0].components
        var targetPagePlace = null
        for (var routeComponentName in routeComponents) {
            if (routeComponents[routeComponentName].options.__file == targetComponent.__designer.source) {
                targetPagePlace = routeComponentName
                break
            }
        }

        var url = this.buildQuery('move', {
            source: sourceComponent.__designer.source + source.__designer.path,
            target: targetComponent.__designer.source + (reference.element === targetComponent ? '' : reference.element.__designer.path),
            target_position: reference.position,
            target_reverse: reference.reverse ? 'true' : false,
            page_component: routeComponents.default.options.__file,
            page_place: targetPagePlace
        })
        console.log(location.origin + url + '\nURL:/' + url.trim().replace(/[&?]/g, '\n    ').replace(/[=]/g, '  =  '))
        axios.get(url)
    }
}

export default Drop
