<template>
    <v-app
        dark
        id="vApp"
        v-designer.BLOG="{'dragType': 'sortable', 'dragIn': true}"
    >
        <v-btn fab color="success">fab</v-btn>
        <v-btn depressed color="success">depressed</v-btn>
        <v-btn color="success">Success</v-btn>
        <v-btn round color="success">round</v-btn>
        <v-btn large>large</v-btn>
        <v-btn large round href="#">href</v-btn>
        <v-btn flat color="pink">
            <v-icon>icon</v-icon>
        </v-btn>
        <v-btn flat icon color="pink">
            <div>DIV</div>
        </v-btn>
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
