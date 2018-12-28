import config from "./../config/config.js"

class Drag {
    onDrag (context) {
        this.onDragSource(context)
        if (context.referenceChanged) {
            this.onDragMarker(context)
        }
    }

    onDragEnd (context) {
        Object.assign(this.__getMarker().style, config.dnd.drag.markerStyle.drop.null)
    }

    onDragSource (context) {
        context.source.element.style.left = (context.x + context.initialPoint.x) + 'px'
        context.source.element.style.top = (context.y + context.initialPoint.y) + 'px'
        Object.assign(context.source.element.style, config.dnd.drag.sourceStyle.marker)

        context.source.items.forEach(scope => {
            if (scope.element !== context.source.element) {
                scope.element.style.display = 'none'
            }
        })
    }

    onDragMarker (context) {
        var reference = context.reference
        if (context.config.marker != 'element') {
            Object.assign(
                this.__getMarker().style,
                this.__getMarkerCoordinates(context),
                config.dnd.drag.markerStyle.drop[context.dragOverResult]
            )
            return
        }

        Object.assign(this.__getMarker().style, config.dnd.drag.markerStyle.drop.null)
        var source = context.source.element
        if (reference.element != source) {
            Object.assign(context.source.element.style, config.dnd.drag.sourceStyle.marker, config.dnd.drag.sourceStyle.element)

            var before = null
            if (reference.position === 'after') {
                before = reference.element.nextElementSibling
            } else if (reference.position === 'before') {
                before = reference.element
            }
            context.target.insertBefore(source.element, before)
        }
    }
    static _marker = null
    __getMarker () {
        if (Drag._marker) {
            return Drag._marker
        }
        Drag._marker = document.createElement('div')
        Drag._marker.id = 'marker'
        document.body.appendChild(Drag._marker)
        Object.assign(Drag._marker.style, config.dnd.drag.markerStyle.default)
        return Drag._marker
    }

    __getMarkerCoordinates (context) {
        var h = 5
        var suffix = 'px'
        var position = context.reference.position
        var element = context.reference.element

        switch (context.reference.orientation) {
            case 'internal': return {
                top: element.offsetTop + 10 + suffix,
                left: element.offsetLeft + 10 + suffix,
                height: element.offsetHeight - 20 + suffix,
                width: element.offsetWidth - 20 + suffix,
            }
            case 'horizontal': return {
                top: position === 'after' ? (element.offsetTop + element.offsetHeight) + suffix : element.offsetTop - h + suffix,
                left: element.offsetLeft + suffix,
                height: h + suffix,
                width: element.offsetWidth + suffix
            }
            case 'vertical': return {
                top: element.offsetTop + suffix,
                left: position === 'after' ? (element.offsetLeft + element.offsetWidth) + suffix : element.offsetLeft - h + suffix,
                height: element.offsetHeight + suffix,
                width: h + suffix
            }
        }
    }
}

export default Drag
