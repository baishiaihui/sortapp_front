## リファクタリング予定
<template>
  <div>
    <b-container>
      <b-button class="to_menu_button" @click="to_menu()" variant="success"
        >管理者メニューへ</b-button
      >
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

        <div class="syno-chk">
          <b-form-checkbox id="chk-1" v-model="syno_chk" name="syno_checkbox">
            類似語も含む
          </b-form-checkbox>
        </div>
      </div>

      <div>
        <table v-if="sortinfos.length" class="info-table">
          <thead>
            <tr>
              <th>品目名</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="info in sortinfos" :key="info.id">
              <td>{{ info.name }}</td>
              <td class="px-1 edit-menu">
                <b-button @click="to_update(info.id)" variant="success"
                  >更新</b-button
                >
                <b-button
                  v-b-modal="'confirm-delete-' + info.id"
                  variant="success"
                  >削除</b-button
                >

                <b-modal
                  :id="'confirm-delete-' + info.id"
                  hide-header
                  @ok="destroy(info.id)"
                >
                  <p>{{ info.name }}を本当に削除しますか？</p>
                </b-modal>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else>{{ message }}</div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      message: "ここに検索結果が表示されます",
      keyword: "", //検索キーワード
      syno_chk: false, //類似語含むチェックボックス
      sortinfos: [],
    };
  },
  methods: {
    //今後共通関数化する
    //キーワード検索の実行
    search: async function() {
      if (this.keyword == "") {
        alert("検索キーワードを入力してください！");
      } else {
        //ローディング表示
        this.$nuxt.$loading.start();

        // //検索ワード、チェックボックスの状態をSessionStorageに保持
        // sessionStorage.setItem("keyword", this.keyword);
        // sessionStorage.setItem("syno_chk", this.syno_chk);

        const url = "/api/v1/search";
        await this.$axios
          .get(url, {
            params: { keyword: this.keyword, syno_chk: this.syno_chk },
          })
          .then((res) => {
            this.sortinfos = res.data.sortinfos;

            console.log("検索成功");

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

    //更新画面へ
    to_update: function (id) {
      this.$router.push(`/admin/${id}`);
    },

    //データの削除
    destroy: async function (id) {
      //確認ダイアログを追加予定

      const res = await this.$axios.delete(`/api/v1/sort_infos/${id}`);

      if ((res.status = "SUCCESS")) {
        //再検索
        this.search();

        //成功トースト
        this.$toast.success("削除に成功しました。", { position: "top-center" });
      } else {
        //失敗トースト
        this.$toast.error("削除に失敗しました。", { position: "top-center" });
      }
    },
    to_menu: function () {
      this.$router.push("/admin/menu");
    },
  },
  mounted() {
    // //検索条件、結果を読み込む
    // if (sessionStorage.hasOwnProperty("keyword")) {
    //   this.keyword = sessionStorage.getItem("keyword");
    // }
    // if (sessionStorage.hasOwnProperty("syno_chk")) {
    //   this.syno_chk = JSON.parse(sessionStorage.getItem("syno_chk"));
    // }
  },
};
</script>

<style scoped>
/* 検索フォーム */
.search-form {
  width: 50%;
  margin: 0 auto;
}

.syno-chk {
  padding: 10px 0px 10px 5px;
  color: blue;
}

/* 分別情報テーブル */
.info-table {
  border-collapse: separate;
  border-spacing: 13px;
  margin: 0 auto;
  width: 50%;
}

.edit-menu{
  white-space: nowrap;
}

/* メニューへボタン */
.to_menu_button {
  margin: 0 auto;
  margin-bottom: 30px;
  display: block;
}

/* 太字用 */
.bold {
  font-weight: bold;
}

/* レスポンシブ対応 */
@media screen and (max-width: 960px) {
  /* 分別情報テーブル */
  .info-table {
    width: 75%;
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