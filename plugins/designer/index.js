import Vue from 'vue'
import Vuetify from 'vuetify'
import Designer from '@/plugins/designer/designer.js'
import config from '@/plugins/designer/config/config.js'
import 'vuetify/dist/vuetify.min.css'

const designer = new Designer()
Vue.designer = designer

Vue.use(Vuetify)

Vue.use({
    install: function (Vue, options) {
        Vue.config.productionTip = false
        Vue.directive(config.directives.name, designer.directives.directives.designer)
        Vue.mixin({
            mounted () {
                designer.initComponent(this)
                designer.initToolBox(this)
            },
            destroyed () {
                designer.directives.destroyComponent(this)
            }

            // beforeCreate () { if (this.$el) { console.log('Vue.mixin.beforeCreate : ' + this.$el.id) } },
            // created () { if (this.$el) { console.log('Vue.mixin.created : ' + this.$el.id) } },
            // beforeMount () { if (this.$el) { console.log('Vue.mixin.beforeMount : ' + this.$el.id) } },
            // mounted ()
            // beforeUpdate () { if (this.$el) { console.log('Vue.mixin.beforeUpdate : ' + this.$el.id) } },
            // updated () { if (this.$el) { console.log('Vue.mixin.updated : ' + this.$el.id) } },
            // activated () { if (this.$el) { console.log('Vue.mixin.activated : ' + this.$el.id) } },
            // deactivated () { if (this.$el) { console.log('Vue.mixin.deactivated : ' + this.$el.id) } },
            // beforeDestroy () { if (this.$el) { console.log('Vue.mixin.beforeDestroy : ' + this.$el.id) } },
            // destroyed ()
            // errorCaptured () { if (this.$el) { console.log('Vue.mixin.errorCaptured : ' + this.$el.id) } },
        });
    }
})

export default (context, inject) => {
    context.app.router.beforeEach((to, from, next) => {
        //to.matched[0].components.default.options.layout = 'default'
        next()
    })
}