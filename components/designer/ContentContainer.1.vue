<!-- comment-0 -->
<style>
/*comment-00*/
.xx {
    display:none;
}
</style>
<!-- comment-1 -->
<style lang='less'>
.xx2 {
    display:none;
}
</style>
<!-- comment-2 -->
<doc lang='ccccccccc'>
    function xx () {
        return;
    };
</doc>
<!-- comment-3 -->
<template>
    <div class="contentContainer" style="margin: 10px; padding: 10px;" v-test>
        <p dd="DD">xx</p>
        <slot>Content Container Component</slot>
        <p>yy</p>
        <div v-for="item in items" :key="item.id">
            <!-- content -->
            {{xxxxx}}
        </div>
    </div>
</template>
<!-- comment-4 -->
<script>
export default {
    name:'contentContainer1',
    data: function() {
        return {
            object: {
                firstName: 'John',
                lastName: 'Doe',
                age: 30
            }
        }
    }
};
</script>