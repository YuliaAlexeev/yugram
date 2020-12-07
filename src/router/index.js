import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/instayul-app.vue'
import postsPage from '../views/posts-page.vue'
import userDetails from '../views/user-details.vue';
import userConnection from '../views/user-connection.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/:userName',
    component: userDetails
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
