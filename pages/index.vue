<template>
  <div>
    <h2>川崎市　ゴミ分別情報</h2>

    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        width="500"
        placeholder="検索キーワードを入力してください"
        v-model="keyword"
      />
      <button
        class="btn btn-success"
        type="button"
        @click="search"
      >
        検索
      </button>
    </div>

    <table v-if="sortinfos.length">
      <thead>
        <tr>
          <th>品目名</th>
          <th>分別タイプ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in sortinfos" :key="info.id">
          <td>{{ info.name }}</td>
          <td>{{ info.sort }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "ここに検索結果が表示されます",
      keyword: "",
      sortinfos: [],
    };
  },
  methods: {
    search() {
      if (this.keyword == "") {
        alert("検索キーワードを入力してください！");
      } else {
        const url = "/api/v1/search";
        this.$axios
          .get(url, { params: { keyword: this.keyword } })
          .then((res) => {
            this.sortinfos = res.data.sortinfos;

            if (this.sortinfos.length) {
              //何もしない
            } else {
              this.message =
                "入力されたキーワードを含む品目は見つかりませんでした。";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>