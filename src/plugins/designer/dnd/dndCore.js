import AbstractStrategy from '@/plugins/designer/dnd/dragStrategies/abstract.js'
import strategyDefault from '@/plugins/designer/dnd/dragStrategies/default.js'
import strategyFlexGrid from '@/plugins/designer/dnd/dragStrategies/flexGrid.js'
import sortableList from '@/plugins/designer/dnd/dragStrategies/sortableList.js'
import serverTemplate from '@/plugins/designer/dnd/dropStrategies/serverTemplate.js'

var context = {
    x: 0,
    y: null,
    source: null,
    target: null,
    innerPos: [],
    reference: {
        element: null,
        orientation: null,
        position: null,
        reverse: null,
        gap: null,
        environment: {
            left: null,
            right: null,
            top: null,
            bottom: null
        }
    },
    clear () {
        this.source = null
        this.clearTarget()
    },
    clearTarget () {
        this.target = null
        this.innerPos = []
        this.reference = {
            element: null,
            orientation: null,
            position: null,
            reverse: null,
            gap: null,
            environment: {
                left: null,
                right: null,
                top: null,
                bottom: null
            }
        }
        this.canDrop = null
    }
}
var dnd = {
    context: context,
    dragStrategies: {
        sortableList: sortableList,
        flexGrid: strategyFlexGrid,
        default: strategyDefault
    },
    dropStrategies: {
        serverTemplate: serverTemplate
    },
    initElement (element) {
        element.draggable = true

        /* element.addEventListener('drag', dnd.onDrag, true)
        element.addEventListener('drop', dnd.onDrop, false)
        element.addEventListener('dragstart', dnd.onDragStart, false)
        element.addEventListener('dragend', dnd.onDragEnd, false)
        element.addEventListener('dragenter', dnd.onDragEnter, false)
        element.addEventListener('dragover', dnd.onDragOver, false) */
    },
    onDrag (e) {
        e.preventDefault()
        e.stopPropagation()
        if (!dnd.context.target) {
            return
        }
        var strategy = dnd.getDragStrategy(dnd.context)
        strategy.onDrag(dnd.context)
    },
    onDrop (e) {
        e.preventDefault()
        e.stopPropagation()
        if (dnd.context.canDrop !== true) {
            console.log('can not drop')
            return
        }
        var strategy = dnd.getDropStrategy(dnd.context)
        if (!strategy) {
            throw new Error('DropStrategy not found')
        }
        strategy.onDrop(dnd.context)

        /* var source = dnd.context.source
        var target = dnd.context.target
        var sourceComponent = dnd.getComponentForElement(source)
        var targetComponent = dnd.getComponentForElement(target)
        if (!targetComponent) {
            throw new Error('Target Component for "' + target.id + '" not found')
        }
        _logContext(
            'onDrop     => ',
            dnd.context,
            '\n         source: ' + (sourceComponent ? sourceComponent.__designer.source : 'null') + ' // ' + (source.__designer ? source.__designer.path : 'null') +
            '\n         target: ' + (targetComponent ? targetComponent.__designer.source : 'null') + ' // ' + (target.__designer ? target.__designer.path : 'null') +
            ' // ' + (context.reference.element ? context.reference.element.id : 'null') + ' (' + dnd.context.reference.position + ')')

        // ========================================================================
        var before = null
        if (dnd.context.reference.position === 'after') {
            if (dnd.context.reference.reverse) {
                before = dnd.context.reference.element
            } else {
                before = dnd.context.reference.element.nextElementSibling
            }
        } else if (dnd.context.reference.position === 'before') {
            if (dnd.context.reference.reverse) {
                before = dnd.context.reference.element.nextElementSibling
            } else {
                before = dnd.context.reference.element
            }
        } else if (dnd.context.reference.position === 'internal') {
            before = null
        }
        // ========================================================================
        // var targetPath = target.__designer.path.split('/').slice(0, -1).join('/')
        if (target.__designer && source.__designer) {
            let targetPath = target.__designer ? target.__designer.path : 'null'
            let sourcePath = source.__designer ? source.__designer.path.split('/').slice(-1).join('/') : 'null'
            source.__designer.path = targetPath + '/' + sourcePath
            source.setAttribute('X-DEBUG', JSON.stringify(source.__designer))
        }

        if (dnd.context.reference.element) {
            source.style.cssText = dnd.context.reference.element.style.cssText
            source.className = dnd.context.reference.element.className
        }
        // ========================================================================
        source.style.backgroundColor = 'lightcoral'
        target.insertBefore(source, before)

        var strategy = dnd.getDragStrategy(dnd.context)
        strategy.showMarker(null) */
    },
    onDragStart (e) {
        e.stopPropagation()
        console.log('(' + e.clientX + ':' + e.clientY + ')' + 'onDragStart:' + e.target.id)
        dnd.context.clear()
        dnd.context.source = e.target
        AbstractStrategy.saveSourceOriginal(dnd.context)
    },
    onDragEnd (e) {
        e.preventDefault()
        e.stopPropagation()
        AbstractStrategy.restoreSourceOriginal(dnd.context)
        dnd.context.clear()
    },
    lock: {
        x: -1,
        y: -1
    },
    isLock (e) {
        if (dnd.lock && dnd.lock.x === e.clientX && dnd.lock.y === e.clientY) {
            return true
        }
        dnd.lock = { x: e.clientX, y: e.clientY }
        return false
    },
    onDragEnter (e) {
        e.preventDefault()
        e.stopPropagation()
        // console.log('(' + e.clientX + ':' + e.clientY + ')' + 'onDragEnter:' + e.target.id)
        console.log(_logDragEvent(e))
    },
    onDragLeave (e) {
        e.preventDefault()
        e.stopPropagation()
        // console.log('(' + e.clientX + ':' + e.clientY + ')' + 'onDragLeave:' + e.target.id)
        console.log(_logDragEvent(e))
    },
    onDragOver (e) {
        e.preventDefault()
        e.stopPropagation()
        if (dnd.isLock(e)) {
            return
        }
        // console.log('(' + e.clientX + ':' + e.clientY + ')' + 'onDragOver:' + e.target.id)
        var X = e.clientX
        var Y = e.clientY
        var target = e.target

        // ==========================================================
        // debug ====================================================
        var debug = 0
        if (debug) {
            X = 323
            Y = 591
            target = document.elementFromPoint(X, Y)
        }
        // ==========================================================

        dnd.context.clearTarget()
        dnd.context.x = X + window.scrollX
        dnd.context.y = Y + window.scrollY
        dnd.context.target = target
        dnd.context.innerPos = dnd.getInnerPos(dnd.context)

        var strategy = dnd.getDragStrategy(dnd.context)
        if (strategy.shiftUpTarget(dnd.context)) {
            let minKey = dnd.context.innerPos[0].key
            let minDist = dnd.context.innerPos[0].value
            Object.assign(dnd.context, {
                reference: {
                    orientation: minKey,
                    element: context.target,
                    gap: -1 * minDist
                },
                target: dnd.context.target.parentElement
            })
            dnd.context.reference.position = dnd.getPositionByOrientation(minKey)
            strategy = dnd.getDragStrategy(dnd.context)
        } else {
            dnd.injectTargetReference(dnd.context)
        }

        dnd.context.canDrop = strategy.acceptReference(dnd.context)
        strategy.showMarker(dnd.context)

        // _logUiEnv('onDragOver => ', dnd.transfer) */
        // _logContext(strategy.constructor.name + '(' + X + ':' + Y + ')', dnd.context)
    },
    getDropStrategy (context) {
        for (let name in dnd.dropStrategies) {
            if (!dnd.dropStrategies[name].canServeTarget(context)) {
                continue
            }
            return dnd.dropStrategies[name]
        }
    },
    getDragStrategy (context) {
        for (let name in dnd.dragStrategies) {
            if (!dnd.dragStrategies[name].canServeTarget(context)) {
                continue
            }
            return dnd.dragStrategies[name]
        }
    },
    getInnerPos (context) {
        let offsetBottom = context.target.offsetTop + context.target.offsetHeight
        let offsetRight = context.target.offsetLeft + context.target.offsetWidth

        return [
            { key: 'right', value: offsetRight - context.x },
            { key: 'left', value: context.x - context.target.offsetLeft },
            { key: 'top', value: context.y - context.target.offsetTop },
            { key: 'bottom', value: offsetBottom - context.y }
        ].sort((a, b) => { return a.value - b.value })
    },
    injectTargetReference (context) {
        if (!context.target.children.length) {
            context.reference.element = null
            context.reference.orientation = 'internal'
            return
        }
        var reference = context.reference
        // Check children ===========================================================================
        for (let i = 0; i < context.target.children.length; i++) {
            let child = context.target.children[i]
            if (
                context.target === child ||
                !child.__designer || !child.__designer.path ||
                child.offsetWidth <= 0 || child.offsetHeight <= 0
            ) {
                continue
            }
            let resKey = null
            let childGap = null
            child.offsetBottom = child.offsetTop + child.offsetHeight
            child.offsetRight = child.offsetLeft + child.offsetWidth
            if (child.offsetTop < context.y && context.y < child.offsetBottom) {
                if (context.x <= child.offsetLeft) {
                    if (!reference.environment.left || (child.offsetLeft < reference.environment.left.offsetLeft)) {
                        resKey = 'left'
                        reference.environment.left = child
                        childGap = child.offsetLeft - context.x
                    }
                } else if (context.x >= child.offsetRight) {
                    if (!reference.environment.right || (child.offsetRight > reference.environment.right.offsetRight)) {
                        resKey = 'right'
                        reference.environment.right = child
                        childGap = context.x - child.offsetRight
                    }
                }
            } else if (child.offsetLeft < context.x && context.x < child.offsetRight) {
                if (context.y <= child.offsetTop) {
                    if (!reference.environment.top || (child.offsetTop < reference.environment.top.offsetTop)) {
                        resKey = 'top'
                        reference.environment.top = child
                        childGap = child.offsetTop - context.y
                    }
                } else if (context.y >= child.offsetBottom) {
                    if (!reference.environment.bottom || (child.offsetBottom > reference.environment.bottom.offsetBottom)) {
                        resKey = 'bottom'
                        reference.environment.bottom = child
                        childGap = context.y - child.offsetBottom
                    }
                }
            }
            if (resKey && (!reference.element || reference.gap > childGap)) {
                reference.gap = childGap
                reference.orientation = resKey
                reference.element = child
            }
        }

        if (!reference.orientation) {
            return
        }
        // Post Processing ==========================================================================
        reference.position = dnd.getPositionByOrientation(reference.orientation)
        // ==========================================================================================
    },
    getPositionByOrientation (orientation) {
        if (orientation === 'top' || orientation === 'left') {
            return 'before'
        } else if (orientation === 'bottom' || orientation === 'right') {
            return 'after'
        }
    }
}

