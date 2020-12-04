<template>
  <section class="user-connection">
    <!-- <img src="@/assets/user-connection.png" />
      <div class="connection">
          <h1 class="main-header-inner-logo">Instayul</h1>

        <img class="profile-img avatar" :src="user.imgUrl" /> 
          {{loggedInUser}}

          <button class="continue-as-btn">continue</button>
      </div> -->
  </section>
</template>

<script>
import userService from "@/services/user-service.js";
export default {
  computed: {
    // loggedInUser() {
    //   return this.$store.getters.loggedInUser;
    // },
  },
};
</script>
