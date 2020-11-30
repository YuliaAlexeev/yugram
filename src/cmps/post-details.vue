<template>
    <div class="post-details" v-if="user">
        <div class="post-details-header">
            <router-link :to="`/${post.by.userName}`">
                <img
                    class="user-avatar avatar-md avatar"
                    :src=post.by.imgUrl
                    alt="profile pic"
                />
            </router-link>
            <router-link :to="`/${post.by.userName}`">{{post.by.userName}}</router-link>
            <button class="more-options-btn">
                <svg aria-label="More options" height="16" viewBox="0 0 48 48" width="16"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
            </button>
        </div>

        <img
            class="post-details-img"
            :src=post.imgUrl
            alt="post img"
            style="max-width: 615px; height: 745px"
        />

        <div class="post-details-content">
            <div class="post-actions">
                <button @click="addLike" class="post-actions-btn">
                    <svg v-if="!getLike" class="nolike"
                        height="22"
                        viewBox="0 0 48 48"
                        width="22"
                    >
                        <path
                            d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                        />
                    </svg>

                    <svg v-else class="like" :class="{likeAnimation: getLike}" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                </button>
                <button class="post-actions-btn">
                    <svg
                        aria-label="Comment"
                        height="24"
                        viewBox="0 0 48 48"
                        width="24"
                    >
                        <path
                            clip-rule="evenodd"
                            d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                            fill-rule="evenodd"
                        />
                    </svg>
                </button>
                <button class="post-actions-btn">
                    <svg
                        aria-label="Share Post"
                        height="24"
                        viewBox="0 0 48 48"
                        width="24"
                    >
                        <path
                            d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"
                        ></path>
                    </svg>
                </button>
                <button class="post-actions-btn">
                    <svg
                        aria-label="Save"
                        height="24"
                        viewBox="0 0 48 48"
                        width="24"
                    >
                        <path
                            d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"
                        />
                    </svg>
                </button>
            </div>

            
            <button class="post-likes-btn" v-if="post.likes.length > 0" @click="showLikesModal">{{post.likes.length}} likes</button>
              <div class="screen" v-show="isShownModal" @click="closeModal">
                <div class="screen-box" >
                <div class="screen-box-top">
                    <h4 class="screen-box-top-title">Likes</h4>
                    <button class="close-btn" @click="closeModal">
                        <svg aria-label="Close" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="screen-box-bottom">
                    <div v-for="like in post.likes" :key="like._id" class="screen-box-bottom-by" >
                        <img class="user-avatar avatar-lg avatar" :src="like.imgUrl" alt="profile pic"/>  
                        <span class="post-row-username" :title="like.userName">{{like.userName}}
                        {{like.fullName}}
                        </span>
                    </div>
                </div>
              </div>
            </div>
    
            
   
            <div class="post-row"><span class="post-row-username">{{post.by.userName}}</span>{{post.content}}</div>

            <button class="show-comments-btn" v-if="slicedCommentsLength > 0" @click="isShowAllComments =! isShowAllComments">
                View {{showMoreLess}} {{slicedCommentsLength}} comments
            </button>
            <div class="post-row" v-for="comment in commentsToShow" :key="comment.id">
                <span class="post-row-username" :title="comment.by.userName"><router-link :to="`/${comment.by.userName}`">{{ comment.by.userName }}</router-link></span>{{ comment.content }}
                <button class="remove" v-if="isByLoggedUser(comment.by._id)" @click="removeComment(post, comment.id)">x</button>
            </div>

            <time class="post-published-time">{{ getCreatedAt }}</time>
        </div>
        <form @submit.prevent="addComment" class="post-details-add-comment">
            <textarea v-model="commentToAdd.content" placeholder="Add a comment…"></textarea>
            <button class="post-details-add-comment-btn">Post</button>
        </form>
    </div>
</template>

<script>
import moment from 'moment';
import userService from '@/services/user-service'
export default {
    name: 'post-details',
    props: ['post'],
    data() {
        return {
            //moment: moment,
            isShownModal: false,
            isShowAllComments: false,
            // like: false,
            user: null,
            commentToAdd: { content: '', createdAt: Date.now() }
        };
    },
    computed: {
        getCreatedAt() {
            //console.log('this.post.createdAt', this.post.createdAt);
            return moment(this.post.createdAt).fromNow();
        },
        getCommentCreatedAt() {
            //console.log('this.post.createdAt', this.post.createdAt);
            return moment(this.post.comments.createdAt).fromNow();
        },
        commentsToShow(){
            if (this.post.comments.length > 2 && !this.isShowAllComments){
                 return this.post.comments.slice(0,2)
            } else {
                return this.post.comments
            }
        },
        slicedCommentsLength(){
            return this.post.comments.length - 2
        },
        showMoreLess(){
            return (!this.isShowAllComments)? 'all' : 'less'
        },
        getLike(){
            const res = this.post.likes.findIndex(userLike => userLike._id === this.user._id)
            return res !== -1   
        },
        isByLoggedUser() {
            return (commentById) => commentById === this.user._id
        },
        
    },
    methods:{
        showLikesModal(){
           this.isShownModal= !this.isShownModal;
        },
        closeModal(){
            this.isShownModal = null;
        },
        addComment(){
            const commentCopy=JSON.parse(JSON.stringify(this.commentToAdd));
            this.$store.dispatch({
                type: 'addComment',
                comment: commentCopy,
                postId: this.post._id,
                user: this.user
            })
            commentToAdd: { content: ''}
        },
        addLike(){
            // this.like = !this.like;
            // console.log('add like', this.like)
            this.$store.dispatch({
                type: 'addLike',
                // like: this.like,
                postId: this.post._id,
                user: this.user
            })
        },
        removeComment(post, commentId){
            console.log('details remove commentId', commentId)
            console.log('details from post', postId)
            const commentIdx = post.findIndex(comment => comment.id === commentId)
            const postCopy = JSON.parse(JSON.stringify(post))
            postCopy.splice(commentIdx, 1)

            this.$store.dispatch({
                type: 'updatePost',
                updatedPost: postCopy
            })

        }
        // loadUser() {
        //     this.$store.dispatch({
        //         type: 'loadUser'
        //     })
        // }
        
    },
    async created() {
     const user = await userService.getById('u101')
     this.user = user;
     console.log('user', this.user)
    },
};
</script>
