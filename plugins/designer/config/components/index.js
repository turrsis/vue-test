var config = {
    categories: {
        html: require('@/plugins/designer/config/components/html/index.js').default,
        vue: require('@/plugins/designer/config/components/vue/index.js').default,
        vuetify: require('@/plugins/designer/config/components/vuetify/index.js').default,
        users: require('@/plugins/designer/config/components/users/index.js').default
    },
    byName: {},
    byCategory: {}
}
for(var categoryName in config.categories) {
    var category = config.categories[categoryName]
    config.byCategory[categoryName] = {}
    for(var tagName in category.tags) {
        var tag = category.tags[tagName]
        config.byName[tag.name] = categoryName
        config.byCategory[categoryName][tag.name] = tag.title
    }
}
export default config