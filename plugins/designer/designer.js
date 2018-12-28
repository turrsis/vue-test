import Vue from 'vue'
import dnd from '@/plugins/designer/dnd/dnd.js'
import directives from '@/plugins/designer/directives/directives.cli.js'
import highLighter from '@/plugins/designer/dnd/highLighter.js'
import componentsConfig from '@/plugins/designer/config/components/index.js'

class Designer {
    dnd = dnd
    highLighter = highLighter
    directives = directives
    config = {
        components: componentsConfig,
        userConfig: require("@/plugins/designer/config/config.js").default
    }
    domInpectorData = []

    constructor () {
        this.initComponent = this.initComponent.bind(this)
    }

    initComponent (component, level) {
        this.directives.initComponent(component, [
            (component, element, designer, level) => {
                element.setAttribute('initElementEvents', designer != null)
                this.domInpectorData.push({
                    name: element.id || 'null',
                    hasDesigner: designer != null,
                    level: level,
                    element: element
                })
            },
            this.directives.initElementCallback,
            (component, element, designer, level) => {
                if (!designer) {
                    return
                }
                element.draggable = true
                if (level === 0) {
                    this.dnd.init(element)
                }
                this.highLighter.initElement(element)
            }
        ])
    }

    initToolBox(component) {
        if (component.$parent || window.designer) {
            return
        }

        var toolBoxClass = Vue.extend(require('@/plugins/designer/ui/index.vue').default)
        window.designer = new toolBoxClass()
        document.body.appendChild(window.designer.$mount().$el)
    }
}

export default Designer