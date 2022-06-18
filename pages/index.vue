<template>
  <div>
    <b-container>
      <div class="search-form mb-3">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="検索キーワードを入力してください"
            v-model="keyword"
          />
          <button class="btn btn-success" type="button" @click="search">
            検索
          </button>
        </div>
        <b-form-checkbox id="chk-1" v-model="syno_chk" name="syno_checkbox" cass="syno-chk">
          類似語も含む
        </b-form-checkbox>
      </div>

      <table v-if="sortinfos.length" class="info-table">
        <thead>
          <tr>
            <th>品目名</th>
            <th>分別タイプ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="info in sortinfos" :key="info.id">
            <td>{{ info.name }}</td>
            <td v-if="info.sort2">
              <bold>{{ info.sort }}</bold> または <bold>{{ info.sort2 }}</bold>
            </td>
            <td v-else>
              <label>{{ info.sort }}</label>
            </td>
            <td class="px-1">
              <b-button @click="show(info.id)" variant="success">詳細</b-button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else>{{ message }}</div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "ここに検索結果が表示されます",
      keyword: "", //検索キーワード
      syno_chk: false, //類似語含むチェックボックス
      sortinfos: [],
    };
  },
  methods: {
    search() {
      if (this.keyword == "") {
        alert("検索キーワードを入力してください！");
      } else {
        //ローディング表示
        this.$nuxt.$loading.start();

        //検索ワード、チェックボックスの状態をSessionStorageに保持
        sessionStorage.setItem("keyword", this.keyword);
        sessionStorage.setItem("syno_chk", this.syno_chk);

        const url = "/api/v1/search";
        this.$axios
          .get(url, {
            params: { keyword: this.keyword, syno_chk: this.syno_chk },
          })
          .then((res) => {
            this.sortinfos = res.data.sortinfos;

            //ローディング非表示
            this.$nuxt.$loading.finish();

            if (this.sortinfos.length) {
              //検索結果をSessionStorageに保持
              sessionStorage.setItem(
                "sortinfos",
                JSON.stringify(this.sortinfos)
              );
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
    //詳細表示
    show: function (id) {
      this.$router.push(`/${id}`);
    },
  },
  mounted() {
    //検索条件、結果を読み込む
    if (sessionStorage.hasOwnProperty("keyword")) {
      this.keyword = sessionStorage.getItem("keyword");
    }

    if (sessionStorage.hasOwnProperty("sortinfos")) {
      this.sortinfos = JSON.parse(sessionStorage.getItem("sortinfos"));
    }

    if (sessionStorage.hasOwnProperty("syno_chk")) {
      this.syno_chk = JSON.parse(sessionStorage.getItem("syno_chk"));
    }
  },
};
</script>

<style scoped>
/* 検索フォーム */
.search-form{
  width: 50%;
  margin: 0 auto;

}

.syno {
  margin: 10px;
}

/* 分別情報テーブル */
.info-table {
  border-collapse: separate;
  border-spacing: 13px;
  margin: 0 auto;
  width: 75%;
}

/* 太字用タグ */
bold {
  font-weight: bold;
}

/* レスポンシブ対応 */
@media screen and (max-width: 960px) {
  /* 分別情報テーブル */
  .info-table {
    width: 90%;
  }

  /* 検索フォーム */
  .search-form {
    width: 75%;
  }
}

@media screen and (max-width: 520px) {
  /* 分別情報テーブル */
  .info-table {
    width: 100%;
  }

  /* 検索フォーム */
  .search-form {
    width: 100%;
  }
}
</style>