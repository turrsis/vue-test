import dndMarker from '~/plugins/designer/dnd/dragAndDropMarker.js';

var dragDrop = {
    dragLock : {x:0,y:0},
    initElement: function (element) {
		if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        element.draggable   = "true";
        element.ondragstart = this.onDragStart;
        element.ondrop      = this.onDrop;
        element.ondragover  = this.onDragOver;
        element.ondrag      = this.onDrag;
    },
    onDragStart(e) {
        e.stopPropagation();

        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.setData("originalPosition", e.target.style.position);

        dragDrop.XXX_logEvent(e);
    },
    onDrag (e) {
        e.stopPropagation();

        var X = e.clientX;
        var Y = e.clientY;
        /*if (dragDrop.dragLock.x == X && dragDrop.dragLock.y == Y) {
            return;
        } else {
            dragDrop.dragLock.x = X;
            dragDrop.dragLock.y = Y;
        }*/

        dndMarker.dndMarker.showMarkerForPoint (X, Y);

        e.target.style.left     = (X + window.scrollX) + 'px';
        e.target.style.top      = (Y + window.scrollY) + 'px';
        e.target.style.position = 'absolute';

        //dragDrop.XXX_logEvent(e, '; left:' + e.target.style.left + '; top:' + e.target.style.top);
        
    },
    onDragOver(e) {
        e.preventDefault();
        e.stopPropagation();

        //dragDrop.XXX_logEvent(e);
    },
    onDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        dndMarker.dndMarker.hideMarker();

        var draggedElement = document.getElementById(e.dataTransfer.getData("text"));
        draggedElement.style.position = e.dataTransfer.getData("originalPosition");

        var pointElements = dndMarker.dndMarker.getElementsAroundPoint(e.clientX, e.clientY);
        if (pointElements.left || pointElements.right) {
            e.target.insertBefore(draggedElement, pointElements.right);
        } else if (pointElements.top || pointElements.bottom) {
            e.target.insertBefore(draggedElement, pointElements.bottom);
        }

        dragDrop.XXX_logEvent(e, dndMarker.dndMarker.XXX_elementsLogString(pointElements));
    },

    XXX_lockLogEvent : null,
    XXX_logEvent(e, suffix) {
        var log = e.type + ' -> ';
        log += 'target:' + (e.target ? e.target.id : 'null') + '; ';
        log += 'currentTarget :' + (e.currentTarget ? e.currentTarget.id : 'null') + '; ';
        log += 'fromElement:' + (e.fromElement ? e.fromElement.id : 'null') + '; ';
        log += 'toElement:' + (e.toElement ? e.toElement.id : 'null') + '; ';
        if (this.XXX_lockLogEvent != log) {
            this.XXX_lockLogEvent = log;
            console.log(log + (suffix ? '; suffix :: ' + suffix : ''));
        }
    }
}
export default {dragDrop};