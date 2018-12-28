<template>
    <div id='INDEX_PAGE_Q!' v-designer.INDEX="{'dragOut': true, 'dragIn': true}">
        <h1>Hello world!222</h1>
        <nuxt-link to="/test">Home page</nuxt-link>
    </div>
</template>

<script>
function ll (context) {
    return 'default'
}
export default {
    name: 'index',
    layout (context) {
        return 'layout2'
    },
    middleware: function(q) {
        //console.log('index page middleware')
    }
}
</script>