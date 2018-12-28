import config from "./../config/config.js"

class HighLighter {
    static _menu = null
    lastIn = null
    constructor () {
		this.initElement = this.initElement.bind(this)
		this.showComponentMenu = this.showComponentMenu.bind(this)
        this.hideComponentMenu = this.hideComponentMenu.bind(this)
		this.__onMenuOut = this.__onMenuOut.bind(this)
    }
    initElement (element) {
        element.addEventListener('mouseover', this.showComponentMenu, true)
        element.addEventListener('mouseout', this.hideComponentMenu, true)
    }

    showComponentMenu (e) { // onmousover
        var element = e.currentTarget
        this.lastIn = e.target

        
        element.style.outline = 'red dotted 2px'
        element.style.outlineOffset = '5px;'

        var menu = this.__getMenu()
        menu.__currentElement = element

        menu.style.display = 'block'
        menu.style.top = (e.target.offsetTop - menu.offsetHeight + 2) + 'px'
        menu.style.left = (e.target.offsetLeft) + 'px'
        menu.style.backgroundColor = e.target.__designer != null ? 'green' : 'red'
    }

    hideComponentMenu (e) {
        var element = e.currentTarget
        if (e.relatedTarget === HighLighter._menu || (e.relatedTarget && e.relatedTarget.id == 'menuButton')) {
            return
        }
        this.__hideBorder(element)
        this.__getMenu().style.display = 'none'
    }

    __onMenuOut (e) {
        if (this.lastIn != e.relatedTarget || (e.relatedTarget && e.relatedTarget.id == 'menuButton')) {
            this.__hideBorder(this.lastIn)
        }
    }
    __hideBorder (element) {
        element.style.outline = ''
        element.style.outlineOffset = ''
    }
    __getMenu () {
        if (HighLighter._menu) {
            return HighLighter._menu
        }
        var func = "(function(e, obj){ "
            + "\n    " + "var menu = document.getElementById('menu'); "
            + "\n    " + "alert(menu.__currentElement.id); "
            + "\n    " + "return false "
            + "\n" + "})(event, this)"
        HighLighter._menu = document.createElement('div')
        HighLighter._menu.addEventListener('mouseout', this.__onMenuOut, false)
        HighLighter._menu.innerHTML = '<button id="menuButton" onClick="'+func+'">X</button>'
        HighLighter._menu.id = 'menu'
        HighLighter._menu.style.position = 'absolute'
        HighLighter._menu.style.backgroundColor = 'green',
        HighLighter._menu.style.borderWidth = '1px',
        HighLighter._menu.style.borderStyle = 'solid',
        HighLighter._menu.style.zIndex = config.styleZIndex - 1
        HighLighter._menu.style.height = '20px'
        HighLighter._menu.style.width = '50px'
        HighLighter._menu.style.position = 'absolute'
        document.body.appendChild(HighLighter._menu)
        return HighLighter._menu
    }
}
export default new HighLighter()
