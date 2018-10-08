function transformNode (el: ASTElement, options: CompilerOptions) {
    console.log("\n PRE_LOADER_MODULE : transformNode")
}
function preTransformNode (el: ASTElement, options: CompilerOptions) {
    console.log("\n PRE_LOADER_MODULE : preTransformNode")
}
  
export default {
    transformNode,
    preTransformNode
}