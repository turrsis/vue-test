//"use strict"

function __logParameters(prefix, el, options) {
    console.log('===================================================')
    console.log("\n vue-loader.options.compilerOptions.modules : " + prefix + "\n")
    if (options) {
        console.log("options = " + JSON.stringify(options) + "\n")
    }
    if (el) {
        for(var p in el) {
            if (p != "parent" && p != "children") {
                console.log(p + "  ==  " + JSON.stringify(el[p]) + "\n")
            }
        }
    }
    console.log('===================================================')
}
// transform an AST node before any attributes are processed
// returning an ASTElement from pre/transforms replaces the element
// preTransformNode: (el: ASTElement, options: CompilerOptions) => ?ASTElement;
function preTransformNode (el, options) {
    __logParameters('preTransformNode', el, options)
}

// transform an AST node after built-ins like v-if, v-for are processed
// transformNode: (el: ASTElement, options: CompilerOptions) => ?ASTElement;
function transformNode (el, options) {
    __logParameters('transformNode', el, options)
}

// transform an AST node after its children have been processed
// cannot return replacement in postTransform because tree is already finalized
// postTransformNode: (el: ASTElement, options: CompilerOptions) => void;
function postTransformNode (el, options) {
    //__logParameters('postTransformNode', el, options)
    //console.log("+\n")
    return
}

// generate extra data string for an element
// genData: (el: ASTElement) => string;
/*function genData (el) {
    console.log("\n vue-loader.options.compilerOptions.modules : genData\n")
}*/

// further transform generated code for an element
// transformCode?: (el: ASTElement, code: string) => string; 
function transformCode (el, code) {
    console.log('===================================================')
    console.log("\n vue-loader.options.compilerOptions.modules : transformCode\n")
    console.log(code)
    console.log('===================================================')
}

// AST properties to be considered static
// staticKeys?: Array<string>;

module.exports = {
    //preTransformNode,
    //transformNode,
    postTransformNode,
    //transformCode
}