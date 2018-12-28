// https://www.quirksmode.org/js/dragdrop.html
import config from "./../config/config.js"

class DndAbstract {
    isStarted = false
    startShift = config.dnd.startShift
    startPos = {x: null, y: null}
    currentPos = {x: null, y: null}
    source = null
    target = null
    dragOverResult = null

    constructor () {
        this.init = this.init.bind(this)
		this.__onDragStart = this.__onDragStart.bind(this)
		this.__onDrag = this.__onDrag.bind(this)
        this.__onDragEnd = this.__onDragEnd.bind(this)
    }
    init (object) {
        object = object.$el ? object.$el : object
        object.addEventListener('mousedown', this.__onDragStart)
    }
    __onDragStart (e) {
        e = this.__fixEvent(e)
        if (e.button !== 0) {
            return
        }
        this.startPos.x = e.clientX + window.scrollX
        this.startPos.y = e.clientY + window.scrollY
        this.source = {
            element: e.target
        }
		document.addEventListener('mousemove', this.__onDrag)
        document.addEventListener('mouseup', this.__onDragEnd)
    }
    __onDrag (e) {
        e = this.__fixEvent(e)
        if (this.currentPos.x == (e.clientX + window.scrollX) && this.currentPos.y == (e.clientY + window.scrollY)) {
            return
        }
        this.currentPos.x = e.clientX + window.scrollX
		this.currentPos.y = e.clientY + window.scrollY
        if (!this.isStarted) {
            if (Math.abs(this.currentPos.x - this.startPos.x) < this.startShift && Math.abs(this.currentPos.y - this.startPos.y) < this.startShift) {
                return
            }
            this.isStarted = true
            if (this.onDragStart(e) === false) {
                this.__onDragEnd(e)
                this.isStarted = false
                return
            }
        }
        this.__scroll(e, this.source.element.offsetWidth, this.source.element.offsetHeight)
        this.target = document.elementFromPoint(e.clientX, e.clientY)
        this.dragOverResult = this.onDragOver(e)
        this.onDrag(e)
    }
    __onDragEnd (e) {
        e = this.__fixEvent(e)
        try {
            document.removeEventListener('mousemove', this.__onDrag)
            document.removeEventListener('mouseup', this.__onDragEnd)
            if (this.isStarted) {
                if (this.dragOverResult === true) {
                    this.onDrop(e)
                }
                this.onDragEnd(e)
            }
        } finally {
            this.isStarted = false
            this.startPos = {x: null, y: null}
            this.currentPos = {x: null, y: null}
            this.source = null
            this.target = null
            this.dragOverResult = null
        }
    }

    __scroll (e, width, height) {
		var scroll = { left: 0, top: 0 }
		var offset = {
			top: e.clientY + window.scrollY,
			left: e.clientX + window.scrollX
		}
		offset.bottom = offset.top + (height || 0)
		offset.right = offset.left + (width || 0)

		if (offset.right < document.body.clientWidth && offset.right > window.innerWidth + window.scrollX) {
			scroll.left = offset.right - (window.innerWidth + window.scrollX)
		} else if (window.scrollX !== 0 && offset.left < window.scrollX) {
			scroll.left = offset.left - window.scrollX
		}
		if (offset.bottom < document.body.clientHeight && offset.bottom > window.innerHeight + window.scrollY) {
			scroll.top = offset.bottom - (window.innerHeight + window.scrollY)
		} else if (window.scrollY !== 0 && offset.top < window.scrollY) {
			scroll.top = offset.top - window.scrollY
		}
		window.scrollBy(scroll)
		return offset
    }
    __fixEvent (e) {
        e = e || window.event
        e.preventDefault()
        e.stopPropagation()
        return e
    }
    //============================================================================
	onDragStart (e) { throw new Error('onDragStart must be implemented') }
	onDrag (e) { throw new Error('onDrag must be implemented') }
	onDragOver (e) { throw new Error('onDragOver must be implemented') }
	onDragEnd (e) { throw new Error('onDragEnd must be implemented') }
	onDrop (e) { throw new Error('onDrop must be implemented') }
	//============================================================================
}

export default DndAbstract