<template>
    <div id='LAYOUT_MENU2' style="margin: 10px; padding: 10px;" v-designer.layout>
        <hr>1<hr>
        <nuxt id="nuxtTop" name="top"/>
        <hr>2<hr>
        <nuxt id="nuxtDefault"/>
        <hr>3<hr>
        <nuxt id="nuxtBottom" name="bottom"/>
        <hr>4<hr>
    </div>
</template>

<script>
//import Vue from 'vue'

export default {
    name: 'layout2',
    middleware: function(q) {},
    mounted () {}
}
</script>