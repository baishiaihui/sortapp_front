<template>
  <b-container class="detail-container">
    <h3 class="detail-title">{{ sortinfo.name }}</h3>
    <table class="detail-table" border="1">
      <tbody>
        <tr>
          <td class="detail-topic">分別タイプ</td>
          <td v-if="sortinfo.sort2">
            <label class="bold">{{ sortinfo.sort }}</label> または
            <label class="bold">{{ sortinfo.sort2 }}</label>
          </td>
          <td v-else>
            <label class="bold">{{ sortinfo.sort }}</label>
          </td>
        </tr>

        <tr>
          <td class="detail-topic">出し方のポイント</td>
          <td v-if="sortinfo.detail">{{ sortinfo.detail }}</td>
          <td v-else>特になし</td>
        </tr>

        <tr>
          <td class="detail-topic">URL</td>
          <td v-if="sortinfo.url">
            <a :href="sortinfo.url">{{ sortinfo.url }}</a>
          </td>
          <td v-else>特になし</td>
        </tr>

        <tr>
          <td>
            <b-button
              variant="success"
              @click="$router.go(-1)"
              style="margin-top: 30px"
              >戻る</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      sortinfo: {},
    };
  },
  mounted() {
    this.fetchContent();
  },
  methods: {
    //詳細情報の取得
    fetchContent() {
      this.$axios
        .get(`/api/v1/sort_infos/${this.$route.params.id}`)
        .then((res) => {
          this.sortinfo = res.data;
        });
    },
  },
};
</script>

<style scoped>
/* 画面幅　*/
.detail-container {
  width: 50%;
  margin: 0 auto;
}

/* タイトル */
.detail-title {
  padding: 0.5em;
  color: #010101;
  background: #eaf3ff;
  border-bottom: solid 3px #516ab6;
}

/* 分別情報テーブル */
.detail-table {
  border-collapse: separate;
  border-spacing: 15px;
  border: 1px;
  word-break:break-all;
}

.detail-topic {
  background-color: #eaf3ff;
  font-weight: bold;
  color: #010101;
}

/* 太字用 */
.bold {
  font-weight: bold;
}

/* レスポンシブ対応 */
@media screen and (max-width: 960px) {
  /* 画面幅　*/
  .detail-container {
    width: 75%;
  }
}

@media screen and (max-width: 520px) {
  /* 画面幅　*/
  .detail-container {
    width: 100%;
  }
}
</style>