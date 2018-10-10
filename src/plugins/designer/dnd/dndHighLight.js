
function initElement (element) {
    element.addEventListener('mouseover', showComponentMenu, false)
    element.addEventListener('mouseout', hideComponentMenu, false)
}

function showComponentMenu (mouseEvent) { // onmousover
    // mouseEvent.preventDefault()
    // mouseEvent.stopPropagation()
    this.style.outline = 'red dotted 2px'
    this.style.outlineOffset = '5px;'

    /* if (this.__designer && this.__designer.menuComponent) {
        var menuElement = this.__designer.menuComponent.$el
        menuElement.style.display = 'block'
        var menuElementClientRect = this.getBoundingClientRect()
        menuElement.style.top = (menuElementClientRect.top - menuElement.clientHeight - 5 - 6) + 'px'
        menuElement.style.left = (menuElementClientRect.left) + 'px'
    } */
}

function hideComponentMenu (mouseEvent) {
    this.style.outline = ''
    this.style.outlineOffset = ''

    /* if (this.__designer && this.__designer.menuComponent) {
        var menuElement = this.__designer.menuComponent.$el
        menuElement.style.display = 'none'
    } */
}

export default {
    initElement
}
