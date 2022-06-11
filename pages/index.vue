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
          <td v-if="info.sort2">{{ info.sort }}　または　{{info.sort2}}</td>
          <td v-else>{{info.sort}}</td>
          <td><b-button @click="show(info.id)" variant="success">詳細</b-button></td>
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

        //検索ワードをSessionStorageに保持
        sessionStorage.setItem('keyword',this.keyword)

        const url = "/api/v1/search";
        this.$axios
          .get(url, { params: { keyword: this.keyword } })
          .then((res) => {
            this.sortinfos = res.data.sortinfos;

            if (this.sortinfos.length) {
              //検索結果をSessionStorageに保持
              sessionStorage.setItem('sortinfos',JSON.stringify(this.sortinfos))

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
    show: function (id) {
      this.$router.push(`/${id}`);
    }
  },
  mounted(){
    if(sessionStorage.hasOwnProperty('keyword')){
      this.keyword = sessionStorage.getItem('keyword')
    }

    if(sessionStorage.hasOwnProperty('sortinfos')){
      this.sortinfos = JSON.parse(
        sessionStorage.getItem('sortinfos')
      )
    }

  }
};
</script>