<template>
    <div id="toolBox" class="toolbox">
        <div id="head" class="head" @dragstart="onDragStart" @drag="onDrag" draggable>
            xx
        </div>
        <div id="body" class="body">
            <button v-on:click="onTestClick">Test</button>
            <RoutesList />
            <PropertiesEditor />
            <DomEditor />
            <ConponentsList />
        </div>
    </div>
</template>

<script>

var dnd = {
    initialX: 0,
    initialY: 0,
    onDragStart (e) {
        dnd.initialX = e.clientX - e.target.parentElement.offsetLeft
        dnd.initialY = e.clientY - e.target.parentElement.offsetTop
    },
    onDrag (e) {
        e.preventDefault()
        e.stopPropagation()
        if (e.clientX == 0 || e.clientY == 0) {
            return
        }
        var element = e.target.parentElement
        element.style.left = (e.clientX - dnd.initialX) + 'px'
        element.style.top = (e.clientY - dnd.initialY) + 'px'
    }
}
import Vue from 'vue'
import RoutesList from '@/plugins/designer/ui/components/RoutesList.vue'
import PropertiesEditor from '@/plugins/designer/ui/components/PropertiesEditor.vue'
import DomEditor from '@/plugins/designer/ui/components/DomEditor.vue'
import ConponentsList from '@/plugins/designer/ui/components/ConponentsList.vue'

export default {
    name: 'toolBox',
    components: {
        RoutesList,
        PropertiesEditor,
        DomEditor,
        ConponentsList
    },
    mounted: function (component) {
    },
    methods: {
        onDragStart: dnd.onDragStart,
        onDrag: dnd.onDrag,
        onTestClick (e) {
            var q1 = document.getElementsByClassName('EmptyRoute');
            var vvv = Vue
            /*var q = $route
            var designer = Vue.designer
            var routes = $nuxt.$options.router.options.routes
            var r6 = routes[6]
            var r6c = r6.components
            var v = Vue*/
            console.log('toolBox.onTestClick')
        }
    }
}
</script>

<style scoped>
.toolbox {
    border: solid gray 1px;
    background-color: aqua;
    min-width: 100px;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10000;
}
.head {
    background-color:blue;
    height: 20px;
}
.body {
    background-color:cornsilk;
    height: 100%;
}
</style>
