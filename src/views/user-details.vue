<template>
    <main class="main" v-if="user">
        <section class="profile">
            <img class="profile-img avatar" :src="user.imgUrl" />

            <div class="profile-description">
                <div class="profile-description-top">
                    <h2 class="profile-description-top-username">{{user.userName}}</h2>
                </div>

                <div class="profile-description-count">
                    <button @click="showFollowersModal">
                        <span class="">{{user.followers.length}}</span> followers 
                    </button>  
                    {{user.following.length}} following 

                    <users-modal @click="closeModal" v-show="isShownModal">
                        <h4 slot="title">followes</h4>
                        <button slot="button" @click="closeModal">
                            <svg aria-label="Close" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
                        </button>

                        <div slot="users" v-for="user in user.followers" :key="user._id" class="screen-row" >
                            <img class="user-avatar avatar-lg avatar" :src="user.imgUrl" alt="profile pic"/>  
                            <div class="screen-row-name">
                                <div class="screen-row-name-username" :title="user.userName">{{user.userName}}</div>
                                <div class="screen-row-name-fullname">{{user.fullName}}</div>
                            </div>
                        </div>
                    </users-modal>
                   <!-- <users-modal ></users-modal> -->
                </div>
                
                <div class="profile-description-bio">
                    <h3>{{user.fullName}}</h3>
                    <p>{{user.bio}}</p>
                </div>
            </div>
        </section>
        <div class="profile-tabs">
            <span class="profile-tabs-tab">
                <svg height="12" viewBox="0 0 48 48" width="12"><path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg>
                Posts
            </span>
        </div>
        <section class="profile-posts">
         
            <div class="profile-posts-item" v-for="userPost in getPostsOfUser" :key="userPost.id">
                <img class="profile-posts-item-img" @mouseover="active=true" @mouseleave="active=false" :src="userPost.imgUrl" />
                <div class="profile-posts-item-count" v-show="active">
                    <span class="">Likes {{userPost.likes.length}}</span>
                    <span class="">Comments {{userPost.comments.length}}</span>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import userService from '@/services/user-service.js';
import usersModal from '@/cmps/users-modal';
export default {
    data() {
        return {
            user: null,
            isShownModal: false,
            active: false
        }
    },
    computed:{
        getPostsOfUser(){
            return this.$store.getters.getPostsOfUser
        }
    },
    methods:{
        loadPostsOfUser(){
            this.$store.dispatch({
                type: 'loadPostsOfUser',
                user: this.user
            })
        },
         closeModal(){
            this.isShownModal = null;
        },
        showFollowersModal(){
           this.isShownModal= !this.isShownModal;
        },
    },
    async created() {
        const userName = this.$route.params.userName;
        const user = await userService.getByUserName(userName);
        this.user = user[0]

         console.log('user details page', user);
        const userPosts = this.loadPostsOfUser()
       console.log('userPosts', userPosts)

      
    },
    components:{
        usersModal
    }


}
</script>