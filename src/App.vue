<template>
  <div id="app" class="main-layout">
    <main-header />
    <router-view />
    <footer class="main-footer">Coffee Rights 2020 Made By Yulia Alexeev</footer>
  </div>
</template>
<script>
import mainHeader from "@/cmps/main-header.vue";

export default {
  name: "App",
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    loadUser() {
      this.$store.dispatch({
        type: 'loadUser'
      })
    }
  },
  created() {
    this.loadUser();
    console.log('loggedInUser', this.loggedInUser)
  },
  components: {
    mainHeader
  },
};
</script>
