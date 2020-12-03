<template>
  <time class="post-published-time">{{ getCreatedAt }}</time>
</template>

<script>
import moment from "moment";
export default {
  name: "post-time",
  props: ["post"],
  computed: {
    getCreatedAt() {
      return moment(this.post.createdAt).fromNow();
    },
  },
};
</script>
