import HttpService from './HttpService'

export const postService = {
    getPosts,
    getById,
    remove,
    update,
    _makeId
}

function getPosts() {
    return HttpService.get('post')
}

function getById(postId) {
    return HttpService.get(`post/${postId}`)
}

function remove(postId) {
    return HttpService.delete(`post/${postId}`)
}

function update(post) {
    return HttpService.put(`post/${post._id}`, post)
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

// function add(comment) {
//     return HttpService.post(`post`, comment)
// }