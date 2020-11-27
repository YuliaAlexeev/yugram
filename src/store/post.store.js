
import { postService } from '@/services/post-service.js';

export const postStore = {
    state: {
        strict: true,
        isLoading: false,
        posts: [],
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        getPosts(state) {
            return state.posts;
        },
    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setPosts(state, { posts }) {
            state.posts = posts;
        },
        addComment(state, { comment, postIdx, user }){
            const miniUser = {_id: user._id, fullName: user.fullName, imgUrl: user.imgUrl}
            comment.by = miniUser        
            state.posts[postIdx].comments.unshift(comment)
        },
        setLike(state, {postIdx, user }){
            let loggedUser = user;
            const miniUser = {_id: loggedUser._id, fullName: loggedUser.fullName, imgUrl: loggedUser.imgUrl}
            const userIsExist = state.posts[postIdx].likes.findIndex(user => user._id === loggedUser._id)
            
            if(userIsExist === -1){
                state.posts[postIdx].likes.unshift(miniUser)
            } else {
                state.posts[postIdx].likes.shift(miniUser)
            }
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
        }
    },
};
