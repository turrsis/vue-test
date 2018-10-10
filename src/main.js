import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dnd from './plugins/designer/dnd/index.js'

Vue.config.productionTip = false

Vue.mixin({
    mounted () {
        dnd.mixin.componentOnMounted(this)
    },
    destroyed () {
        dnd.mixin.componentOnDestroy(this)
    },
    methods: {

    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
