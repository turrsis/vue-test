import config from "./../config/config.js"

class DragOver {
    detectUIType (context) {
        if (!context.reference.element) {
            return
        }
        if (context.reference.cssStyle.display === 'flex') {
            return 'flexGrid'
        }
        return 'css'
    }

    onDragOver (context, target) {
        var reference = this.getReference(context, context.x, context.y)

        if (context.target !== target) {
            context.setTarget(target)
            context.config = this.getDirectiveConfig(this.target)
        }
        context.referenceChanged = false
        
        if (context.reference.element !== reference.element || context.reference.side != reference.side) {
            context.setReference(reference)
            context.referenceChanged = true
        } else {
            return context.dragOverResult
        }
        if (!context.reference.element) {
            return context.dragOverResult = null
        }
        context.reference.cssStyle = getComputedStyle(context.reference.element.parentElement)

        var uiType = this.detectUIType(context)
        if (!uiType) {
            return context.dragOverResult = null
        }
        
        var compareElement = null
        if (reference.side === 'internal') {
            return context.dragOverResult = true
        }

        if (reference.position == 'before') {
            compareElement = reference.element.previousElementSibling && reference.element.previousElementSibling.__designer ? reference.element.previousElementSibling : null
        } else if (reference.position == 'after') {
            compareElement = reference.element.nextElementSibling && reference.element.nextElementSibling.__designer ? reference.element.nextElementSibling : null
        }
        if (
            compareElement &&
            (
                compareElement.__designer.path == reference.element.__designer.path ||
                (compareElement.__designer.tpl_path != undefined && compareElement.__designer.tpl_path == reference.element.__designer.tpl_path)
            )) 
        {
            return context.dragOverResult = false
        }

        var funcName = '__dragOver_' + uiType.charAt(0).toUpperCase() + uiType.slice(1)
        return context.dragOverResult = this[funcName](context)
    }

    getDirectiveConfig (element) {
        if (element && element.__designer && element.__designer.owner) {
            return Object.assign({},
                config.dnd.dragOver,
                element.__designer.owner.__designer.directive.value
            )
        }
        return config.dnd.dragOver
    }
    getReference (context, x, y) {
        if (!context.target) {
            return context.getEmptyReference()
        }
        var validateGap = (gap, config) => {
            return gap === null
                ? false
                : config.gap === null || (gap >= config.gap[0] && gap <= config.gap[1])
        }
        var injectSpecifiedSide = (reference) => {
            if (reference.side == 'internal') {
                reference.position = 'internal'
                reference.orientation = 'internal'
            } else if (reference.side) {
                reference.position = (reference.side === 'top' || reference.side === 'left') ? 'before' : 'after',
                reference.orientation = (reference.side === 'top' || reference.side === 'bottom') ? 'horizontal' : 'vertical'
            }
            return reference
        }
        var getReferenceInner = (element, x, y) => {
            var env = [
                { key: 'left', value: x - element.offsetLeft },
                { key: 'right', value: element.offsetLeft + element.offsetWidth - x },
                { key: 'top', value: y - element.offsetTop },
                { key: 'bottom', value: element.offsetTop + element.offsetHeight - y }
            ].sort((a, b) => { return a.value - b.value })

            var reference = context.getEmptyReference()
            reference.side = env[0].key
            reference.gap = -1 * env[0].value
            reference.element = element
            reference.environment = env.reduce((res, cur) => {
                res[cur.key] = cur.value
                return res
            }, {});

            return reference
        }
        var getReferenceChilds = (element, x, y) => {
            var reference = context.getEmptyReference()
            if (!element.children.length || (element.children.length == 1 && element.children[0] === context.source)) {
                reference.element = element
                reference.side = 'internal'
                reference.gap = 1
                return reference
            }
            // Check children ===========================================================================
            for (let i = 0; i < element.children.length; i++) {
                let child = element.children[i]
                if (
                    element === child ||
                    !child.__designer || !child.__designer.path ||
                    child.offsetWidth <= 0 || child.offsetHeight <= 0
                ) {
                    continue
                }
                let resKey = null
                let childGap = null
                child.offsetBottom = child.offsetTop + child.offsetHeight
                child.offsetRight = child.offsetLeft + child.offsetWidth
                if (child.offsetTop < y && y < child.offsetBottom) {
                    if (x <= child.offsetLeft) {
                        if (!reference.environment.left || (child.offsetLeft < reference.environment.left.offsetLeft)) {
                            resKey = 'left'
                            reference.environment.left = child
                            childGap = child.offsetLeft - x
                        }
                    } else if (x >= child.offsetRight) {
                        if (!reference.environment.right || (child.offsetRight > reference.environment.right.offsetRight)) {
                            resKey = 'right'
                            reference.environment.right = child
                            childGap = x - child.offsetRight
                        }
                    }
                } else if (child.offsetLeft < x && x < child.offsetRight) {
                    if (y <= child.offsetTop) {
                        if (!reference.environment.top || (child.offsetTop < reference.environment.top.offsetTop)) {
                            resKey = 'top'
                            reference.environment.top = child
                            childGap = child.offsetTop - y
                        }
                    } else if (y >= child.offsetBottom) {
                        if (!reference.environment.bottom || (child.offsetBottom > reference.environment.bottom.offsetBottom)) {
                            resKey = 'bottom'
                            reference.environment.bottom = child
                            childGap = y - child.offsetBottom
                        }
                    }
                }
                if (resKey && (!reference.element || reference.gap > childGap)) {
                    reference.gap = childGap
                    reference.side = resKey
                    reference.element = child
                }
            }
            return reference
        }

        var reference = getReferenceInner(context.target, x, y)
        var config = this.getDirectiveConfig(context.target)
        reference.isValid = validateGap(reference.gap, config)
        if (reference.isValid) {
            return injectSpecifiedSide(reference)
        }

        reference = getReferenceChilds(context.target, x, y)
        reference.isValid = validateGap(reference.gap, config)
        if (reference.isValid) {
            return injectSpecifiedSide(reference)
        }
        return reference
    }

