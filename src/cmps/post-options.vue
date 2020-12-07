<template>
  <div class="screen" @click="closeModal">
    <div class="screen-box">
      <div class="post-options">
        <button class="post-options-btn btn-remove" v-if="isByLoggedUser(post.by._id)" @click="removePost(post._id)">Remove post</button>
        <button class="post-options-btn" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "remove-post",
  props: ["post", "user"],
  data() {
    return {
      isCloseModal: false,
    };
  },
  computed: {
    isByLoggedUser() {
      return (postId) => postId === this.user._id;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    removePost(postId) {
      console.log('removing post from post options cmp', postId)
      this.$store.dispatch({
        type: "removePost",
        postId,
      });
    },
  },
};
</script>