<template>
  <div>
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
.main {
  font-size: 20px;
  padding: 30px;
}
</style>