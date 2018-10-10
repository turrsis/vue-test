class AbstractStrategy {
    canServeTarget (context) {
        return false
    }

    onDrop () {

    }

    _logContext (prefix, context, suffix) {
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
}

export default AbstractStrategy
