<template>
    <div class="container" style="margin: 10px; padding: 10px;">
        <div id="container_inner_div">
            <p id="container_inner_p_01">prefix</p>
            <slot id="container_inner_slot_02"> <div id="innerDIVSlot">Container Component</div></slot>
            <p id="container_inner_p_03">suffix</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContainerTwo'
    /* render (createElement) {
        return createElement('h' + this.level, 'xxxx')
    } */
}
</script>
