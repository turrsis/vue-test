<template>
    <div id="containerTwo" class="containerTwo" style="margin: 10px; padding: 10px;" v-designer.false>
        <div id="containerTwo_inner_div01">
            containerTwo_inner_div01
        </div>
        <div id="containerTwo_inner_div02">
            <p id="containerTwo_inner_p01">prefix01</p>
            <div id="containerTwo_DIV_DIRECTIVE" v-designer>
                <p id="containerTwo_inner_p02_01">suffix01</p>
                <slot id="containerTwo_inner_slot">
                    <div id="containerTwo_inner_slot_div">Container Component</div>
                </slot>
                <p id="containerTwo_inner_p02_02">suffix02</p>
            </div>
            <p id="containerTwo_inner_p01">prefix02-</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContainerTwo'
}
</script>
