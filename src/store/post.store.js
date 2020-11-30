
import { postService } from '@/services/post-service.js';

export const postStore = {
    state: {
        strict: true,
        isLoading: false,
        posts: [],
        userPosts: []
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        getPosts(state) {
            console.log('all posts', state.posts)
            return state.posts;
        },
        getPostsOfUser(state){
            console.log('post of user', state.userPosts)
            return state.userPosts;
        }
    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setPosts(state, { posts }) {
            state.posts = posts;
        },
        addComment(state, { comment, postIdx, user }){
            const miniUser = {_id: user._id, userName: user.userName, imgUrl: user.imgUrl}
            comment.by = miniUser        
            state.posts[postIdx].comments.unshift(comment)
        },
        setLike(state, {postIdx, user }){
            let loggedUser = user;
            const miniUser = {_id: loggedUser._id, userName: loggedUser.userName, imgUrl: loggedUser.imgUrl}
            const userIsExist = state.posts[postIdx].likes.findIndex(user => user._id === loggedUser._id)
            
            if(userIsExist === -1){
                state.posts[postIdx].likes.unshift(miniUser)
            } else {
                state.posts[postIdx].likes.shift(miniUser)
            }
        },
        setPostsOfUser(state, {userPosts}){
            console.log('setPostsOfUser',userPosts)
            state.userPosts = userPosts;
        },
        removeComment(state, { commentId, postIdx }){    
            console.log('mutatios comment Id', commentId)   
            console.log('mutatios post Id', postIdx)   
            state.posts[postIdx].comments.splice(commentId, 1)
        },
        addPost(state, {postToAdd}){
            console.log('new post mutations', postToAdd)
            const miniUser = {_id: 'u101', userName: 'yulia.a', imgUrl: 'https://picsum.photos/id/305/200/300'}
            postToAdd.by = miniUser    
            state.posts.unshift(postToAdd)
        }
    },

    actions: {
        async loadPosts({ state, commit }) {
            commit({ type: 'setIsLoading', isLoading: true });
            //const postByUser = userService.getById
            const posts = await postService.getPosts();
            setTimeout(() => {
                commit({ type: 'setPosts', posts });
                commit({ type: 'setIsLoading', isLoading: false });
            }, 500);
        },
        async addComment({ state, commit }, { comment, postId, user }){
            // console.log('postId', postId)
            // 1. find post idx. 2. add the comment to the post. 3. send the updated post to the json-server (put).
      // console.log('payload', payload)
            const postIdx = state.posts.findIndex(post => post._id === postId)
            commit({type: 'addComment', postIdx, comment, user})
           
            await postService.update(state.posts[postIdx])
            //return comment;
        },

        async addLike({ state, commit }, {postId, user}){
            
            //console.log('payload', payload)
            const postIdx = state.posts.findIndex(post => post._id === postId)
            commit({type: 'setLike', postIdx, user})
           
            await postService.update(state.posts[postIdx])
            //return comment;
        },
        async loadPostsOfUser({commit}, { user }) {
            // console.log('loadPostsOfUser store commit',commit )
            // console.log('loadPostsOfUser store payload',user._id )
            const userPosts = await postService.getByUserId(user._id)
            commit({type: 'setPostsOfUser', userPosts })
             console.log('userPosts in store', userPosts)
            return userPosts;
             
        },

        async updatePost({ commit }, { updatedPost }){
            
            await postService.update(updatedPost)
            commit({ type: 'updatePost', updatedPost }) // replace the post (find the idx first) with the updatedPost
           
        },

        async addPost({ commit }, { postToAdd }){
            console.log('postToAdd store', postToAdd)
            postToAdd = await postService.add(postToAdd)
            console.log('post from db:', postToAdd);
            commit({ type: 'addPost', postToAdd })
            return postToAdd
        },
    },
};
