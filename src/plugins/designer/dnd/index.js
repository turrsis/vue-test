import core from '@/plugins/designer/dnd/dndCore.js'
import highLight from '@/plugins/designer/dnd/dndHighLight.js'
import mixin from '@/plugins/designer/dnd/dndMixin.js'

mixin.config.onMountedCallback = (element, root) => {
    // element.setAttribute('XXXXXXX', 'XXX')
    // element.classList.add('testdnd')
    // element.className = 'testdnd ' + element.className
    core.dnd.initElement(element, root)
    highLight.initElement(element)
}

export default {
    mixin,
    core,
    highLight
}
