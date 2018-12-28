const babelParser = require('@babel/parser')
import Printer from '@babel/generator/lib/printer.js'

class ScriptParser {
    parseString (code) {
        return babelParser.parse(code, {
            // ranges: false,
            tokens: true,
            allowImportExportEverywhere: true,
            sourceType: 'script'
        })
    }

    moveComponentDeclaration (target, source, sourceElement) {
        var result = false
        var targetComponents = this.scriptGetComponents(target.compiled.script)
        var sourceComponents = this.scriptGetComponents(source.compiled.script)
        var sourceComponentsUsage = this.getComponentUsage(source.compiled.template.ast, sourceComponents.values)
        var sourceElementUsage = this.getComponentUsage(sourceElement, sourceComponents.values)
        var sourceElementUsageEntries = Object.entries(sourceElementUsage)
        for (let i = 0; i < sourceElementUsageEntries.length; i++) {
            let componentName = sourceElementUsageEntries[i][0]
            let componentNode = sourceElementUsageEntries[i][1]
            if (targetComponents.values[componentName]) { // already exist - do nothing
                continue
            }
            if (componentNode.count <= sourceComponentsUsage[componentName].count) { // copy
                result = true
                target.compiled.script.program.body.splice(0, 0, sourceComponents.values[componentName].import) // add import
                targetComponents.components.value.properties.push(sourceComponents.values[componentName].node) // add component
            }
            if (componentNode.count == sourceComponentsUsage[componentName].count) { // remove
                for (let i = 0; i < sourceComponents.components.value.properties.length; i++) { // remove component
                    let curr = sourceComponents.components.value.properties[i]
                    if (curr.key.name == componentName) {
                        result = true
                        sourceComponents.components.value.properties.splice(i, 1)
                        break
                    }
                }
                for (let i = 0; i < source.compiled.script.program.body.length; i++) { // remove import
                    let curr = source.compiled.script.program.body[i]
                    if (curr.type != 'ImportDeclaration') {
                        continue
                    }
                    if (curr.specifiers.length == 1 && curr.specifiers[0].local.name == componentName) {
                        result = true
                        source.compiled.script.program.body.splice(i, 1)
                        break
                    }
                }
            }
        }
        return result
    }

    getComponentUsage (node, components, result) {
        result = result || {}
        if (!node.children || !components) {
            return result
        }
        if (!Array.isArray(components)) {
            components = Object.getOwnPropertyNames(components)
        }
        if (components.indexOf(node.tag) !== -1) {
            if (!result[node.tag]) {
                result[node.tag] = {
                    count: 0,
                    nodes: []
                }
            }
            result[node.tag].count += 1 
            result[node.tag].nodes.push(node)
        }
        for (let i = 0; i < node.children.length; i++) {
            let current = node.children[i]
            this.getComponentUsage(current, components, result)
        }
        return result
    }

    scriptGetComponents (ast) {
        var imports = this.findInASTNode(ast.program, 'ImportDeclaration')
        var components = this.findInAST(ast, [
            { type: 'ExportDefaultDeclaration'},
            { type: 'ObjectProperty', keyType: 'Identifier', keyName: 'components'},
        ])
        var componentsValues = null
        if (components) {
            componentsValues = components.value.properties.reduce((result, node) => {
                let componentName = node.value.name
                result[componentName] = {
                    node: node,
                    import: null
                }
                for (let ii in imports) {
                    let importNode = imports[ii]
                    if (componentName == importNode.specifiers[0].local.name) {
                        result[componentName].import = importNode
                        break
                    }
                }
                return result
            }, {})
        }
        return {
            imports: imports,
            components: components,
            values: componentsValues
        }
    }

    findInASTNode (node, type, keyType, keyName) {
        var result = []
        var found = {
            type: type,
            keyType: keyType,
            keyName: keyName
        }
        var childs = this.fingAST_GetChildObject(node)
        for (let i = 0; i < childs.length; i++) {
            let current = childs[i]
            if (!this.findEqualNode(current, found)) {
                continue
            }
            result.push(current)
        }
        return result.length ? result : null
    }
    findEqualNode (node, path) {
        if (path.type && path.type != node.type) {
            return false
        }
        if (path.keyType && path.keyType != node.key.type) {
            return false
        }
        if (path.keyName && path.keyName != node.key.name) {
            return false
        }
        return true
    }
    findInAST (ast, path) {
        var current = ast.program
        while (path.length) {
            let pathCurr = path.shift()
            let found = false
            current = this.fingAST_GetChildObject(current)
            for (let i = 0; i < current.length; i++) {
                let currentNode = current[i]
                if (this.findEqualNode(currentNode, pathCurr)) {
                    current = currentNode
                    found = true
                    break
                }
            }
            if (!found) {
                return
            }
        }
        return current
    }

    fingAST_GetChildObject (node) {
        if (node.type == 'Program') {
            return node.body
        }
        if (node.type == 'ExportDefaultDeclaration') {
            return node.declaration.properties
        }
        if (node.type == 'ObjectProperty') {
            return node.value.properties
        }
        return node
    }
    print (ast) {
        var opts = {
            comments: true,
            shouldPrintComment: (() => format.comments)
        }
        const format = {
            auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
            auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
            shouldPrintComment: opts.shouldPrintComment,
            retainLines: opts.retainLines,
            retainFunctionParens: opts.retainFunctionParens,
            comments: opts.comments == null || opts.comments,
            compact: opts.compact,
            minified: opts.minified,
            concise: opts.concise,
            jsonCompatibleStrings: opts.jsonCompatibleStrings,
            indent: {
              adjustMultilineComment: true,
              style: '    ',
              base: 0
            },
            decoratorsBeforeExport: !!opts.decoratorsBeforeExport,
            jsescOption: Object.assign({
              quotes: "double",
              wrap: true
            }, opts.jsescOption)
        }
        var printer = new Printer(format)
        var printed = printer.generate(ast)
        printed.code = '\n' + printed.code + '\n'
        return printed
    }
}

module.exports = new ScriptParser()