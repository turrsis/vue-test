const fs = require('fs');
const vueLoader = require('vue-loader');
const vueCompiler = require('vue-template-compiler');


module.exports = {
    getComponentSource (url, response) {
        var __filename = url.query.component;
        var data = null;
        var status = 200;
        try{
            data = fs.readFileSync(__filename, 'utf8');
            var compiled = this.injectDesignerAttribute(data, __filename);


            var parsed = vueCompiler.parseComponent(data, {
                comments:true,
                preserveWhitespace:false,
                shouldKeepComment:true
                //pad:true
            });

            parsed.template.content = this.astToTemplate(compiled.ast);


            var data2 = this.assemblyParsed(parsed, data);

            //var data2 = this.astToTemplate(compiled.ast);
            data += "\n\n\n\n==================================================================================\n" + data2;
        } catch(e) {
            //console.error(e);
            status = 500;
            data = e.message;
        }
        response.writeHead(status, {
            'Content-Type': 'text/plain',
            'charset':'utf-8',
            'X-Powered-By': 'designer'
        });
        response.write(data);
        response.end();
    },
    
    assemblyParsed(parsed, original) {
        var sorted = [];
        var parsedNames = Object.getOwnPropertyNames(parsed);
        for (i in parsedNames) {
            var key = parsedNames[i];
            if (Array.isArray(parsed[key])) {
                Array.prototype.push.apply(sorted, parsed[key]);
            } else {
                sorted.push(parsed[key]);
            }
        }
        sorted.sort((a, b) => {
            return a.start - b.start;
        });
        var result = '';
        for (iii in sorted) {
            let obj = sorted[iii];
            let originalStart = (iii == 0) ? 0 : sorted[iii-1].end;
            
            result += original.substr(originalStart, obj.start - originalStart);
            result += obj.content;
            if (iii == sorted.length - 1) {
                result += original.substr(obj.end);
            }
            /*let objStr = "<" + obj.type;
            for (attrKey in obj.attrs) {
                objStr += ' ' + attrKey + '="' + obj.attrs[attrKey] + '"';
            }
            objStr += ">";
            var prefixLen = objStr.length;
            objStr += obj.content + "</" + obj.type + ">";
            if (iii > 0) {
                var shift = sorted[iii].start - sorted[iii-1].end - prefixLen - (sorted[iii-1].type.length + 3);
                objStr = "\n".repeat(shift) + objStr;
            }
            result += objStr + "";*/
        }
        return result;
    },
    setComponentSource (url, data, response) {
        response.writeHead(200, {
            'Content-Type': 'text/plain',
            'charset':'utf-8',
            'X-Powered-By': 'designer'
        }).write('not implemented').end();
    },
    injectDesignerAttribute(template, file) {
        var injector = function (obj) {
            if (obj.tag != 'template' && obj.attrsMap) {
                obj.attrsMap.designer = 'xxx';
                if (!obj.attrs) {
                    obj.attrs = [];
                }
                obj.attrs.push({
                    name:'designer',
                    value:'xxx'
                });
                if (!obj.attrsList) {
                    obj.attrsList = [];
                }
                obj.attrsList.push({
                    name:'designer',
                    value:'xxx'
                });
            }
            if (obj.children) {
                obj.children.forEach(element => {
                    injector(element);
                });
            }
        };

        var parsed = vueCompiler.parseComponent(template);
        
        var compiled = vueCompiler.compile(parsed.template.content, {
            comments:true,
            preserveWhitespace:false,
            //shouldDecodeNewlines:true,
            directives: {
                test (node, directiveMeta) {
                    injector(node);
                }
            }
        });
        

        /*var jj = require("babylon").parse(parsed.template.content, {
            // parse in strict mode and allow module declarations
            sourceType: "module",  
            plugins: [
              // enable jsx and flow syntax
              "jsx",
              "flow"
            ]
        });*/

        return compiled;
    },
    astToTemplate(node, prefix) {
        // node.type === 2   // expression
        // node.type === 3   // text

        prefix = prefix ? prefix : '';

        if (node.type == 2) { // expression
            return node.text;
        }

        if (node.type == 3) { // text
            /*if (!node.text.trim()) {
                return prefix + "=EMPTY=";
            }*/
            if (node.isComment) {
                return prefix + "<!--" + node.text + "-->";
            }
            return prefix + node.text;
        }

        var result = prefix + "<" + node.tag;
        if (node.attrsMap) {
            for (var attr in node.attrsMap) {
                result += ' ' + attr;
                if (node.attrsMap[attr]) {
                    result += '="' + node.attrsMap[attr] + '"';
                }
            }
        }
        result += ">";

        if (node.children) {
            node.children.forEach( (child, i, arr) => {
                result += "\n" + this.astToTemplate(child, prefix + '    ');
                //result += this.astToTemplate(child, "\n" + prefix + '    ');
                if (i < arr.length - 1) {
                    //tpl += "\n";
                }
            }, this);
        }
        result += "\n" + prefix + "</" + node.tag + ">";
        return result;
    }

}