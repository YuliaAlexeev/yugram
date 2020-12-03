<template>
  <div class="screen" @click="closeModal">
    <div class="screen-box">
      <div class="screen-box-top">
        <slot name="title"></slot>
        <button slot="button" @click="closeModal">
          <svg height="24" viewBox="0 0 48 48" width="24">
            <path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="screen-box-bottom">
        <slot name="users"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
//   props: ["user"],
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
//   created() {
//     console.log("slot user", this.user);
//   },
};
</script>