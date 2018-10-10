<template>
    <div id="TestDND">
        <TestDNDSortable></TestDNDSortable>
        <TestDNDFlexBox></TestDNDFlexBox>
        <TestDNDCss2></TestDNDCss2>
    </div>
</template>

<script>
// @ is an alias to /src
import TestDNDCss2 from '@/views/test/TestDNDCss2.vue'
import TestDNDFlexBox from '@/views/test/TestDNDFlexBox.vue'
import TestDNDSortable from '@/views/test/TestDNDSortable.vue'
import core from '@/plugins/designer/dnd/dndCore.js'

export default {
    name: 'TestDND',
    components: {
        TestDNDCss2,
        TestDNDFlexBox,
        TestDNDSortable
    },
    mounted: function () {
        // core.dnd.initElement(this.$el, root)
        this.$el.addEventListener('drag', core.dnd.onDrag, true)
        this.$el.addEventListener('drop', core.dnd.onDrop, false)
        this.$el.addEventListener('dragstart', core.dnd.onDragStart, false)
        this.$el.addEventListener('dragend', core.dnd.onDragEnd, false)
        this.$el.addEventListener('dragenter', core.dnd.onDragEnter, false)
        this.$el.addEventListener('dragleave', core.dnd.onDragLeave, false)
        this.$el.addEventListener('dragover', core.dnd.onDragOver, false)
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ' + this.$el.id)
    }
}
</script>

<style>
.template {
    border: solid lightseagreen 3px;
}
</style>
