<template>
 <div class="screen">
        <button class="screen-close-btn" @click="closePostModal">
            <svg height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
        </button>
    <div class="post-modal">

        <img
            class="post-details-img"
            :src=userPost.imgUrl
            alt="post img"
        />
        <div class="">
                <div class="post-details-header">
            <router-link :to="`/${userPost.by.userName}`">
                <img
                    class="user-avatar avatar-md avatar"
                    :src=userPost.by.imgUrl
                    alt="profile pic"
                />
            </router-link>
            <router-link :to="`/${userPost.by.userName}`">{{userPost.by.userName}}</router-link>
            <button class="more-options-btn">
                <svg aria-label="More options" height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
            </button>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
import moment from 'moment';
import userService from '@/services/user-service'
export default {
    name: 'post-modal',
    props: ['userPost'],
    created() {
        console.log('YES THIS IS THE POST INSIDE POST MODAL', this.userPost);
    },
    methods:{
        closePostModal(){
            this.$emit('closePostModal');
        }
    }
};
</script>
