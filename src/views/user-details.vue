<template>
  <main class="main" v-if="user ">
    <section class="profile">
      <img class="profile-img avatar" :src="user.imgUrl" />

      <div class="profile-description">
        <div class="profile-description-top">
          <h2 class="profile-description-top-username">{{user.userName}}</h2>
        </div>

        <div class="profile-description-count">
          <span class="profile-count">
            <span class="profile-count-num">{{getPostsOfUser.length}}</span> posts
          </span>
          <button class="profile-count" @click="toggleFollowersModal">
            <span class="profile-count-num">{{user.followers.length}}</span> followers
          </button>

          <users-modal @closeModal="toggleFollowersModal" v-show="isShownFollowersModal">
            <h4 slot="title" class="screen-box-top-title">Followers</h4>
            <div slot="users" @click="toggleFollowersModal" v-for="user in user.followers" :key="user._id" class="screen-row">
              <router-link :to="`/${user.userName}`"><img class="user-avatar avatar-lg avatar" :src="user.imgUrl" alt="profile pic" /></router-link>
              <div class="screen-row-name">
                <div class="screen-row-name-username" :title="user.userName">
                  <router-link :to="`/${user.userName}`">{{user.userName}}</router-link>
                </div>
                <div v-if="user.fullName" class="screen-row-name-fullname">{{user.fullName}}</div>
              </div>
            </div>
          </users-modal>

          <button class="profile-count" @click="toggleFollowingModal">
            <span class="profile-count-num">{{user.following.length}}</span> following
          </button>

          <users-modal @closeModal="toggleFollowingModal" v-show="isShownFollowingModal">
            <h4 slot="title" class="screen-box-top-title">Following</h4>
            <div slot="users" @click="toggleFollowingModal" v-for="user in user.following" :key="user._id" class="screen-row">
              <router-link :to="`/${user.userName}`"><img class="user-avatar avatar-lg avatar" :src="user.imgUrl" alt="profile pic" /></router-link>
              <div class="screen-row-name">
                <div class="screen-row-name-username" :title="user.userName">
                  <router-link :to="`/${user.userName}`">{{user.userName}}</router-link>
                </div>
                <div v-if="user.fullName" class="screen-row-name-fullname">{{user.fullName}}</div>
              </div>
            </div>
          </users-modal>
        </div>

        <div class="profile-description-bio">
          <h3>{{user.fullName}}</h3>
          <p>{{user.bio}}</p>
        </div>
      </div>
    </section>
    <div class="profile-tabs">
      <span class="profile-tabs-tab">
        <svg height="12" viewBox="0 0 48 48" width="12">
          <path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path>
        </svg>
        Posts
      </span>
    </div>
    <section class="profile-posts">
      <div class="profile-posts-no-posts" v-if="getPostsOfUser.length === 0">
        <div class="profile-posts-no-posts-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420.8 420.8">
            <path d="M406.8 96.4c-8.4-8.8-20-14-33.2-14h-66.4v-.8c0-10-4-19.6-10.8-26-6.8-6.8-16-10.8-26-10.8h-120c-10.4 0-19.6 4-26.4 10.8-6.8 6.8-10.8 16-10.8 26v.8h-66c-13.2 0-24.8 5.2-33.2 14-8.4 8.4-14 20.4-14 33.2v199.2C0 342 5.2 353.6 14 362c8.4 8.4 20.4 14 33.2 14h326.4c13.2 0 24.8-5.2 33.2-14 8.4-8.4 14-20.4 14-33.2V129.6c0-13.2-5.2-24.8-14-33.2zM400 328.8h-.4c0 7.2-2.8 13.6-7.6 18.4s-11.2 7.6-18.4 7.6H47.2c-7.2 0-13.6-2.8-18.4-7.6-4.8-4.8-7.6-11.2-7.6-18.4V129.6c0-7.2 2.8-13.6 7.6-18.4s11.2-7.6 18.4-7.6h77.2c6 0 10.8-4.8 10.8-10.8V81.2c0-4.4 1.6-8.4 4.4-11.2s6.8-4.4 11.2-4.4h119.6c4.4 0 8.4 1.6 11.2 4.4 2.8 2.8 4.4 6.8 4.4 11.2v11.6c0 6 4.8 10.8 10.8 10.8H374c7.2 0 13.6 2.8 18.4 7.6s7.6 11.2 7.6 18.4v199.2z" />
            <path d="M210.4 130.8c-27.2 0-52 11.2-69.6 28.8-18 18-28.8 42.4-28.8 69.6s11.2 52 28.8 69.6c18 18 42.4 28.8 69.6 28.8s52-11.2 69.6-28.8c18-18 28.8-42.4 28.8-69.6s-11.2-52-28.8-69.6c-17.6-17.6-42.4-28.8-69.6-28.8zM264.8 284c-14 13.6-33.2 22.4-54.4 22.4S170 297.6 156 284c-14-14-22.4-33.2-22.4-54.4 0-21.2 8.8-40.4 22.4-54.4 14-14 33.2-22.4 54.4-22.4s40.4 8.8 54.4 22.4c14 14 22.4 33.2 22.4 54.4.4 21.2-8.4 40.4-22.4 54.4z" />
            <circle cx="352.8" cy="150" r="19.6" />
          </svg>
        </div>
        No posts yet
      </div>
      <div class="profile-posts-item" @click="selectedPostIdx = idx" v-for="(userPost, idx) in getPostsOfUser" :key="userPost.id">
        <img class="profile-posts-item-img" :src="userPost.imgUrl" />

        <div class="profile-posts-item-count">
          <span class="">
            <svg height="19" viewBox="0 0 48 48" width="19">
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            </svg>
            {{userPost.likes.length}}
          </span>
          <span class="">
            <svg height="19" viewBox="0 0 48 48" width="19">
              <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd" />
            </svg>
            {{userPost.comments.length}}
          </span>
        </div>
      </div>
      <post-modal v-if="selectedPostIdx !== null" @closePostModal="selectedPostIdx = null" :userPost="getPostsOfUser[selectedPostIdx]"></post-modal>
    </section>
  </main>
</template>

<script>
import userService from '@/services/user-service.js';
import usersModal from '@/cmps/users-modal';
import postModal from '@/cmps/post-modal';
export default {
  data() {
    return {
      user: null,
      isShownFollowersModal: false,
      isShownFollowingModal: false,
      selectedPostIdx: null
    }
  },
  computed: {
    getPostsOfUser() {
      let allPosts = this.$store.getters.getPosts
      let postsOfUser = allPosts.filter(post => post.by.userName === this.user.userName)
      return postsOfUser;
    }
  },
  methods: {
    loadPostsOfUser() {
      this.$store.dispatch({
        type: 'loadPosts'
      })
    },
    toggleFollowersModal() {
      this.isShownFollowersModal = !this.isShownFollowersModal;
    },
    toggleFollowingModal() {
      this.isShownFollowingModal = !this.isShownFollowingModal;
    },
    onFollow() {
      // this.$store.dispatch({
      //   type: "onFollow",
      //   followedUser: this.user,
      //   loggedInUser: this.loggedInUser
      // });
    }
  },
  async created() {
    const userName = this.$route.params.userName;
    const user = await userService.getByUserName(userName);
    this.user = user[0];
    this.loadPostsOfUser();
  },
  watch: {
    async '$route.params.userName'(newUserName) {
      const user = await userService.getByUserName(newUserName);
      this.user = user[0];
      this.loadPostsOfUser();
      this.selectedPostIdx = null;
    },
  },
  components: {
    usersModal,
    postModal
  }
}
</script>