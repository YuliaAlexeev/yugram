<template>
  <div class="post-details-header">
    <router-link :to="`/${post.by.userName}`">
      <img class="user-avatar avatar-md avatar" :src=post.by.imgUrl alt="profile pic" />
    </router-link>
    <router-link :to="`/${post.by.userName}`">{{post.by.userName}}</router-link>
    <button class="more-options-btn" @click="showMoreOptions">
      <svg height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
    </button>
    <post-options :post="post" :user="user" @closeModal="closePostOptionsModal" @removedPost="removedPost" v-show="isShownRemovePost"></post-options>
  </div>
</template>

<script>
import postOptions from "./post-options.vue";
export default {
  name: "post-header",
  props: ["post", "user"],
  data() {
    return {
      isShownRemovePost: false,
    };
  },
  methods: {
    showMoreOptions() {
      this.isShownRemovePost = !this.isShownRemovePost;
    },
    closePostOptionsModal() {
      this.isShownRemovePost = null;
    },
    removedPost() {
      this.$emit("removedPost");
    }
  },
  components: {
    postOptions,
  },
};
</script>