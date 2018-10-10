<template>
    <div id="layout" v-designer.OUTER="{'dragOut': true, 'dragIn': true}">
        <div id="d01" class="FLEX_ROW">
            <container id="container_01_01" class="FLEX_ROW_CHILD" v-designer.INNER="{'innerProp': true}">
                <span id="container_01_01_span" class="spanSlot">child 1-1</span>
            </container>
            <container id="container_01_02" class="FLEX_ROW_CHILD">
                <container id="container_01_02_SLOT" class="FLEX_ROW_CHILD">
                    <span id="container_01_02_SLOT_span" class="spanSlot">child 1-2 slot</span>
                </container>
            </container>
        </div>
        <div id="d02" class="FLEX_ROW">
            <container id="container_02_01" class="FLEX_ROW_CHILD">
                <span id="container_02_01_span" class="spanSlot">child 2-1</span>
            </container>
            <container id="container_02_02" class="FLEX_ROW_CHILD">
                <span id="container_02_02_span" class="spanSlot">child 2-2</span>
            </container>
        </div>
    </div>
</template>

<style>
.spanSlot {
    margin: 10px; padding: 10px;
    border: solid green 2px;
}
.hello {
    border: dotted black 2px;
    margin: 20px; padding: 20px;
    /*float: right;*/
}
.container {
    border: dotted black 2px;
    margin: 20px; padding: 20px;
    /*float: right;*/
}
.FLEX_ROW {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    margin: 10px; padding: 10px;
    border: solid blue 3px;
}
.FLEX_ROW_CHILD {
    /*float: left;*/

    margin: 0px; padding: 0px;
    border: dotted blue 2px;
    /* width:100px; */
}
.FLEX_COLUMN {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    margin: 10px; padding: 10px;
    border: solid orange 3px;
}
.FLEX_COLUMN_CHILD {
    float: left;

    margin: 0px; padding: 0px;
    border: dotted orange 2px;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import container from '@/components/container.vue'

export default {
    name: 'home',
    components: {
        HelloWorld,
        container
    }
}
</script>
