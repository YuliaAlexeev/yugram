<template>
  <div>
     <!-- <div class="post-row">
        <span class="post-row-username">{{ post.by.userName }}</span>{{ post.content }}
      </div> -->
    <div class="post-row" v-for="comment in comments" :key="comment.id">
      <span class="post-row-username" :title="comment.by.userName">
        <router-link :to="`/${comment.by.userName}`">{{ comment.by.userName }}</router-link>
      </span>
      {{ comment.content }}
      <button class="remove" v-if="isByLoggedUser(comment.by._id)" @click="removeComment(comment.id)">x</button>
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
    removeComment(commentId) {
      // this.$emit('removeComment', commentId)
      // console.log('details remove commentId', commentId)
      // console.log('details from post', post)
      // const commentIdx = post.comments.findIndex(comment => comment.id === commentId)
      // console.log('commentIdx in find', commentIdx)
      // const postCopy = JSON.parse(JSON.stringify(post))
      // postCopy.comments.splice(commentIdx, 1)
      // this.$store.dispatch({
      //     type: 'updatePost',
      //     updatedPost: postCopy
      // })
    },
  },
};
</script>
