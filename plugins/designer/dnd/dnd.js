import config from "./../config/config.js"
import Context from "./dndContext.js"
import Drag from "./drag.js"
import DragOver from "./dragOver.js"
import Drop from "./drop.js"
import DndAbstract from '@/plugins/designer/dnd/dndAbstract.js'

class Dnd extends DndAbstract {    
    drag = new Drag()
    dragOver = new DragOver()
    drop = new Drop()
    context = new Context()

    onDragStart (e) {
        this.source.element = this.popElement(this.source.element)
        if (!this.source.element) {
            return false
        }
        this.context.setSource(this.source)
        this.context.saveSourceScopeState(
            { style: ['position', 'left', 'top', 'background', 'backgroundColor', 'display', 'pointerEvents', 'zIndex', 'opacity'] },
            (c, s) => c.__designer && (c.__designer.path == s.__designer.path || (c.__designer.tpl_path !== undefined && c.__designer.tpl_path == s.__designer.tpl_path))
        )
        this.source.element.style.pointerEvents = 'none'
        this.source.element.style.zIndex = config.styleZIndex
    }
    onDragOver (e) {
        this.context.x = this.currentPos.x
        this.context.y = this.currentPos.y
        this.target = this.popElement(this.target)
        return this.dragOver.onDragOver(this.context, this.target)
    }

    onDrag (e) {
        this.drag.onDrag(this.context)
    }

    onDragEnd (e) {
        this.drag.onDragEnd(this.context)
        this.context.restoreSourceScopeState()
    }

    onDrop (e) {
        var tmp = this.context.target
        while (tmp.parentElement && !tmp.__vue__) {
            tmp = tmp.parentElement
        }
        this.context.route = tmp.__vue__.$route
        this.drop.onDrop(this.context)
        //this.context.restoreSourceScopeState()
    }

    popElement(source) {
        var current = source;
        while (current) {
            if (current.draggable === true) {
                return current
            }
            current = current.parentElement;
        }
        return false
    }
}

export default new Dnd()