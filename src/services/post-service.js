import HttpService from './HttpService'

export const postService = {
    getPosts,
    getById,
    remove,
    update,
    _makeId,
    getByUserId,
    add
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
    console.log('service post', post)
    return HttpService.put(`post/${post._id}`, post)
}

function add(post) {
    const miniUser = {_id: 'u101', userName: 'yulia.a', imgUrl: 'https://picsum.photos/id/305/200/300'}
    post.by = miniUser    

    return HttpService.post('post', post)
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
