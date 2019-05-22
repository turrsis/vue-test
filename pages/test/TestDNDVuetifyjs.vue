<template>
    <v-app
        id="vApp"
    >
        <v-btn id="v-btn" fab color="success">fab</v-btn>
    </v-app>
</template>

<script>
export default {
    name: 'TestDNDVuetifyjs',
    components: {

    },
    data: function () {
        return {
            testIf: 1,
            posts00: [],
            posts01: [{
                id: 1,
                title: 'post_01_01'
            }],
        };
    }
};
</script>

<style>
</style>
