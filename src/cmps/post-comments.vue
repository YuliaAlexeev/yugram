<template>
  <div>
    <div class="post-row" v-for="comment in comments" :key="comment.id">
      <span class="post-row-username" :title="comment.by.userName">
        <router-link :to="`/${comment.by.userName}`">{{ comment.by.userName }}</router-link>
      </span>
      {{ comment.content }}
      <button class="post-row-remove-btn" v-if="isByLoggedUser(comment.by._id)" @click="removeComment(post,comment.id)">
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 512 512"><path d="M512 28.308L483.692 0 256 227.692 28.308 0 0 28.308 227.692 256 0 483.692 28.308 512 256 284.308 483.692 512 512 483.692 284.308 256z"/></svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "post-comments",
  props: ['post', 'comments', 'user'],
  computed: {
    isByLoggedUser() {
      return (commentById) => commentById === this.user._id;
    },
  },
  methods: {
    // removeComment(post, commentId) {
    //   this.$emit('removeComment', post, commentId)
    // }

       removeComment(post, commentId) {
      console.log('post', post);
      const commentIdx = this.post.comments.findIndex(comment => comment.id === commentId)
      console.log('commentIdx in find', commentIdx)
      const postCopy = JSON.parse(JSON.stringify(post))
      postCopy.comments.splice(commentIdx, 1)
      this.$store.dispatch({
          type: 'updatePost',
          updatedPost: postCopy
     })
    },
  },
};
</script>