export default {
    dnd
}

function _logContext (prefix, context, suffix) {
    function align (str, width) {
        str += ' '.repeat(50)
        return str.substr(0, width || 15)
    }
    var log = prefix || ''
    var canDrop = 'null'
    if (context.canDrop === false) {
        canDrop = 'false'
    } else if (context.canDrop === true) {
        canDrop = 'true'
    }
    log += align('drop:' + canDrop) + ' | '
    log += align('gap: ' + context.reference.gap, 10) + ' | '
    log += align('Pos: ' + context.reference.position) + ' | '
    log += align('Key: ' + context.reference.orientation) + ' | '
    log += align('source: ' + (context.source ? context.source.id : 'null'), 20) + ' | '
    log += align(
        'target: ' + (context.target ? context.target.id : 'null') + '=>' +
        (context.reference.element ? context.reference.element.id : 'null'), 60
    ) + ' | '
    log += '   ----   ' // + ' '.repeat(10)
    log += '{'
    for (let prop in context.reference.environment) {
        log += 'obj.' + prop + ' = ' + (context.reference.environment[prop] ? context.reference.environment[prop].id : 'null') + '; '
    }
    log += '}' + (suffix || '')

    console.log(log)
}

function _logDragEvent (e, source, showXY) {
    showXY = showXY || false
    return (showXY ? '(' + e.clientX + ':' + e.clientY + ')' : '') +
        e.type + ' | ' +
        'source :' + (source ? source.id : 'null') + '; ' +
        'e.target :' + (e.target ? e.target.id : 'null') + '; ' +
        'e.toElement :' + (e.toElement ? e.toElement.id : 'null') + '; ' +
        'e.currentTarget :' + (e.currentTarget ? e.currentTarget.id : 'null') + '; ' +
        'relatedTarget :' + (e.relatedTarget ? e.relatedTarget.id : 'null') + '; ' +
        'srcElement :' + (e.srcElement ? e.srcElement.id : 'null') + '; ' +
        'fromElement :' + (e.fromElement ? e.fromElement.id : 'null') + '; ' +
        'toElement :' + (e.toElement ? e.toElement.id : 'null') + '; '
}
