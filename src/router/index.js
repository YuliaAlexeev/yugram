import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/instagram-app.vue'
import addPost from '../views/add-post.vue'
import postsPage from '../views/posts-page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/create',
    component: addPost
  },
  {
    path: '/explore',
    component: postsPage
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
