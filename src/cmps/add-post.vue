<template>
    <div class="screen">
        <button class="screen-close-btn" @click="closeModal">
            <svg height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
        </button>
        <form class="add-post-modal" @submit.prevent="addPost">          
            <h3 class="add-post-modal-title">New post</h3>
            <textarea class="add-post-modal-textarea" v-model="postToAdd.content" placeholder="Write something..."></textarea>

            <img v-if="isLoading" src="@/assets/loader.svg" class="main-loader" />
            <template v-else-if="!isImgLoaded">
                <label class="add-post-modal-upload" for="imgUploader">
                    <svg height="100px" viewBox="0 -18 512 512" width="100px" xmlns="http://www.w3.org/2000/svg"><path d="M432 0H80C35.887 0 0 35.887 0 80v280c0 44.113 35.887 80 80 80h273c11.047 0 20-8.953 20-20s-8.953-20-20-20h-73.664l-45.984-59.656 145.722-185.348 98.098 108.422a19.994 19.994 0 0022.02 5.246A20.01 20.01 0 00512 250V80c0-44.113-35.887-80-80-80zm40 198.086l-79.168-87.504a19.97 19.97 0 00-15.523-6.57 20.02 20.02 0 00-15.032 7.629L208.16 307.664l-52.32-67.875A20.002 20.002 0 00140 232h-.012a20 20 0 00-15.84 7.805l-44.015 57.218c-6.735 8.758-5.098 21.313 3.656 28.047 8.758 6.739 21.313 5.098 28.05-3.656l28.177-36.633L228.832 400H80c-22.055 0-40-17.945-40-40V80c0-22.055 17.945-40 40-40h352c22.055 0 40 17.945 40 40zm0 0"/><path d="M140 72c-33.086 0-60 26.914-60 60s26.914 60 60 60 60-26.914 60-60-26.914-60-60-60zm0 80c-11.027 0-20-8.973-20-20s8.973-20 20-20 20 8.973 20 20-8.973 20-20 20zm0 0M468.477 302.941c-.059-.058-.118-.12-.176-.18-9.453-9.519-22.028-14.761-35.41-14.761-13.344 0-25.883 5.21-35.325 14.676l-38.613 38.086c-7.863 7.754-7.95 20.418-.191 28.281 7.754 7.863 20.418 7.953 28.281.195l25.848-25.492V456c0 11.047 8.953 20 20 20s20-8.953 20-20V344.355l24.738 25.555A19.93 19.93 0 00492 376a19.939 19.939 0 0013.91-5.629c7.938-7.683 8.14-20.344.457-28.281zm0 0"/></svg>
                </label>
                <input
                    type="file"
                    id="imgUploader"
                    name="img-uploader"
                    @change="onUploadImg"
                />
            </template>        
            <img :src="postToAdd.imgUrl" />
            <button class="add-post-modal-btn">Add</button>
        </form>
    </div>
</template>

<script>
import {uploadImg} from '@/services/img-upload-service.js';
export default {
    name: 'add-post',
    data(){
        return {
            isLoading: false,
            imgUrl: null,
            isImgLoaded: false,
            isShownModal: false,
            postToAdd: { content: '', createdAt: Date.now(), imgUrl: this.imgUrl, by: null, comments: [], likes: [] }
        }
    },
    components:{
    },
    methods:{
        async onUploadImg(ev){
            this.isLoading = true;
            const res = await uploadImg(ev)
            this.postToAdd.imgUrl = res.url;
            this.isLoading = false;
            this.isImgLoaded=true;
        },
        addPost(){
            this.$emit('addPost', this.postToAdd);
            

        },
        closeModal(){
            this.$emit('closeModal', this.isShownModal);
        }
    }
};
</script>
