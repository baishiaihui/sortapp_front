<template>
  <div class="admin-menu">
    <div><h3>管理者メニュー</h3></div>

    <b-button variant="success" class="admin-menu-button" @click="to_add()"
      >新規追加</b-button
    >
    <b-button variant="success" class="admin-menu-button" @click="to_edit()"
      >変更/削除</b-button
    >

    <b-button
      variant="success"
      type="submit"
      class="admin-menu-button"
      @click="logout()"
      >ログアウト</b-button
    >
  </div>
</template>

<script>
export default {
  middleware: "auth",
  methods: {
    //今後見直し
    logout: function () {
      this.$auth.logout();
      ////今後見直し
      // this.$toast.success("ログアウトしました。", { position: "top-center" });
    },
    to_add: function () {
      this.$router.push("/admin/add");
    },
    to_edit: function () {
      this.$router.push("/admin/edit");
    },
  },
};
</script>

<style scoped>
/* メニューボタン枠 */
.admin-menu {
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* メニューボタン */
.admin-menu-button {
  display: block;
  margin: 0 auto;
  width: 200px;
  margin-top: 20px;
}
</style>