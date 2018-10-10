import AbstractStrategy from '@/plugins/designer/dnd/dropStrategies/abstract.js'

class ServerTemplateDropStrategy extends AbstractStrategy {
    canServeTarget (context) {
        return context.target.__designer && context.source.__designer
    }

    onDrop (context) {
        var source = context.source
        var target = context.target
        var sourceComponent = this.getComponentForElement(source)
        var targetComponent = this.getComponentForElement(target)
        if (!targetComponent) {
            throw new Error('Target Component for "' + target.id + '" not found')
        }
        this._logContext(
            'onDrop     => ',
            context,
            '\n         source: ' + (sourceComponent ? sourceComponent.__designer.source : 'null') + ' // ' + (source.__designer ? source.__designer.path : 'null') +
            '\n         target: ' + (targetComponent ? targetComponent.__designer.source : 'null') + ' // ' + (target.__designer ? target.__designer.path : 'null') +
            ' // ' + (context.reference.element ? context.reference.element.id : 'null') + ' (' + context.reference.position + ')')

        var before = null
        if (context.reference.position === 'after') {
            if (context.reference.reverse) {
                before = context.reference.element
            } else {
                before = context.reference.element.nextElementSibling
            }
        } else if (context.reference.position === 'before') {
            if (context.reference.reverse) {
                before = context.reference.element.nextElementSibling
            } else {
                before = context.reference.element
            }
        } else if (context.reference.position === 'internal') {
            before = null
        }
        source.style.backgroundColor = 'lightcoral'
        target.insertBefore(source, before)
    }

    getComponentForElement (element) {
        if (!element.__designer) {
            return
            // throw new Error('Element ' + element.id + ' MUST contain the "__designer" property')
        }

        var current = element
        var currentPath = current.__designer.path
        currentPath = currentPath.split('/').slice(0, -1).join('/')
        while (current.parentNode) {
            let parent = current.parentNode
            if (!parent.__designer) {
                current = parent
                continue
            }
            if (currentPath === '' && parent.__designer.isComponent) {
                return parent
            }
            if (currentPath !== (parent.__designer.path || '')) {
                current = parent
                continue
            }
            currentPath = currentPath.split('/').slice(0, -1).join('/')
            current = parent
        }
    }
}
export default new ServerTemplateDropStrategy()
