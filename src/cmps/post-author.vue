<template>
  <div class="post-row">
    <span v-if="post.content" class="post-row-username">{{ post.by.userName }}</span>
    {{ slicedContent }} <button class="show-full-content-btn" @click="isShowAllContent = !isShowAllContent" v-if="post.content.length > 100">{{ showMoreLess }}</button>
  </div>
</template>

<script>
export default {
  name: "post-author",
  props: ["post"],
  data() {
    return {
      isShowAllContent: false
    };
  },
  computed: {
    slicedContent() {
      if (this.post.content.length > 100 && !this.isShowAllContent) {
        return this.post.content.slice(0, 100) + "...";
      } else {
        return this.post.content;
      }
    },
    showMoreLess() {
      return !this.isShowAllContent ? "more" : "less";
    },
  },
};
</script>
