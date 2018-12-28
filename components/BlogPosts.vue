<template>
    <div class="blog-post">
      <h3 id="bp-h3">{{ post.title }}</h3>
      <div id="bp-div" v-html="post.content"></div>
    </div>
</template>

<script>
export default {
    name: 'BlogPosts',
    props: ['post']
}
</script>
