<template>
  <form @submit.prevent="addComment" class="post-details-add-comment">
    <textarea v-model="commentToAdd.content" class="comment-input" ref="comment" rows="1" @keydown.enter="addComment" placeholder="Add a comment…"></textarea>
    <button class="post-details-add-comment-btn">Post</button>
  </form>
</template>

<script>
import {utilService} from '@/services/util-service.js';

export default {
  name: "add-comment",
  props:['post','user', 'isUserDetails'],
  data(){
      return{
        commentToAdd: { id: utilService.makeId(), content: "", createdAt: Date.now() },
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
        isUserDetails: this.isUserDetails || false
      });
      this.commentToAdd = { content: "" };
    },
  },
};
</script>

<style>
</style>