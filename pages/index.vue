<template>
    <div id="index_page" >
        <ul>
            
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
        </ul>
        <content-container v-designer id="cc-0" class="FLEX_ROW" style="">
            <div id="CCCCC-0000" class="wrapXX">
            <content-container id="cc-00" class="FLEX_ROW_CHILD" style="width:100px; height:150px;">component blue 0</content-container>
            </div>
            <div id="CCCCC-0001" class="wrapXX">
            <content-container id="cc-01" class="FLEX_ROW_CHILD" style="width:200px; height: 50px;">component blue 1</content-container>
            </div>
            <div id="CCCCC-0002" class="wrapXX">
            <content-container id="cc-02" class="FLEX_ROW_CHILD" style="margin-top:70px; width:200px; height: 50px;">component blue 2</content-container>
            </div>
            <div id="CCCCC-0003" class="wrapXX">
            <content-container id="cc-03" class="FLEX_ROW_CHILD" style="width:200px; height: 50px;">component blue 3</content-container>
            </div>
            <div id="CCCCC-0004" class="wrapXX">
            <content-container id="cc-04" class="FLEX_ROW_CHILD" style="width:300px; height: 50px;">component blue 4</content-container>
            </div>
        </content-container>
        
        <!--
        <content-container id="cc-1" class="FLEX_COLUMN" style="height:2000px">
            <content-container id="cc-100" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 100</content-container>
            <content-container id="cc-101" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 101</content-container>
            <content-container id="cc-102" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 102</content-container>
            <content-container id="cc-103" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 103</content-container>
            <content-container id="cc-104" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 104</content-container>

            <content-container id="cc-105" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 105</content-container>
            <content-container id="cc-106" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 106</content-container>
            <content-container id="cc-107" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 107</content-container>
            <content-container id="cc-108" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 108</content-container>
            <content-container id="cc-109" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 109</content-container>
            <content-container id="cc-110" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 110</content-container>
            <content-container id="cc-111" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 111</content-container>
            <content-container id="cc-112" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 112</content-container>
            <content-container id="cc-113" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 113</content-container>
            <content-container id="cc-114" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 114</content-container>
            <content-container id="cc-115" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 115</content-container>
            <content-container id="cc-116" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 116</content-container>
            <content-container id="cc-117" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 117</content-container>
            <content-container id="cc-118" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 118</content-container>
            <content-container id="cc-119" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 119</content-container>
            <content-container id="cc-120" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 120</content-container>
            <content-container id="cc-121" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 121</content-container>
            <content-container id="cc-122" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 122</content-container>
            <content-container id="cc-123" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 123</content-container>
            <content-container id="cc-124" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 124</content-container>
            <content-container id="cc-125" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 125</content-container>
            <content-container id="cc-126" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 126</content-container>
            <content-container id="cc-127" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 127</content-container>
            <content-container id="cc-128" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 128</content-container>
            <content-container id="cc-129" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 129</content-container>
            <content-container id="cc-130" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 130</content-container>
            <content-container id="cc-131" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 131</content-container>
            <content-container id="cc-132" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 132</content-container>
            <content-container id="cc-133" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 133</content-container>
            <content-container id="cc-134" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 134</content-container>
            <content-container id="cc-135" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 135</content-container>
            <content-container id="cc-136" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 136</content-container>
            <content-container id="cc-137" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 137</content-container>
            <content-container id="cc-138" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 138</content-container>
            <content-container id="cc-139" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 139</content-container>
            <content-container id="cc-140" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 140</content-container>
            <content-container id="cc-141" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 141</content-container>
            <content-container id="cc-142" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 142</content-container>
            <content-container id="cc-143" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 143</content-container>
            <content-container id="cc-144" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 144</content-container>
            <content-container id="cc-145" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 145</content-container>
            <content-container id="cc-146" class="FLEX_COLUMN_CHILD" style="width:300px; height: 50px;">component orange 146</content-container>
            <content-container id="cc-147" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 147</content-container>
            <content-container id="cc-148" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 148</content-container>
            <content-container id="cc-149" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 149</content-container>
            <content-container id="cc-150" class="FLEX_COLUMN_CHILD" style="width:200px; height: 50px;">component orange 150</content-container> 
        </content-container>
        -->
    </div>
</template>

<style>
.wrapXX {
    border: dotted black 2px;
    margin: 20px; padding: 20px;
    /*float: right;*/
}
.FLEX_ROW {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    margin: 10px; padding: 10px;
    border: solid blue 3px;    
}
.FLEX_ROW_CHILD {
    /*float: left;*/

    margin: 0px; padding: 0px;
    border: dotted blue 2px; width:100px;
}
.FLEX_COLUMN {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    margin: 10px; padding: 10px;
    border: solid orange 3px;
}
.FLEX_COLUMN_CHILD {
    /*float: left;*/

    margin: 0px; padding: 0px;
    border: dotted orange 2px;
}
</style>

<script>
import ContentContainer from '~/components/designer/ContentContainer.vue'


export default {

    components: {
        ContentContainer
    },
    methods: {
        clickQQ: function (){
            //alert('33');
            this.$el.style='border:solid red 5px';
        }
    }
};

</script>