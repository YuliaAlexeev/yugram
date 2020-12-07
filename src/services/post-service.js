import HttpService from './HttpService'

export const postService = {
    getPosts,
    getById,
    remove,
    update,
    getByUserId,
    add,
    getEmpty
}

function getPosts() {
    return HttpService.get('post')
}

function getById(postId) {
    return HttpService.get(`post/${postId}`)
}

function getByUserId(userId) {
    return HttpService.get(`post?by._id=${userId}`)
}

function remove(postId) {
    return HttpService.delete(`post/${postId}`)
}

function update(post) {
    return HttpService.put(`post/${post._id}`, post)
}

function add(post) {
    const miniUser = {_id: '5fc5fd32768787be41a9a627', userName: 'yulia.a', imgUrl: 'https://picsum.photos/id/305/200/300'}
    post.by = miniUser    
    return HttpService.post('post', post)
}

function getEmpty() {
    return {
        content: '',
        imgUrl: this.imgUrl,
        comments: [],
        likes: [],
    }
}