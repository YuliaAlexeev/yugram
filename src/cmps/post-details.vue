<template>
  <div class="post-details" v-if="user">
    <post-header :post="post" :user="user"></post-header>
    <img class="post-details-img" :src="post.imgUrl" alt="post img" />
    <div class="post-details-content">
      <post-actions :post="post" :user="user" ></post-actions>
      <post-likes :post="post"></post-likes>
      <post-author :post="post"></post-author>
      <button class="show-comments-btn" v-if="slicedCommentsLength > 0" @click="isShowAllComments = !isShowAllComments">
        View {{ showMoreLess }} {{ slicedCommentsLength }} comments
      </button>
      <post-comments :comments="commentsToShow" :post="post" :user="user"></post-comments>
      <post-time :post="post"></post-time>
    </div>
    <add-comment :post="post" :user="user"></add-comment>
  </div>
</template>

<script>
import userService from "@/services/user-service";
import postHeader from "@/cmps/post-header";
import postComments from "@/cmps/post-comments";
import postLikes from "@/cmps/post-likes";
import addComment from "@/cmps/add-comment";
import postActions from "@/cmps/post-actions";
import postTime from "@/cmps/post-time";
import postAuthor from "@/cmps/post-author";

export default {
  name: "post-details",
  props: ["post"],
  data() {
    return {
      isShownModal: false,
      isShowAllComments: false,
      user: null,
      commentToAdd: { content: "", createdAt: Date.now() },
    };
  },
  computed: {
    getCommentCreatedAt() {
      return moment(this.post.comments.createdAt).fromNow();
    },
    commentsToShow() {
      if (this.post.comments.length > 2 && !this.isShowAllComments) {
        return this.post.comments.slice(this.post.comments.length -2 ,this.post.comments.length);
      } else {
        return this.post.comments;
      }
    },
    slicedCommentsLength() {
      return this.post.comments.length - 2;
    },
    showMoreLess() {
      return !this.isShowAllComments ? "all" : "less";
    },
    isByLoggedUser() {
      return (commentById) => commentById === this.user._id;
    },
  },
  methods: {
    closeModal() {
      this.isShownModal = null;
    },
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
  async created() {
    const user = await userService.getById("5fc5fd32768787be41a9a627");
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
