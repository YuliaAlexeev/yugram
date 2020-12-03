<template>
  <div class="post-row">
    <span class="post-row-username">{{ post.by.userName }}</span>{{ post.content }}
  </div>
</template>

<script>
export default {
  name: "post-author",
  props: ["post"],
};
</script>
