<template>
    <div
        id="TestDNDCss2"
        v-designer
        class="testdnd template"
    >

    
        <!-- ==================================================================================================== -->
        <div id="containers" class="containers">
            <ContainerTwo id="containersTwo_02" class="">
                <div id="containersTwo-02-p-external-slot" class="dndTop dndBottom">containersTwo_slot</div>
            </ContainerTwo>
            <ContainerOne id="containersOne_01" class="">
                <div id="containersOne-01-p-external-slot1" class="dndTop dndBottom">containersOne_slot</div>
            </ContainerOne>
        </div>
        <!-- ==================================================================================================== -->
        <div id="r00" class="rows2x2">
            <div id="r00-01" style="display:inline-block" class="dndLeft dndRight dndTop dndBottom">r00-01</div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ContainerOne from '@/components/ContainerOne.vue'
import ContainerTwo from '@/components/ContainerTwo.vue'

export default {
    name: 'TestDNDCss2',
    components: {
        ContainerOne,
        ContainerTwo
    }
}
</script>

<style>
.testdnd {
    border: solid gray 1px;
    padding: 10px;
    margin: 10px;
}
.testdnd div {
    border: solid blue 1px;
    padding: 10px;
    margin: 10px;
}

.rows2x2 {
    width: 200px;
    display: inline-block;
}
.rows2x2 div {
    width: 50px;
    height: 20px;
}
.rows3x3 {
    width: 300px;
    display: inline-block;
}
.rows3x3 div {
    width: 50px;
    height: 20px;
}

.columns2x2 {
    width: 200px;
    column-width: 50px;
    column-count: 2;
    display: inline-block;
}
.columns2x2 div {
    width: 50px;
    height: 20px;
    display: inline-block;
}
.columns3x3 {
    columns: 50px 3;
    width: 300px;
    display: inline-block;
}
.columns3x3 div {
    width: 50px;
    height: 20px;
    display: inline-block;
}

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

.nospace div {
  padding: 10px;
  margin: 0px;
}
#rows01 div {
    background-color: lightblue;
}
#rows02 div {
    background-color: lightcyan;
}
</style>
