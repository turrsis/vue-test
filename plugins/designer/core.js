import componentContextMenu from '~/components/designer/componentContextMenu.vue'
import Vue from 'vue'
//import dragAndDrop from '~/plugins/designer/dnd/dragAndDrop.js';
import dragAndDrop from '~/plugins/designer/dnd/dragAndDropNative.js';
import dndMarker from '~/plugins/designer/dnd/dragAndDropMarker.js';



var designerCore = {
    
    isEditable(vueComponent) {
        return vueComponent.$vnode && vueComponent.$vnode.componentInstance && vueComponent.$vnode.componentInstance.$options.__file;
    },
    getComponentSourceName (vueComponent) {
        if (!this.isEditable(vueComponent)) {
            return null;
        }
        return vueComponent.$vnode.componentInstance.$options.__file;
    },
    wrapEditableComponent  (vueComponent) {
        const dnd = dragAndDrop;

        const componentFile = this.getComponentSourceName(vueComponent);
        var designerOptions = {
            'componentFile'       : componentFile,
            'componentFileSource' : null,
            'componentName'       : vueComponent.$options.name,
            'componentTag'        : vueComponent.$options._componentTag,
            'elementTag'          : vueComponent.$el.tagName,
            'nodeNS'              : vueComponent.$vnode.ns,
            'menuComponent'       : null,
            'menuElement'         : null,
            'vueComponent'        : vueComponent
        };
        

        vueComponent.$el.__designer = designerOptions;
        //this.createComponentMenu(designerOptions);

        if (!vueComponent.$el.id) {
            vueComponent.$el.id = designerOptions.componentFile;
        }
        // INJECT EVENTS
        vueComponent.$el.addEventListener('mouseover', this.showComponentMenu, false);
        vueComponent.$el.addEventListener('mouseout', this.hideComponentMenu, false);

        //dndMarker.dndMarker.XXX_initInOutChilds(vueComponent.$el);


        // INSERT COMMENT
        designerOptions.___comment = this.insertComment(vueComponent, designerOptions);

        // DRAG AND DROP
        
        /*var ondropOriginal = dnd.dragDrop.onDrop;
        dnd.dragDrop.onDrop = function (e) {
            console.log('before drop');
            ondropOriginal(e);
            console.log('after drop');
        }*/
        dnd.dragDrop.initElement(vueComponent.$el);
    },
    unwrapEditableComponent (vueComponent)
    {
        if (!this.isEditable(vueComponent)) {
            return null;
        }
        designerOptions = vueComponent.$el.__designer;
        if (designerOptions.___comment) {
            designerOptions.___comment.remove()
        }
        vueComponent.$el.__designer = null;
    },
    createComponentMenu (designerOptions){
        var menuId = designerOptions.componentFile;
        var menuInstance = document.getElementById(menuId);
        if (menuInstance) {
            return menuInstance;
        }
        //console.log('createContainerMenu => ' + menuId);
        var ComponentClass = Vue.extend(componentContextMenu);
        var menuInstance = new ComponentClass({
            propsData: { id: menuId},
            data: function () { return { cName: menuId } }
        })
        menuInstance.$mount();
        designerOptions.menuComponent = menuInstance;
        designerOptions.menuElement   = menuInstance.$el;
        designerOptions.menuElement.__designer = designerOptions;
        //document.getElementsByTagName('body')[0].appendChild(menuInstance.$el); // insert to document body
        //designerOptions.__vue__.$el.insertBefore(menuInstance.$el, designerOptions.__vue__.$el.children[0]); // insert to top
        designerOptions.vueComponent.$el.appendChild(menuInstance.$el); // insert to bottom

        menuInstance.$el.style.backgroundColor = "white";
        menuInstance.$el.style.borderStyle = "solid";
        menuInstance.$el.style.borderColor = "red";
        menuInstance.$el.style.borderWidth = "5px";
        
        menuInstance.$el.style.position = "absolute";
        menuInstance.$el.style.display= "none";

        return menuInstance;
    },
    showComponentMenu (mouseEvent) { // onmousover

        this.style.outline='red dotted 2px'
        this.style.outlineOffset='5px;'

        if (this.__designer && this.__designer.menuComponent) {
            var menuElement = this.__designer.menuComponent.$el;
            menuElement.style.display= "block";
            var menuElementClientRect = this.getBoundingClientRect();
            menuElement.style.top = (menuElementClientRect.top - menuElement.clientHeight - 5 - 6) + 'px';
            menuElement.style.left = (menuElementClientRect.left) + 'px';
        }
    },
    hideComponentMenu (mouseEvent) {
        
        this.style.outline=''
        this.style.outlineOffset=''

        if (this.__designer && this.__designer.menuComponent) {
            var menuElement = this.__designer.menuComponent.$el;
            menuElement.style.display= "none";
        }
    },
    insertComment (vueComponent, designerOptions) {
        //this.___TMP___sleep(400);
        var d = new Date();
        var comment = d.getSeconds() + ':' + d.getMilliseconds() + ' *** ';
        comment = comment + 'componentFile = '  + designerOptions.componentFile + '; ';
        comment = comment + 'componentName = '  + designerOptions.componentName + '; ';
        //comment = comment + 'nodeNS = '         + designerOptions.nodeNS + '; ';
        //comment = comment + 'componentTag = '   + designerOptions.componentTag + '; ';
        //comment = comment + 'elementTag = '     + designerOptions.elementTag + '; ';
        //comment = comment + 'id = '             + designerOptions.id;

        var comment = document.createComment(comment);
        vueComponent.$el.parentNode.insertBefore(
            comment,
            vueComponent.$el
        );
        return comment;
    },
    ___TMP___sleep (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    },
}
export default {
    designerCore
}