const babelParser = require('@babel/parser')
const babelGenerator = require('@babel/generator')
const ts = require('typescript')

class ScriptParser {
    print (ast) {
        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed
        });
        return printer.printNode(
            ts.EmitHint.Unspecified,
            ast
        );
    }
    parseString (code) {
        var qq = ts.SyntaxKind
        const ast = ts.createSourceFile(
            'xxx', 
            code,  
            ts.ScriptTarget.ES2015,
            false,
            ts.ScriptKind.Unknown
        );
        return ast
    }
    parseString2 (code) {
        var ast = babelParser.parse(code, {
            // ranges: false,
            tokens: true,
            allowImportExportEverywhere: true,
            sourceType: 'script'
        })
        return ast
    }

    scriptGetComponents (ast) {
        var componentNames = []
        var q1 = ast.statements
        /* var componentNames = this.findInBabelAST(ast, [
            { type: 'ExportDefaultDeclaration'},
            { type: 'ObjectProperty', keyType: 'Identifier', keyName: 'components'},
        ])
        componentNames = componentNames[0].reduce((result, node) => {
            result.push(node.value.name)
            return result
        }, [])
        var imports = this.findInBabelAST(ast, [
            { type: 'ImportDeclaration'}
        ])
        return componentNames */
    }

    findInAST(ast, path) {
        const eq = function (node, path) {
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
        var result = []
        var current = ast.program.body
        while (path.length) {
            let pathCurr = path.shift()
            let found = false
            for (let i = 0; i < current.length; i++) {
                let currentNode = current[i]
                if (!eq(currentNode, pathCurr)) {
                    continue
                }
                // -------------
                if (currentNode.type == 'ExportDefaultDeclaration') {
                    current = currentNode.declaration.properties
                } else if (currentNode.type == 'ObjectProperty') {
                    current = currentNode.value.properties
                } else {
                    current = currentNode
                }
                // -------------
                found = true
                /* if (!path.length) {
                    result.push(current)
                } */
                break
            }
            if (!found) {
                return
            }
        }
        return current
        // return result
    }
}

module.exports = new ScriptParser()