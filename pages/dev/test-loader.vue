<template>
    <div>
        <textarea id="t-input" rows="20" cols="100" :value="input"></textarea>
        <br><br><br>
        <button id="b-compile" @click="compile">Compile</button>
        <br><br><br>
        <textarea id="t-output" rows="20" cols="100" :value="output"></textarea>
    </div>
</template>

<script>
    const compiler = require('vue-template-compiler')

    var tpl =  '<div>'+
               '<aa/>'+
               '    <textarea id="input" rows="20" :value="input" cols="100"></textarea>\n'+
               '<div>'

    var q = compiler.compile(tpl, {
        directives: {
            test (node, directiveMeta) {
                alert('aaa');
                // transform node based on directiveMeta
            }
        },
        comments:false
    });
    
    var tpl_jj = "import AppLogo from '~/components/AppLogo.vue'\n"
                +'export default {components: {AppLogo}, f:function(){return true;}}'
    var jj = require("babylon").parse(tpl_jj, {
  // parse in strict mode and allow module declarations
  sourceType: "module",

  plugins: [
    // enable jsx and flow syntax
    "jsx",
    "flow"
  ]
});
    

    //------------
export default {
  components: {

  },
  data: function () {
    return {
        input: '<template>\n'+
               '    <div id="editor">\n'+
               '        <textarea id="input" rows="20" cols="100" :value="input"></textarea>\n'+
               '    </div>\n'+
               '</template>\n',
        output: '# output'
    }
  },
  methods: {
    compile: function (event) {
      // `this` внутри методов указывает на экземпляр Vue
      alert('Привет, ' + this.name + '!  '  + this.id)
      // `event` — нативное событие DOM
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}
</script>

<style>

</style>

