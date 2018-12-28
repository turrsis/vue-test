const vueCompiler = require('vue-template-compiler')
const scriptParser = require('./scriptParserBabel.js')
const ssrDirectives = require(__dirname + "/../../../directives/directives.ssr.js")
const fs = require('fs')
const utils = require(__dirname + '/../../../utils.js').default
const config = require(__dirname + '/../../../config/config.js').default

var assemblyOptions = {
    indent: 4,
    lineLen: 80,
    simpleTags: ['br'],
    purgedAtributes: [config.directives.attrName, config.directives.attrChilds],
    emptyAttributes: ['v-else', 'draggable', 'v-designer']
}

class Parser {
    saveComponent (component) {
        component.parsed.template.content = '\n' + this.assemblyAST(component.compiled.template.ast, assemblyOptions) + '\n'
        fs.writeFileSync(component.file, this.assemblyParsed(component))
    }
    moveComponentElement (target, source) {
        // move imports
        this.moveComponentDeclaration(target, source)
        // move element
        source.element.node.parent.children.splice(source.element.index, 1)
        source.element.node.parent = target.insertOwner
        target.insertOwner.children.splice(target.insertIndex, 0, source.element.node)
    }
    moveComponentDeclaration (target, source) {
        if (source.file == target.file) {
            return
        }
        if (!scriptParser.moveComponentDeclaration(target, source, source.element.node)) {
            return
        }

        target.parsed.script.content = scriptParser.print(target.compiled.script).code
        source.parsed.script.content = scriptParser.print(source.compiled.script).code
    }
    createComponent (attrs) {
        var raw = ''
        if (!attrs) {
            attrs = { tag: 'div' }
        }

        if (typeof attrs == 'string') {
            raw = attrs
        } else if (typeof attrs == 'object') {
            raw += '<template>' + '\n'
            raw += '    <' + attrs.tag + ' ' + this.assemblyAttributes (attrs) + '>\n'
            raw += '    </' + attrs.tag + '>\n'
            raw += '</template>' + '\n'

            raw += '<script>' + '\n'
            raw += '    export default {}' + '\n'
            raw += '</script>' + '\n'
        }
        return {
            raw: raw,
            parsed: vueCompiler.parseComponent(raw)
        }
    }
    parseComponent (filename) {
        var result = {}
        try {
            result.raw = fs.readFileSync(filename, 'utf8')
            result.parsed = vueCompiler.parseComponent(result.raw)
        } catch(e) {
            result = e.message
        }
        return result
    }
    compileComponent(parsedComponent) {
        return {
            template: vueCompiler.compile(parsedComponent.template.content, {
                outputSourceRange: true,
                comments: true,
                preserveWhitespace: false,
                shouldKeepComment: true,
                shouldDecodeNewlines: true,
                directives: ssrDirectives.default
            }),
            script: scriptParser.parseString(parsedComponent.script.content)
        }
    }

    findElementByPath (ast, path) {
        path = utils.trimLR(path, '/', '/')
        if (!path) {
            return {
                node: ast,
                index: null
            }
        }
        var pathArr = path.split('/')
        var result = ast
        var resultIndex = null
        for (let i = 0; i < pathArr.length; i++) {
            let pathCurr = '/' + pathArr.slice(0, i + 1).join('/')
            for (resultIndex in result.children) {
                let child = result.children[resultIndex]
                if (child.type != 1 || !child.__design) {
                    continue
                }
                if (child.ifConditions) {
                    for (let ifIndex in child.ifConditions) {
                        if (child.ifConditions[ifIndex].block.__design.path == pathCurr) {
                            result = child.ifConditions[ifIndex].block
                            child = null
                            break
                        }
                    }
                    if (!child) {
                        break
                    }
                }
                if (child.__design.path == pathCurr) {
                    result = child
                    break
                }
            }
        }
        if (result.__design && result.__design.path != '/' + path) {
            return
        }
        return {
            node: result,
            index: parseInt(resultIndex, 10)
        }
    }

