<template>
  <form @submit.prevent="addComment" class="post-details-add-comment">
    <textarea v-model="commentToAdd.content" ref="comment" @keyup.enter="addComment" placeholder="Add a comment…"></textarea>
    <button class="post-details-add-comment-btn">Post</button>
  </form>
</template>

<script>
export default {
  name: "add-comment",
  props:['post','user'],
  data(){
      return{
        commentToAdd: { content: "", createdAt: Date.now() },
      }
  },
  methods: {
    addComment() {
      const commentCopy = JSON.parse(JSON.stringify(this.commentToAdd));
      this.$store.dispatch({
        type: "addComment",
        comment: commentCopy,
        postId: this.post._id,
        user: this.user,
      });
      this.commentToAdd = { content: "" };
    },
  },
};
</script>

<style>
</style>