    __dragOver_FlexGrid (context) {
        var reference = context.reference

        if (reference.cssStyle.flexDirection.substr(0, 3) === 'row' && reference.orientation === 'vertical') {
            reference.reverse = reference.cssStyle.flexDirection === 'row-reverse'
            return true
        }
        if (reference.cssStyle.flexDirection.substr(0, 6) === 'column' && reference.orientation === 'horizontal') {
            reference.reverse = reference.cssStyle.flexDirection === 'column-reverse'
            return true
        }
        return false
    }

    __dragOver_Css (context) {
        var reference = context.reference

        if (!reference.element.previousElementSibling && !reference.element.nextElementSibling) { // Only One Element
            return true
        }
        function getSide (current, near) {
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
            if (near.offsetLeft < (current.offsetLeft + current.offsetWidth) && (near.offsetLeft + near.offsetWidth) > current.offsetLeft) {
                return 'column'
            } else if (near.offsetTop < (current.offsetTop + current.offsetHeight) && (near.offsetTop + near.offsetHeight) > current.offsetTop) {
                return 'row'
            }
            return 'corner'
        }

        var prevOrient = getSide(reference.element, reference.element.previousElementSibling)
        var nextOrient = getSide(reference.element, reference.element.nextElementSibling)

        if (reference.orientation === 'horizontal') {
            if (prevOrient === 'column') {
                return nextOrient !== 'row'
            } else if (prevOrient === null) {
                return nextOrient === 'column'
            } else if (prevOrient === 'corner') {
                return (nextOrient === 'column') || (nextOrient === null && getSide(reference.element, 'prev-prev') === 'column')
            }
        } else if (reference.orientation === 'vertical') {
            if (nextOrient === 'row' || prevOrient === 'row') {
                return true
            } else if (nextOrient === null) {
                return prevOrient === 'corner' && getSide(reference.element, 'prev-prev') === 'row'
            } else if (nextOrient === 'corner') {
                return (prevOrient === 'corner' && getSide(reference.element, 'prev-prev') === 'row')
                    || (prevOrient === null && getSide(reference.element, 'next-next') === 'row')
            }
        }
        return false
    }
}

export default DragOver
