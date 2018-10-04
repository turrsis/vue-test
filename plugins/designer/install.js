import designerCore from '~/plugins/designer/core.js';

function install (Vue, options) {
    let env = typeof process === 'undefined'
        ? 'production'
        : process.env.NODE_ENV
    var core = designerCore.designerCore;
    
    /*Vue.directive('designer', {
        // Когда привязанный элемент вставлен в DOM...
        bind: function (el, binding, vnode, oldVnode) {
            var q = '';
        }
    });*/
    Vue.mixin({
        /*init (vnode, hydrating, parentElm, refElm) {
            var q = '';
        },*/
        /*beforeCreate(q1, q2, q3, q4) {
            var q = '';
        },*/
        /*created(q1, q2, q3, q4) {
            var q = '';
        },*/
        mounted () {
            if (!core.isEditable(this)) {
                return;
            }
            core.wrapEditableComponent(this);
        },
        methods: {

        },
        destroyed () {
            core.unwrapEditableComponent(this);
        }
    });
}

export default {
  install
}