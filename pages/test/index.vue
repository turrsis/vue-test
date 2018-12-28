<template>
    <div id="TestDND" v-designer>
        <TestDNDFlexBox></TestDNDFlexBox>
        <TestDNDCss2></TestDNDCss2>
        <TestDNDVuetifyjs></TestDNDVuetifyjs>
        <TestDNDSortable></TestDNDSortable>
        <TestDNDVDirectives></TestDNDVDirectives>
    </div>
</template>

<script>
// @ is an alias to /src
import TestDNDCss2 from '@/pages/test/TestDNDCss2.vue'
import TestDNDFlexBox from '@/pages/test/TestDNDFlexBox.vue'
import TestDNDSortable from '@/pages/test/TestDNDSortable.vue'
import TestDNDVDirectives from '@/pages/test/TestDNDVDirectives.vue'
import TestDNDVuetifyjs from '@/pages/test/TestDNDVuetifyjs.vue'


export default {
    name: 'TestDND',
    layout: 'layout2',
    components: {
        TestDNDCss2,
        TestDNDFlexBox,
        TestDNDSortable,
        TestDNDVDirectives,
        TestDNDVuetifyjs
    }
}
</script>

<style>
.template {
    border: solid lightseagreen 3px;
}
</style>
