import Vue from 'vue'
import Vuex from 'vuex'

import {postStore} from './post.store.js';
import {userStore} from './user.store.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    strict: true,
  },
  modules: {
    postStore,
    userStore
  
  }
})
