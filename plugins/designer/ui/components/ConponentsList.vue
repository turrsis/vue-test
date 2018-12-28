<template>
    <div id="ConponentsList" class="ConponentsList">
        <ul v-for="(component, name) in components" v-bind:key="name">
            <li>{{ component.title }}
                <ul>
                    <li v-for="(tag, tagName) in component.tags" v-bind:key="tagName" :title="tag.title">
                        <span draggable v-bind:cname="tagName"> {{ tagName }} </span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'ConponentsList',
    data: () => {
        return {
            components: Vue.designer.config.components.categories
        }
    },
    mounted () {
        for (let i = 0; i < this.$el.children.length; i++) {
            var ul1 = this.$el.children[i]
            for (let ii = 0; ii < ul1.children.length; ii++) {
                var li2 = ul1.children[ii]
                for (let iii = 0; iii < li2.children.length; iii++) {
                    var li3 = li2.children[iii]
                    for (let iiii = 0; iiii < li3.children.length; iiii++) {
                        var span = li3.children[iiii].firstElementChild
                        span.__designer = {
                            type: 'component',
                            name: span.attributes.cname.value
                        }
                        span.removeAttribute('cname')
                        Vue.designer.dnd.init(span)
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.ConponentsList {
    border: solid gray 1px;
}
</style>
