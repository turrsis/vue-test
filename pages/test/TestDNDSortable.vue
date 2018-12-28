<template>
        <div 
        id="TestDNDSortable"
        class="sortableList"
        style="width:400px"
        v-designer.TestDNDSortable="{'marker': 'element'}"
    >
        <div id="list01-01" draggable>list01-01</div>
        <div id="list01-02" draggable>list01-02</div>
        <div id="list01-03" draggable>list01-03</div>
        <div id="list01-04" draggable>list01-04</div>
        <div id="list01-05" draggable>list01-05</div>
        <div id="list01-06" draggable>list01-06</div>
        <div id="list01-07" draggable>list01-07</div>
        <div id="list01-08" draggable>list01-08</div>
        <div id="list01-09" draggable>list01-09</div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'TestDNDSortable',
    components: {
    }
}
</script>

<style>
.sortableList div {
    border: solid lightseagreen 1px;
    margin:0px;
}
</style>
