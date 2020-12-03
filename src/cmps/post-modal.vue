<template>
  <div class="screen">
    <button class="screen-close-btn" @click="closePostModal">
      <svg height="24" viewBox="0 0 48 48" width="24">
        <path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path>
      </svg>
    </button>
    <div class="post-modal">
      <img class="post-modal-img" :src=userPost.imgUrl alt="post img" />
      <div class="post-modal-right">
        <post-header :post="userPost"></post-header>
        <post-author :post="userPost"></post-author>
        <post-comments class="post-modal-comments" :comments="userPost.comments" :user="userPost.by"></post-comments>
        <div class="post-modal-bottom">
            <post-actions :post="userPost" :user="user"></post-actions>
            <post-likes :post="userPost"></post-likes>
            <post-time :post="userPost"></post-time>
        </div>
        <add-comment :post="userPost" :user="user"></add-comment>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import userService from "@/services/user-service";
import postHeader from "@/cmps/post-header";
import postComments from "@/cmps/post-comments";
import postLikes from "@/cmps/post-likes";
import addComment from "@/cmps/add-comment";
import postActions from "@/cmps/post-actions";
import postTime from "@/cmps/post-time";
import postAuthor from "@/cmps/post-author";

export default {
  name: "post-modal",
  props: ["userPost"],
  data() {
    return {
      user: null,
    };
  },

  methods: {
    closePostModal() {
      this.$emit("closePostModal");
    },
  },
  async created() {
    console.log("YES USER INSIDE POST MODAL", this.user);  
    const user = await userService.getById("u101");
    this.user = user;
  },
  components: {
    postHeader,
    postComments,
    postLikes,
    addComment,
    postActions,
    postTime,
    postAuthor
  },
};
</script>
