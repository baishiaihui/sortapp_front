<template>
  <div class="login-form">
    <b-form @submit.prevent="login()">
      <label for="user">LoginID</label>
      <b-form-input id="user" class="login-input" v-model="uid" type="text"></b-form-input>
      <label for="password">Password</label>
      <b-form-input
        id="password"
        class="login-input"
        v-model="password"
        type="password"
      ></b-form-input>
      <b-button variant="success" type="submit" @click="login()" class="login-button">ログイン</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: "",
      password: "",
    };
  },
  methods: {
    login() {
      //ローディング表示
      this.$nuxt.$loading.start();

      this.$auth
        .loginWith("local", {
          data: {
            uid: this.uid,
            password: this.password,
          },
        })
        .then(
          (response) => {
            console.log(response)
            //ローディング非表示
            this.$nuxt.$loading.finish();
          },
          (error) => {
            alert("IDまたはパスワードが間違っています！");

            //ローディング非表示
            this.$nuxt.$loading.finish();
            
          }
        );
    },
  },
};
</script>

<style scoped>
/* ログインフォーム */
.login-form{
  margin: 0 auto;
  width: 30%;
}

/* ログイン入力欄 */
.login-input{
  margin-bottom: 10px;
}

/* ログインボタン */
.login-button{
  margin: 0 auto;
  display:block;
}

/* レスポンシブ対応 */
@media screen and (max-width: 960px) {
  /* ログインフォーム */
  .login-form{
    width: 50%;
  }

}

@media screen and (max-width: 520px) {
  /* ログインフォーム */
  .login-form{
    width: 100%;
  }


}


</style>