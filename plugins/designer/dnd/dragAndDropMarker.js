var dndMarker = {
    marker:null,
    getMarker() {
        if (this.marker) {
            return this.marker;
        }
        this.marker = document.createElement("div");
        this.marker.id = "marker";

        this.marker.style.borderStyle = "groove";
        this.marker.style.borderColor = "red";
        this.marker.style.borderWidth = "2px";
        this.marker.style.height = "5px";
        this.marker.style.position = 'absolute';
        this.marker.style.backgroundColor = 'green';
        this.marker.style.pointerEvents = 'none';

        this.marker.style.display = 'none';
        document.body.appendChild(this.marker);
        return this.marker;
    },

    hideMarker() {
        this.marker.style.display = 'none';
        this.marker.remove();
        this.marker = null;
    },
    showMarkerForPoint (X, Y) {
        if (X instanceof MouseEvent) {
            Y = X.clientY;
            X = X.clientX;
        }
        var elements = this.getElementsAroundPoint(X, Y);
        if (!elements) {
            return;
        }
        var markerRect = this.getMarkerRect (elements);

        var marker = this.getMarker();
		marker.style.width = markerRect.w + 'px';
        marker.style.height = markerRect.h + 'px';
        marker.style.left = markerRect.l + 'px';
        marker.style.top = markerRect.t + 'px';
        marker.style.display = null;

        console.log(this.XXX_elementsLogString(elements));
    },
    // should be use 'e.clientX' and 'e.clientY' coordinates
    getElementsAroundPoint (X, Y) {
        if (X instanceof MouseEvent) {
            Y = X.clientY;
            X = X.clientX;
        }
        var element = document.elementFromPoint(X, Y);
        X += window.scrollX;
        Y += window.scrollY;

        if (!element) {
            return null;
        }
        var result = {
            left     : null,
            right    : null,
            top      : null,
            bottom   : null,
            element  : element
        };
        // detect environment
        for (var i in element.childNodes) {
            var child = element.childNodes[i];
            if (child.offsetWidth > 0 && child.offsetHeight > 0) {
                
                if (Y >= child.offsetTop && Y <= child.offsetTop + child.offsetHeight) {
                    if (X > child.offsetLeft + child.offsetWidth) {
                        result.left = child;
                    }
                    if (X < child.offsetLeft) {
                        if (!result.right || (result.right.offsetLeft > child.offsetLeft)) {
                            result.right = child;
                        }
                    }
                }

                if (X >= child.offsetLeft && X <= child.offsetLeft + child.offsetWidth) {
                    if (Y > child.offsetTop + child.offsetHeight) {
                        result.top = child;
                    }
                    if (Y < child.offsetTop) {
                        if (!result.bottom || (result.bottom.offsetTop > child.offsetTop)) {
                            result.bottom = child;
                        }
                    }
                }
            }
        }

        return result;
    },
    getMarkerRect (elements) {
        if (!elements) {
            return null;
        }
        var markerRect = { 
            isVertical : null,
            h:0,
            w:0,
            l:0,
            t:0 
        };

        if (elements.left && elements.right) {
            markerRect.isVertical = true;
        } else if (elements.top && elements.bottom) {
            markerRect.isVertical = false;
        } else if (elements.left || elements.right && !(elements.top && elements.bottom)) {
            markerRect.isVertical = true;
        } else if (elements.top || elements.bottom && !(elements.left && elements.right)) {
            markerRect.isVertical = false;
        }
        if (markerRect.isVertical) { // vertical
            markerRect.w = 5;
            if (elements.left && elements.right) {
                if (elements.left.offsetTop > elements.right.offsetTop) {
                    markerRect.t = elements.left.offsetTop;
                } else {
                    markerRect.t = elements.right.offsetTop;
                }


                markerRect.l = elements.left.offsetLeft + elements.left.offsetWidth;
                markerRect.l = markerRect.l + (elements.right.offsetLeft - markerRect.l)/2;


                if ((elements.left.offsetTop + elements.left.offsetHeight) > (elements.right.offsetTop + elements.right.offsetHeight)) {
                    markerRect.h = elements.left.offsetTop + elements.left.offsetHeight - markerRect.t;
                } else {
                    markerRect.h = elements.right.offsetTop + elements.right.offsetHeight - markerRect.t;
                }
            } else if (elements.left) {
                markerRect.t = elements.left.offsetTop;
                markerRect.l = elements.left.offsetLeft + elements.left.offsetWidth + markerRect.w;
                markerRect.h = elements.left.offsetHeight;
            } else if (elements.right) {
                markerRect.t = elements.right.offsetTop;
                markerRect.l = elements.right.offsetLeft - markerRect.w;
                markerRect.h = elements.right.offsetHeight;
            }
        } else { // horizontal
            markerRect.h = 5;
            if (elements.top && elements.bottom) {
                if (elements.top.offsetLeft < elements.bottom.offsetLeft) {
                    markerRect.l = elements.top.offsetLeft;
                } else {
                    markerRect.l = elements.bottom.offsetLeft;
                }


                markerRect.t = elements.top.offsetTop + elements.top.offsetHeight;
                markerRect.t = markerRect.t + (elements.bottom.offsetTop - markerRect.t)/2;


                if ((elements.top.offsetLeft + elements.top.offsetWidth) > (elements.bottom.offsetLeft + elements.bottom.offsetWidth)) {
                    markerRect.w = elements.top.offsetLeft + elements.top.offsetWidth - markerRect.l;
                } else {
                    markerRect.w = elements.bottom.offsetLeft + elements.bottom.offsetWidth - markerRect.l;
                }
            } else if (elements.top) {
                markerRect.l = elements.top.offsetLeft;
                markerRect.w = elements.top.offsetWidth;
                markerRect.t = elements.top.offsetTop + elements.top.offsetHeight + markerRect.h;
                
            } else if (elements.bottom) {
                markerRect.l = elements.bottom.offsetLeft;
                markerRect.w = elements.bottom.offsetWidth;
                markerRect.t = elements.bottom.offsetTop - markerRect.h;
            }
        }
        return markerRect;
    },
    XXX_elementsLogString(elements) {
        var log = '';
        log += " ELEMENTS = [ " + (elements.left
            ? "left : " + elements.left.id + "; x:" + (elements.left.offsetLeft + elements.left.offsetWidth)
            : "left : NULL;") + " ] ";
        log += " [ " + (elements.right
            ? "right : " + elements.right.id + "; x:" + elements.right.offsetLeft
            : "right : NULL;") + " ] ";
        log += " [ " + (elements.top
            ? "top : " + elements.top.id + "; "
            : "top : NULL; ") + " ] ";
        log += " [ " + (elements.bottom
            ? "bottom : " + elements.bottom.id + "; "
            : "bottom : NULL; ") + " ] ";
        return log;
    }
}

export default {dndMarker};