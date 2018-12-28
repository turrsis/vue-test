const parser = require('./parser.js')
const configEditor = require('./configEditor.js')

class TemplateEditorApi {
    insertComponent (query) {
        var target = parser.getComponent(query.target)
        var component = {
            tag: query.source.file,
            type: 1,
            plain: false,
            children: [],
            attrs: [],
            attrsList: [],
            attrsMap: {}
        }
        target.insertOwner.children.splice(target.insertIndex, 0, component)
        parser.saveComponent(target)
    }
    move (query) {
        var target = this.getComponent(query.target)
        var source = this.getComponent(query.source, target)
        var isEmptyRoute = target.element.node.__design.directive.modifiers.EmptyRoute === true
        if (isEmptyRoute) {
            var targetFile = 'components/' + query.page.component.replace('.vue', '_top.vue')
            target = this.getComponent({
                file: targetFile,
                path: '',
                position: 'internal',
                reverse: false,
                raw: {
                    tag: 'div',
                    id: 'XXX',
                    'v-designer.YYY': ''
                }
            })
            console.log('move to EmptyRoute')
        }
        // move
        parser.moveComponentElement(target, source)
        // save
        parser.saveComponent(target)
        if (isEmptyRoute) {
            var components = {}
            components[query.page.place] = targetFile
            configEditor.editRoute('pages\\index.vue', {components: components})
        }
        if (source.file != target.file) {
            parser.saveComponent(source)
        }
        return target.parsed.template.content + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + source.parsed.template.content
    }
    getComponent (query, result2) {
        var result = {
            file: query.file,
            path: query.path,
            raw: query.raw
        }

        if (result2 && result2.file == result.file) {
            result = result2
        } else {
            result = result.raw
                ? Object.assign(result, parser.createComponent(result.raw))
                : Object.assign(result, parser.parseComponent(result.file))
            result.compiled = parser.compileComponent(result.parsed)
        }

        var templateAST = result.compiled.template.ast
        result.element = parser.findElementByPath(templateAST, result.path)
        result.element.reverse = query.reverse
        result.element.position = query.position

        if (result.element.position == 'before') {
            result.insertIndex = result.element.index + (result.element.reverse ? 1 : 0)
            result.insertOwner = result.element.node.parent
        } else if (result.element.position == 'after') {
            result.insertIndex = result.element.index + (result.element.reverse ? 0 : 1)
            result.insertOwner = result.element.node.parent
        } else if (result.element.position  == 'internal') {
            result.insertOwner = result.insertOwner = result.element.node
        }

        return result
    }
}
module.exports = new TemplateEditorApi()
