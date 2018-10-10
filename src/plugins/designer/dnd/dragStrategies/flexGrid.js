import AbstractStrategy from '@/plugins/designer/dnd/dragStrategies/abstract.js'

class FlexGridStrategy extends AbstractStrategy {
    canServeTarget (context) {
        var style = getComputedStyle(context.target)
        return style.display === 'flex'
        // return true
    }
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
        var style = getComputedStyle(context.target)
        if (style.flexDirection === 'row' || style.flexDirection === 'row-reverse') {
            if (context.reference.orientation === 'left' || context.reference.orientation === 'right') {
                if (style.flexDirection === 'row-reverse') {
                    context.reference.reverse = true
                }
                return true
            }
        } else if (style.flexDirection === 'column' || style.flexDirection === 'column-reverse') {
            if (context.reference.orientation === 'top' || context.reference.orientation === 'bottom') {
                if (style.flexDirection === 'column-reverse') {
                    context.reference.reverse = true
                }
                return true
            }
        }
        return false
    }
}
export default new FlexGridStrategy()
