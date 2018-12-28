<template>
    <div
        id="TestDNDFlexBox"
        v-designer.TestDNDFlexBox="{'dragOut': true, 'dragIn': true}"
        style="display: flex;justify-content: flex-start; flex-wrap: wrap; flex-direction: row;"
        class="template"
    >
        <div id="r00" class="size-r2x2 flex f-rows">
            r00-00
        </div>
        <!-- AAA -->
        <div id="r01" class="size-r2x2 flex f-rows">
            <!-- BBB -->
            <div id="r01-01" style="" class="dndLeft dndRight">r01-01</div>
            <!-- CCC -->
        </div>
        <div id="r02" class="size-r2x2 flex f-rows">
            <div id="r02-01" style="" class="dndLeft dndRight">r02-01</div>
            <div id="r02-02" style="" class="dndLeft dndRight">r02-02</div>
        </div>
        <div id="r03" class="size-r2x2 flex f-rows">
            <div id="r03-01" style="" class="dndLeft dndRight">r03-01</div>
            <div id="r03-02" style="" class="dndLeft dndRight">r03-02</div>
            <div id="r03-03" style="" class="dndLeft dndRight">r03-03</div>
            <div id="r03-04" style="" class="dndLeft dndRight">r03-04</div>
        </div>
        <div id="r04" class="size-r2x2 flex f-rows">
            <div id="r04-01" style="" class="dndLeft dndRight">r04-01</div>
            <div id="r04-02" style="" class="dndLeft dndRight">r04-02</div>
            <div id="r04-03" style="" class="dndLeft dndRight">r04-03</div>
        </div>
        <div id="r05" class="size-r2x2 flex f-rows justify-flex-end">
            <div id="r05-01" style="" class="dndLeft dndRight">r05-01</div>
            <div id="r05-02" style="" class="dndLeft dndRight">r05-02</div>
            <div id="r05-03" style="" class="dndLeft dndRight">r05-03</div>
        </div>
        <div id="r06" class="size-r2x2 flex f-rows f-w-reverse">
            <div id="r06-01" style="" class="dndLeft dndRight">r06-01</div>
            <div id="r06-02" style="" class="dndLeft dndRight">r06-02</div>
            <div id="r06-03" style="" class="dndLeft dndRight">r06-03</div>
        </div>
        <div id="r07" class="size-r2x2 flex f-rows f-w-reverse justify-flex-end">
            <div id="r07-01" style="" class="dndLeft dndRight">r07-01</div>
            <div id="r07-02" style="" class="dndLeft dndRight">r07-02</div>
            <div id="r07-03" style="" class="dndLeft dndRight">r07-03</div>
        </div>
        <div id="r08" class="size-r2x2 flex f-rows f-d-r-reverse">
            <div id="r08-01" style="" class="dndLeft dndRight">r08-01</div>
            <div id="r08-02" style="" class="dndLeft dndRight">r08-02</div>
            <div id="r08-03" style="" class="dndLeft dndRight">r08-03</div>
        </div>
        <div id="r09" class="size-r2x2 flex f-rows justify-flex-end f-d-r-reverse">
            <div id="r09-01" style="" class="dndLeft dndRight">r09-01</div>
            <div id="r09-02" style="" class="dndLeft dndRight">r09-02</div>
            <div id="r09-03" style="" class="dndLeft dndRight">r09-03</div>
        </div>
        <div id="r10" class="size-r2x2 flex f-rows f-w-reverse f-d-r-reverse">
            <div id="r10-01" style="" class="dndLeft dndRight">r10-01</div>
            <div id="r10-02" style="" class="dndLeft dndRight">r10-02</div>
            <div id="r10-03" style="" class="dndLeft dndRight">r10-03</div>
        </div>
        <div id="r11" class="size-r2x2 flex f-rows f-w-reverse justify-flex-end f-d-r-reverse">
            <div id="r11-01" style="" class="dndLeft dndRight">r11-01</div>
            <div id="r11-02" style="" class="dndLeft dndRight">r11-02</div>
            <div id="r11-03" style="" class="dndLeft dndRight">r11-03</div>
        </div>
        <div id="r12" class="size-r2x2 flex f-rows f-w-reverse">
            <div id="r12-01" style="" class="dndLeft dndRight">r12-01</div>
            <div id="r12-02" style="" class="dndLeft dndRight">r12-02</div>
            <div id="r12-03" style="" class="dndLeft dndRight">r12-03</div>
            <div id="r12-04" style="" class="dndLeft dndRight">r12-04</div>
        </div>
        <div id="c01" class="size-c2x2 flex f-columns">
            <div id="c01-01" style="" class="dndTop dndBottom">c01-01</div>
            <div id="c01-02" style="" class="dndTop dndBottom">c01-02</div>
            <div id="c01-03" style="" class="dndTop dndBottom">c01-03</div>
        </div>
        <div id="c02" class="size-c2x2 flex f-columns f-w-reverse">
            <div id="c02-01" style="" class="dndTop dndBottom">c02-01</div>
            <div id="c02-02" style="" class="dndTop dndBottom">c02-02</div>
            <div id="c02-03" style="" class="dndTop dndBottom">c02-03</div>
        </div>
        <div id="c03" class="size-c2x2 flex f-columns f-d-c-reverse">
            <div id="c03-01" style="" class="dndTop dndBottom">c03-01</div>
            <div id="c03-02" style="" class="dndTop dndBottom">c03-02</div>
            <div id="c03-03" style="" class="dndTop dndBottom">c03-03</div>
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
