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
            <div slot="users" v-for="user in user.followers" :key="user._id" class="screen-row">
              <img class="user-avatar avatar-lg avatar" :src="user.imgUrl" alt="profile pic" />
              <div class="screen-row-name">
                <div class="screen-row-name-username" :title="user.userName">{{user.userName}}</div>
                <div v-if="user.fullName" class="screen-row-name-fullname">{{user.fullName}}</div>
              </div>
            </div>
          </users-modal> 

          <button class="profile-count" @click="toggleFollowingModal">
            <span class="profile-count-num">{{user.following.length}}</span> following
          </button>
          
           <users-modal @closeModal="toggleFollowingModal" v-show="isShownFollowingModal">
            <h4 slot="title" class="screen-box-top-title">Following</h4>
            <div slot="users" v-for="user in user.following" :key="user._id" class="screen-row">
              <img class="user-avatar avatar-lg avatar" :src="user.imgUrl" alt="profile pic" />
              <div class="screen-row-name">
                <div class="screen-row-name-username" :title="user.userName">{{user.userName}}</div>
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

      <div class="profile-posts-item" @click="selectedPost = userPost" v-for="userPost in getPostsOfUser" :key="userPost.id">
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
      <post-modal v-if="selectedPost" @closePostModal="selectedPost = null" :userPost="selectedPost"></post-modal>
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
            selectedPost: null
        }
    },
    computed:{
        getPostsOfUser(){
            return this.$store.getters.getPostsOfUser
        }
    },
    methods:{
        loadPostsOfUser(){
          // console.log('loadPostOfUser',this.user)
            this.$store.dispatch({
                type: 'loadPostsOfUser',
                user: this.user
            })
        },
        toggleFollowersModal(){
           this.isShownFollowersModal= !this.isShownFollowersModal;
        },
        toggleFollowingModal(){
            this.isShownFollowingModal= !this.isShownFollowingModal;
        },
        onFollow(){
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
        console.log('this user', this.user)
        this.loadPostsOfUser();
        

    },
    watch: {
        async '$route.params.userName'(newUserName) {
            const user = await userService.getByUserName(newUserName);
            this.user = user[0];
            this.loadPostsOfUser();
            this.selectedPost = null;
        }
    },
    components:{
        usersModal,
        postModal
    }
}
</script>