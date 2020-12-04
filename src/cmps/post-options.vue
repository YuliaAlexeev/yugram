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
    name: 'remove-post',
    props: ["post", "user"],
  data(){
    return{
      isCloseModal: false
    }
  },
  computed:{
    isByLoggedUser() {
      //console.log('post id', this.post._id, 'user id', this.user._id)
      return (postId) => postId === this.user._id;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    removePost(postId){
      //this.$emit("removePost");
      console.log('remove postId', postId)
      this.$store.dispatch({
        type: 'removePost',
        postId
      })
    }
  },

  created() {
   //console.log("options component", this.user);
  },
};
</script>