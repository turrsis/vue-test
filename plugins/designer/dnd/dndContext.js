class Context {
    x = null
    y = null
    source = null
    target = null
    reference = this.getEmptyReference()
    dragOverResult = null
    referenceChanged = null

    initialPoint = {x:0, y:0}

    setSource (source) {
        this.source = source
        this.x = null
        this.y = null
        this.target = null
        this.reference = this.getEmptyReference()
        this.dragOverResult = null
        this.referenceChanged = null
        this.initialPoint = {x:0, y:0}        
    }

    setTarget (target) {
        this.target = target || null
    }

    setReference (reference) {
        this.reference = reference || this.getEmptyReference()
    }

    getEmptyReference () {
        return {
            element: null,
            side: null,
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
    }

    saveSourceScopeState (statePattern, scopeValidator) {
        var scopeItems = []
        var current = this.source.element.previousElementSibling
        while (current && scopeValidator(current, this.source.element)) {
            scopeItems.unshift({ element: current })
            current = current.previousElementSibling
        }
        scopeItems.push({ element: this.source.element })
        current = this.source.element.nextElementSibling
        while (current && scopeValidator(current, this.source.element)) {
            scopeItems.push({ element: current })
            current = current.nextElementSibling
        }

        this.source.items = scopeItems,
        this.source.parent = scopeItems[0].element.parentElement,
        this.source.before = scopeItems[scopeItems.length - 1].element.nextElementSibling

        // save source scope state
        this.source.items.forEach(item => {
            item.state = {}
            for (let prop0 in statePattern) {
                item.state[prop0] = {}
                statePattern[prop0].forEach(prop1 => {
                    item.state[prop0][prop1] = item.element[prop0][prop1]
                })
            }
        })
    }

    restoreSourceScopeState () {
        var scopeParent = this.source.parent
        var scopeBefore = this.source.before
        this.source.items.reverse().forEach(item => {
            for (let prop in item.state) {
                Object.assign(item.element[prop], item.state[prop])   
            }
            if (scopeParent != item.element.parentElement || scopeBefore != item.element.nextElementSibling) {
                scopeParent.insertBefore(item.element, scopeBefore)
            }
            scopeBefore = item.element
        })
    }
}

export default Context