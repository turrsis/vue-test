<template>
    <div
        id="TestDNDFlexBox"
        style="display: flex;justify-content: flex-start; flex-wrap: wrap; flex-direction: row;"
        class="template"
    >
        <div id="r01" class="size-r2x2 flex f-rows">
            <div id="r01-01" style="" class="dndLeft dndRight">r01-01</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'TestDNDFlexBox',
    components: {
    }
}
</script>

<style>
/* ======================================================================== */
.size-r2x2 {
    width: 200px;
}
.size-c2x2 {
    height: 150px;
    width: 200px;
}
/* ======================================================================== */
.flex {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    border: solid gray 1px;
    padding: 10px;
    margin: 10px;
}
.flex div {
    padding: 10px;
    margin: 10px;
}
.f-rows {
    flex-direction: row;
}
.f-columns {
    flex-direction: column;
}
.f-columns div {
    flex-basis: 20px;
    border: solid lightblue 1px;
}
.f-rows div {
    flex-basis: 50px;
    border: solid blue 1px;
}
.f-w-reverse {
    flex-wrap: wrap-reverse;
}
.f-d-r-reverse {
    flex-direction: row-reverse;
}

.justify-flex-end {
    justify-content:flex-end
}
.f-d-c-reverse {
    flex-direction: column-reverse;
}
/* ======================================================================== */
.dndLeft {
    border-left: solid darkgreen 2px !important;
}
.dndRight {
    border-right: solid darkgreen 2px !important;
}
.dndTop {
    border-top: solid darkgreen 2px !important;
}
.dndBottom {
    border-bottom: solid darkgreen 2px !important;
}
/* ======================================================================== */
</style>
