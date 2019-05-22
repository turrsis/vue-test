<template>
        <div 
        id="TestDNDSortable"
        class="sortableList"
        style="width:400px"
    >
        <div id="list01-01" draggable>list01-01</div>
        <div id="list01-02" draggable>list01-02</div>
        <div id="list01-03" draggable>list01-03</div>
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
