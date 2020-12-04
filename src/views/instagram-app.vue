<template>
    <section class="main home-page">
        <post-list v-if="!isLoading" :posts="postsToShow" />
        <!-- <infinite-loading></infinite-loading> -->
        <img v-if="isLoading" class="main-loader" src="@/assets/loader.svg" />
        <!-- <div class="main-user-profile">
          {{loggedInUser.userName}}
          {{loggedInUser.fullName}}
          <img class="avatar-lg avatar" :src="loggedInUser.imgUrl" />
        </div> -->
          <!-- {{postsToShow}} -->
      
        <button class="add-post-btn" @click="toggleAddPostModal">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 477.867 477.867"><path d="M392.533 0h-307.2C38.228.056.056 38.228 0 85.333v307.2c.056 47.105 38.228 85.277 85.333 85.333h307.2c47.105-.056 85.277-38.228 85.333-85.333v-307.2C477.81 38.228 439.638.056 392.533 0zm51.2 392.533c0 28.277-22.923 51.2-51.2 51.2h-307.2c-28.277 0-51.2-22.923-51.2-51.2v-307.2c0-28.277 22.923-51.2 51.2-51.2h307.2c28.277 0 51.2 22.923 51.2 51.2v307.2z"/><path d="M324.267 221.867H256V153.6c0-9.426-7.641-17.067-17.067-17.067s-17.067 7.641-17.067 17.067v68.267H153.6c-9.426 0-17.067 7.641-17.067 17.067S144.174 256 153.6 256h68.267v68.267c0 9.426 7.641 17.067 17.067 17.067S256 333.692 256 324.267V256h68.267c9.426 0 17.067-7.641 17.067-17.067s-7.642-17.066-17.067-17.066z"/></svg>
        </button>
        <add-post v-show="isShowAddPostModal" @closeAddPostModal="toggleAddPostModal" @addPost="onAddPost"></add-post>
    </section>
</template>

<script>
import postList from '@/cmps/post-list.vue'
import addPost from '@/cmps/add-post.vue'
//import InfiniteLoading from 'vue-infinite-loading';

export default{
  name: 'instagram-app',
  data(){
    return {
      isShowAddPostModal: false,
    }
  },
  computed:{
      isLoading(){
        return this.$store.getters.isLoading
      },
      postsToShow(){
        return this.$store.getters.getPosts
      },
      // loggedInUser(){
      //       return this.$store.getters.loggedInUser
      //   }
  },
  methods: {
    loadPosts() {
      this.$store.dispatch({
        type: 'loadPosts'
      })
    },
    onAddPost(postToAdd){
      this.$store.dispatch({
          type: 'addPost',
          postToAdd
      })
    },
    toggleAddPostModal(){
      this.isShowAddPostModal = !this.isShowAddPostModal;
    }
  },
  created(){
    this.loadPosts();
  },
  components:{
   postList,
   addPost,
   //InfiniteLoading
  }
}
</script>
