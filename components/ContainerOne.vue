<template>
    <div id="containerOne" class="containerOne" style="margin: 10px; padding: 10px;" v-designer>
        <div id="containerOne_inner_div">
            <p id="containerOne_inner_p01">prefix</p>
            <slot id="containerOne_inner_slot">
                <div id="containerOne_inner_slot_div">Container Component</div>
            </slot>
            <p id="containerOne_inner_p02">suffix</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContainerOne'
}
</script>
