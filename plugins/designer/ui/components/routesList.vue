<template>
    <div id="RoutesList" class="RoutesList">
        routes list
        <div v-for="(route, index) in routes" v-bind:key="index">
            <a :href="route.path">{{ route.name }}</a><br>
        </div>
    </div>
</template>

<script>

export default {
    name: 'RoutesList',
    data: () => {
        return {
            routes: $nuxt.$options.router.options.routes
        }
    },
    mounted () {

    }
}
</script>

<style scoped>
.RoutesList {
    border: solid gray 1px;
}
</style>
