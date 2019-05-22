<template>
    <div
        id="TestDNDVDirectives"
        style="width:400px"
        v-designer
    >
        <BlogPosts id="BlogPosts" p="0" v-for="post in posts03" v-bind:key="post.id" v-bind:post="post">
        </BlogPosts>
        <div id="ifTemplateBOX" p="1">
            <div id="ifTemplateBOX_head" p="1/0">head</div>
            <template id="itb0" v-if="testIf == 0" p="1/1">
                <template id="itb00" v-if="testIf == 0" p="1/1/0">
                    <template id="itb000" v-if="testIf == 0" p="1/1/0/0">
                        <span id="itb0000" p="1/1/0/0/0">Абзац  00</span>
                        <span id="itb0001" p="1/1/0/0/1">Абзац  01</span>
                    </template>
                </template>
                <template id="itb01" v-if="testIf == 0" p="1/1/1">
                    <span id="itb0000" p="1/1/1/0">Абзац  0-0</span>
                    <span id="itb0001" p="1/1/1/1">Абзац  0-1</span>
                </template>
            </template>
            <template id="itb1" v-else-if="testIf === 1" p="1/2">
                <span id="itb10" p="1/2/0">Абзац 10</span>
                <span id="itb11" p="1/2/1">Абзац 11</span>
            </template>
            <template id="itb2" v-else p="1/3">
                <span id="itb20" p="1/3/0">Абзац 20</span>
                <span id="itb21" p="1/3/1">Абзац 21</span>
            </template>
            <div id="ifTemplateBOX_foot" p="1/4">foot</div>
        </div>
        <div id="ifBOX" p="2">
            <div id="if0" v-if="testIf == 0" p="2/0">
                <span p="2/0/0">200</span>
                <span p="2/0/1">201</span>
            </div>
            <div id="elseif1" v-else-if="testIf === 1" p="2/1">
                <span p="2/1/0">210</span>
                <span p="2/1/1">211</span>
            </div>
            <div id="else" v-else p="2/2">
                <span p="2/2/0">220</span>
                <span p="2/2/1">221</span>
            </div>
        </div>
        <div id="footer" p="3">FOOTER</div>
        <div id="footer" p="4">FOOTER</div>
    </div>
</template>

<script>
// @ is an alias to /src
import BlogPosts from '@/components/BlogPosts.vue';
export default {
    name: 'TestDNDVDirectives',
    components: {
        BlogPosts
    },
    data: function () {
        return {
            testIf: 1,
            posts00: [],
            posts01: [{
                id: 1,
                title: 'post_01_01'
            }],
            posts02: [{
                id: 1,
                title: 'post_01_01'
            }, {
                id: 2,
                title: 'post_01_02'
            }],
            posts03: [{
                id: 1,
                title: 'post_02_01'
            }, {
                id: 2,
                title: 'post_02_02'
            }, {
                id: 3,
                title: 'post_02_03'
            }]
        };
    }
};
</script>

<style>
.sortableList div {
    border: solid lightseagreen 1px;
}
</style>
