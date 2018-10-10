import AbstractStrategy from '@/plugins/designer/dnd/dragStrategies/abstract.js'

class SortableListStrategy extends AbstractStrategy {
    canServeTarget (context) {
        return context.target.classList.contains('sortableList') || context.target.parentElement.classList.contains('sortableList')
    }
    shiftUpTarget (context) {
        return true
    }
    // Detects if context can be inserted.
    acceptReference (context) {
        return true
    }

    onDrag (context) {
        if (context === null || context.canDrop === null) {
            // this.hideMarker()
            return
        }
        AbstractStrategy.restoreSourceOriginal(context)
        var before = null
        if (context.reference.position === 'after') {
            before = context.reference.element.nextElementSibling
        } else if (context.reference.position === 'before') {
            before = context.reference.element
        } else if (context.reference.position === 'internal') {
            before = null
        }
        context.target.insertBefore(context.source, before)
    }

    showMarker (context) {
        super.showMarker(null)
    }
}
export default new SortableListStrategy()
