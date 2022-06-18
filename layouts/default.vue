<template>
  <div class="wrapper">
    <Header />
    <div class="main">
      <nuxt />
      <!-- パスと一致するページファイルが呼び出しされる -->
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue"; // headerをインポート
import Footer from "@/components/footer.vue"; // footerをインポート
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.wrapper{
      position: relative;
      padding-bottom: 60px;
      min-height: 100vh;
}

.main {
  font-size: 20px;
  padding: 30px;
}

  /* レスポンシブ対応 */
  @media screen and (max-width:960px) {
    /* フォント調整 */
	  .main{
		  font-size: 18px;
	  }
  }

  @media screen and (max-width:520px) {
    /* フォント調整 */
	  .main{
		  font-size: 15px;
	  }

  }


</style>