    assemblyParsed(parsed) {
        var sorted = ["template", "script", "styles", "customBlocks"]
        return sorted.reduce((result, name) => {
            if (Array.isArray(parsed.parsed[name])) {
                Array.prototype.push.apply(result, parsed.parsed[name])
            } else {
                result.push(parsed.parsed[name])
            }
            return result
        }, []).sort((a, b) => {
            return a.start - b.start
        }).reduce((result, obj, index, sorted) => {
            let originalStart = (index == 0) ? 0 : sorted[index-1].end;
            
            result += parsed.raw.substr(originalStart, obj.start - originalStart);
            result += obj.content
            if (index == sorted.length - 1) {
                result += parsed.raw.substr(obj.end);
            }
            return result
        }, '')
    }

    assemblyAST(node, options, level) {
        if (node.__assembled) {
            return ''
        }
        node.__assembled = true
        level = level ? level : 1;
        var prefix = ' '.repeat(options.indent)
        var prefixLevel = prefix.repeat(level)

        if (node.type == 2) { // expression
            return node.text;
        }

        if (node.type == 3) { // text
            if (node.isComment) {
                return prefixLevel + '<!--' + node.text.replace(/\n/gm, '\n' + prefix) + '-->'
            }
            return node.text;
        }
        if (options.simpleTags.indexOf(node.tag) != -1) {
            return prefixLevel + '<' + node.tag + '>'
        }
        var result = prefixLevel + "<" + node.tag
        if (node.attrsMap) {
            options.purgedAtributes.forEach( (key) => { delete node.attrsMap[key] })
            let attrLen = 0
            let attributes = []
            for (let attr in node.attrsMap) {
                attrLen += attr.length + node.attrsMap[attr].length
                let canEmpty = options.emptyAttributes.indexOf(attr) !== -1
                attributes.push(attr + (node.attrsMap[attr] ? '="' + node.attrsMap[attr] + '"' : (canEmpty ? '' : '=""')))
            }
            if (attrLen > options.lineLen) {
                let nPrefix = '\n' + prefixLevel
                let nPrefix2 = nPrefix + '    '
                result += nPrefix2 + attributes.join(nPrefix2) + nPrefix
            } else {
                result += ' ' + attributes.join(' ')
            }
        }
        result += ">";
        for (var i = 0; i < node.children.length; i++) {
            var current = node.children[i]
            let assembled = ''
            if (current.ifConditions) {
                for(let iii = 0; iii < current.ifConditions.length; iii++) {
                    assembled += (iii == 0 ? '' : '\n') + this.assemblyAST(current.ifConditions[iii].block, options, level + 1)
                }
            } else {
                assembled = this.assemblyAST(current, options, level + 1)
            }

            let previous = i > 0 ? node.children[i-1] : null

            if (current.type == 3 && !current.isComment) {
                assembled = assembled.replace(/\n/gm, '\n' + prefix)
                assembled = utils.trimLR(assembled, null, ' ')
            } else if (previous && previous.type == 3 && !previous.isComment) {
                if (result.slice(-1) != '\n') {
                    assembled = utils.trimLR(assembled, ' ')
                }
            } else {
                assembled = "\n" + assembled
            }
            result += assembled
        }
        var lastChild = node.children[node.children.length - 1]
        if (lastChild && lastChild.type == 3 && !lastChild.isComment) {
            if (result.slice(-1) == '\n') {
                result += prefixLevel
            }
        } else {
            result += '\n' + prefixLevel
        }
        return result + '</' + node.tag + '>'
    }

    assemblyAttributes (attrs) {
        var result = ''
        for (let attr in attrs) {
            if (attr == 'tag' || assemblyOptions.purgedAtributes.indexOf(attr) !== -1) {
                continue
            }
            let canEmpty = assemblyOptions.emptyAttributes.indexOf(attr) !== -1
            let attrValue = attr + (attrs[attr] ? '="' + attrs[attr] + '"' : (canEmpty ? '' : '=""'))
            result += ' ' + attrValue
        }

        return result.trim()
    }
}

module.exports = new Parser()