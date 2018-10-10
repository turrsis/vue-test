import AbstractStrategy from '@/plugins/designer/dnd/dragStrategies/abstract.js'

class DefaultStrategy extends AbstractStrategy {
    // Detects if context can be inserted.
    acceptReference (context) {
        if (!context || !context.reference.orientation) {
            return null
        }
        if (context.reference.orientation === 'internal') {
            return true
        }
        if (context.reference.gap > 0 && context.reference.gap >= 20) {
            return null
        }
        if (!context.reference.element.previousElementSibling && !context.reference.element.nextElementSibling) { // Only One Element
            return true
        }
        function getOrientation (current, near) {
            if (near === 'prev-prev') {
                current = current.previousElementSibling
                near = current ? current.previousElementSibling : null
            } else if (near === 'next-next') {
                current = current.nextElementSibling
                near = current ? current.nextElementSibling : null
            }
            if (!current || !near) {
                return null
            }
            if (near.offsetLeft < current.offsetRight && (near.offsetLeft + near.offsetWidth) > current.offsetLeft) {
                return 'column'
            } else if (near.offsetTop < current.offsetBottom && (near.offsetTop + near.offsetHeight) > current.offsetTop) {
                return 'row'
            }
            return 'corner'
        }

        var prevOrient = getOrientation(context.reference.element, context.reference.element.previousElementSibling)
        var nextOrient = getOrientation(context.reference.element, context.reference.element.nextElementSibling)

        if (context.reference.orientation === 'top' || context.reference.orientation === 'bottom') {
            // ------------------------------------------------------------------------------------
            if (prevOrient === 'column') {
                if (nextOrient !== 'row') {
                    return true
                }
            } else if (prevOrient === null) {
                if (nextOrient === 'column') {
                    return true
                }
            } else if (prevOrient === 'corner') {
                if (nextOrient === 'column') {
                    return true
                } else if (nextOrient === null && getOrientation(context.reference.element, 'prev-prev') === 'column') {
                    return true
                }
            }
            // ------------------------------------------------------------------------------------
        } else if (context.reference.orientation === 'left' || context.reference.orientation === 'right') {
            // ------------------------------------------------------------------------------------
            if (nextOrient === 'row' || prevOrient === 'row') {
                return true
            } else if (nextOrient === null) {
                if (prevOrient === 'corner' && getOrientation(context.reference.element, 'prev-prev') === 'row') {
                    return true
                }
            } else if (nextOrient === 'corner') {
                if (prevOrient === 'corner' && getOrientation(context.reference.element, 'prev-prev') === 'row') {
                    return true
                }
                if (prevOrient === null && getOrientation(context.reference.element, 'next-next') === 'row') {
                    return true
                }
            }
            // ------------------------------------------------------------------------------------
        }
        return false
    }
}

export default new DefaultStrategy()
