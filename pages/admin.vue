<template>
  <div class="admin-menu">
    <b-button variant="success" type="submit" @click="logout()"
      >ログアウト</b-button
    >
  </div>
</template>

<script>
export default {
  middleware: "auth",
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style scoped>
.admin-menu {
  width: 50%;
  margin: 0 auto;
}
</style>