<template>
    <div v-designer class="contentContainer" style="margin: 10px; padding: 10px;">
        <p dd="DD">xx</p>
        <slot> Content Container Component</slot>
        <p>yy</p>
    </div>
</template>

<script>
export default {
  name: 'contentContainer',
  render (createElement) {
    return createElement('h' + this.level, 'xxxx')
  }
}
</script>
