class AbstractStrategy {
    static _marker = null
    static _sourceOriginal = {
        style: {
            position: null,
            left: null,
            top: null,
            background: null
        }
    }
    markerStyle = {
        default: {
            padding: '0px',
            margin: '0px',
            borderStyle: 'none',
            borderWidth: '0px',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'none'
        },
        canDropTrue: {
            backgroundColor: 'green',
            display: 'block'
        },
        canDropFalse: {
            backgroundColor: 'red',
            display: 'block'
        }
    }
    // Can use this strategy for element.
    canServeTarget (context) {
        return context !== null
    }

    shiftUpTarget (context) {
        let gap = [0, 10]
        if (gap[0] < context.innerPos[0].value && context.innerPos[0].value <= gap[1]) {
            return true
        }
    }

    // Detects if context can be inserted.
    acceptReference (context) {
        throw new Error('allowDrop must be implemented')
    }

    /* onChangeContext (context) {
        context.canDrop = this.checkCanDrop2(context)
        this.showMarker(context)
    } */

    onDrop () {

    }

    onDrag (context) {
        context.source.style.left = (context.x + window.scrollX + 3) + 'px'
        context.source.style.top = (context.y + window.scrollY + 3) + 'px'
        context.source.style.position = 'absolute'
    }

    getMarker () {
        if (AbstractStrategy._marker) {
            return AbstractStrategy._marker
        }
        AbstractStrategy._marker = document.createElement('div')
        AbstractStrategy._marker.id = 'marker'
        document.body.appendChild(AbstractStrategy._marker)
        Object.assign(AbstractStrategy._marker.style, this.markerStyle.default)
        return AbstractStrategy._marker
    }

    showMarker (context) {
        if (context === null || context.canDrop === null) {
            this.hideMarker()
            return
        }

        Object.assign(
            this.getMarker().style,
            this.getMarkerCoordinates(context),
            context.canDrop
                ? this.markerStyle.canDropTrue
                : this.markerStyle.canDropFalse
        )
        return context.canDrop
    }

    hideMarker () {
        var marker = this.getMarker()
        marker.style.display = 'none'
        // this._marker.remove()
    }

    getMarkerCoordinates (context) {
        var h = 5
        var result = {
            top: null,
            left: null,
            height: null,
            width: null
        }
        if (context.reference.orientation === 'internal') {
            result.top = context.target.offsetTop + 10
            result.left = context.target.offsetLeft + 10
            result.height = context.target.offsetHeight - 20
            result.width = context.target.offsetWidth - 20
        } else if (context.reference.orientation === 'top' || context.reference.orientation === 'bottom') {
            // Gorizontal line
            result.top = null
            result.left = context.reference.element.offsetLeft
            result.height = h
            result.width = context.reference.element.offsetWidth
            if (context.reference.orientation === 'bottom') {
                result.top = context.reference.element.offsetBottom
            } else if (context.reference.orientation === 'top') {
                result.top = context.reference.element.offsetTop - h
            }
        } else if (context.reference.orientation === 'left' || context.reference.orientation === 'right') {
            // Vertical line
            result.top = context.reference.element.offsetTop
            result.left = null
            result.height = context.reference.element.offsetHeight
            result.width = h
            if (context.reference.orientation === 'right') {
                result.left = context.reference.element.offsetRight
            } else if (context.reference.orientation === 'left') {
                result.left = context.reference.element.offsetLeft - h
            }
        }
        result.top += 'px'
        result.left += 'px'
        result.height += 'px'
        result.width += 'px'
        return result
    }
    static saveSourceOriginal (context) {
        AbstractStrategy._sourceOriginal = {
            style: {
                position: context.source.style.position,
                left: context.source.style.left,
                top: context.source.style.top,
                background: context.source.style.background,
                pointerEvents: context.source.style.pointerEvents
            }
        }
    }
    static restoreSourceOriginal (context) {
        Object.assign(
            context.source.style,
            AbstractStrategy._sourceOriginal.style
        )
    }
    _logComputedStyle (element) {
        var style = getComputedStyle(element)
        var log = element.style.display + ' FLEX = '
        log += 'display:' + style.display + '; '
        log += 'flex:' + style.flex + '; '
        log += 'flexBasis:' + style.flexBasis + '; '
        log += 'flexDirection:' + style.flexDirection + '; '
        log += 'flexFlow:' + style.flexFlow + '; '
        log += 'flexGrow:' + style.flexGrow + '; '
        log += 'flexShrink:' + style.flexShrink + '; '
        log += 'flexWrap:' + style.flexWrap + '; '
        console.log(log)
    }
}

export default AbstractStrategy
