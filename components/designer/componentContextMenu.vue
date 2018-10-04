<template id="componentContextMenu">

        <ul :id="id" class="nav-horisontal-left">
            <li> <a v-on:click="click" href="#">{{ cName }}</a>
                <ul>
                    <li><a href="#">point 1 1</a></li>
                </ul>
            </li>
            <li> <a href="#">point 2</a>
                <ul>
                    <li><a href="#">point 2 1</a></li>
                </ul>
            </li>
        </ul>

</template>

<script>
import axios from 'axios'

export default {
    name:'componentContextMenu',
    props: [ 'id' ],
    data: function () {
        return {
            cName: 0
        }
    },
    methods:{
        click:function(mouseEvent) {
            var dOpts = this.$el.__designer;
            axios
                .get('http://localhost:3000/api/designer/getComponentSource?component=' + dOpts.componentFile)
                .then(response => {
                    this.info = response;
                    alert (response.data);
                });
        }
    }
};
</script>

<style lang="less">
@charset "UTF-8";
/**
source from : http://www.webdesignerwall.com/demo/css3-dropdown-menu/css-gradient-dropdown.html
**/
@background : #F1F1F4;
@border     : #ccc;

@li_a_hover : saturate(@background, 50%);
@a_hover    : darken(@background, 20%);
@text       : #000000;
@text_hover : lighten(@text, 50%);

.nav-horisontal-left {
    background      : @background repeat scroll 0 0;
    line-height     : 100%;
    margin          : 1px;
    padding         : 0;
    display         : inline-block;
    z-index         : 1000;
    border-radius   : 5px;
    border          : 1px solid @border;
    cursor: pointer;
    li {
        float           : left;
        list-style      : none outside none;
        margin          : 0;
        position        : relative;
        z-index         : 1000;
    }
    a {
        color           : @text;
        display         : block;
        font-weight     : bold;
        margin          : 0;
        padding         : 8px 20px;
        text-decoration : none;
    }
    .current a, li:hover > a {
        background      : @li_a_hover repeat scroll 0 0;
        color           : @text_hover;
        border-radius   : 5px;
    }
    ul li:hover a, li:hover li a {
        background      : none repeat scroll 0 0 transparent;
        border          : medium none;
        color           : @text;
    }
    ul a:hover {
        color           : white;
        background      : @a_hover !important;
    }
    ul {
        background      : @li_a_hover repeat scroll 0 0;
        border          : 1px solid @border;
        display         : none;
        left            : 0;
        margin          : 0;
        padding         : 0;
        position        : absolute;
        width           : 100%;
        border-radius   : 5px;
    }
    li:hover > ul {
        display         : block;
    }
    ul li {
        float           : none;
        margin          : 0;
        padding         : 0;
    }
    ul a {
        font-weight     : normal;
    }
    ul ul {
        left            : 181px;
        top             : -3px;
    }
    &:after {
        clear           : both;
        content         : ".";
        display         : block;
        height          : 0;
        line-height     : 0;
        visibility      : hidden;
    }
}
</style>
