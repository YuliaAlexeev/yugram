<template>
  <div class="post-list">
    <post-details v-for="currPost in posts" :post="currPost" :key="currPost._id"></post-details>
  </div>
</template>

<script>
import postDetails from './post-details.vue'

export default {
  name: 'post-list',
  props: ['posts'],
  components:{
    postDetails
  }
}
</script>


