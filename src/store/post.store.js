import { postService } from '@/services/post-service.js';

export const postStore = {
    state: {
        //strict: true,
        isLoading: false,
        posts: [],
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        getPosts(state) {
            return state.posts.sort((post1, post2) => post2.createdAt - post1.createdAt);
        },
        getPostsOfUser(state) {
            return state.userPosts.sort((post1, post2) => post2.createdAt - post1.createdAt);
        },
    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setPosts(state, { posts }) {
            state.posts = posts;
        },
        addComment(state, { comment, postIdx, user, isUserDetails }) {
            const miniUser = {
                _id: user._id,
                userName: user.userName,
                imgUrl: user.imgUrl,
            };
            comment.by = miniUser;
            state.posts[postIdx].comments.push(comment);
            // else state.userPosts[postIdx].comments.push(comment);
        },
        setLike(state, { postIdx, user }) {
            let loggedUser = user;
            const miniUser = {
                _id: loggedUser._id,
                userName: loggedUser.userName,
                imgUrl: loggedUser.imgUrl,
            };
            const userIsExist = state.posts[postIdx].likes.findIndex(
                (user) => user._id === loggedUser._id
            );

            if (userIsExist === -1) {
                state.posts[postIdx].likes.unshift(miniUser);
            } else {
                state.posts[postIdx].likes.shift(miniUser);
            }
        },
        setPostsOfUser(state, { userPosts }) {
            state.userPosts = userPosts;
        },
        // removeComment(state, { commentId, postIdx }) {
        //     state.posts[postIdx].comments.splice(commentId, 1);

        // },
        addPost(state, { postToAdd }) {
            state.posts.push(postToAdd);
        },
        updatePost(state, { updatedPost }) {
            const postIdx = state.posts.findIndex(
                (post) => post._id === updatedPost._id
            );
            state.posts.splice(postIdx, 1, updatedPost);
        },
        removePost(state, { postId }) {
            const idx = state.posts.findIndex((post) => post._id === postId);
            if (idx === -1) return;
            state.posts.splice(idx, 1);
        },
    },

    actions: {
        async loadPosts({ state, commit }) {
            commit({ type: 'setIsLoading', isLoading: true });
            const posts = await postService.getPosts();
            setTimeout(() => {
                commit({ type: 'setPosts', posts });
                commit({ type: 'setIsLoading', isLoading: false });
            }, 500);
        },
        async addComment({ state, commit }, { comment, postId, user, isUserDetails = false }) {
            // 1. find post idx. 2. add the comment to the post. 3. send the updated post to the json-server (put).
            // if (!isUserDetails) {
            const postIdx = state.posts.findIndex((post) => {
                return post._id === postId;
            });
            commit({ type: 'addComment', postIdx, comment, user, isUserDetails });
            await postService.update(state.posts[postIdx]);
            // } else {
            //     const postIdx = state.userPosts.findIndex((post) => {
            //         return post._id === postId;
            //     });
            //     commit({ type: 'addComment', postIdx, comment, user, isUserDetails });
            //     await postService.update(state.userPosts[postIdx]);
            // }

        },
        async addLike({ state, commit }, { postId, user }) {
            const postIdx = state.posts.findIndex(
                (post) => post._id === postId
            );
            commit({ type: 'setLike', postIdx, user });
            await postService.update(state.posts[postIdx]);
        },
        async loadPostsOfUser({ commit }, { user }) {
            const userPosts = await postService.getByUserId(user._id);
            commit({ type: 'setPostsOfUser', userPosts });
            return userPosts;
        },
        async updatePost({ commit }, { updatedPost }) {
            updatedPost = await postService.update(updatedPost);
            commit({ type: 'updatePost', updatedPost }); // replace the post (find the idx first) with the updatedPost
        },
        async addPost({ commit }, { postToAdd }) {
            postToAdd.createdAt = Date.now();
            postToAdd = await postService.add(postToAdd);
            commit({ type: 'addPost', postToAdd });
            return postToAdd;
        },
        async removePost({ commit }, { postId }) {
            await postService.remove(postId);
            commit({ type: 'removePost', postId });
        },
    },
};
