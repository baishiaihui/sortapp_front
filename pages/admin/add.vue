<template>
  <div class="add-form">
    <b-button class="to_menu_button" @click="to_menu()" variant="success"
      >管理者メニューへ</b-button
    >
    <h3>新規作成</h3>
    <b-form @submit.prevent="login()">
      <div class="add-input">
        <label for="name">品目名</label>
        <b-form-input
          id="name"
          v-model="$v.sortinfo.name.$model"
          type="text"
        ></b-form-input>
        <div v-if="$v.sortinfo.name.$dirty">
          <div class="error" v-if="!$v.sortinfo.name.required">
            品目名は必須入力です。
          </div>
          <div class="error" v-if="!$v.sortinfo.name.maxLength">
            品目名は{{
              $v.sortinfo.name.$params.maxLength.max
            }}文字以下で入力してください。
          </div>
        </div>
      </div>

      <div class="add-input">
        <label for="kana">読み仮名</label>
        <b-form-input
          id="kana"
          v-model="$v.sortinfo.kana.$model"
          type="text"
        ></b-form-input>
        <div v-if="$v.sortinfo.kana.$dirty">
          <div class="error" v-if="!$v.sortinfo.kana.required">
            読み仮名は必須入力です。
          </div>
          <div class="error" v-if="!$v.sortinfo.kana.maxLength">
            読み仮名は{{
              $v.sortinfo.kana.$params.maxLength.max
            }}文字以下で入力してください。
          </div>
        </div>
      </div>

      <div class="add-input">
        <label for="syno">類似語</label>
        <b-form-input
          id="syno"
          v-model="$v.sortinfo.syno.$model"
          type="text"
        ></b-form-input>
        <div v-if="$v.sortinfo.syno.$dirty">
          <div class="error" v-if="!$v.sortinfo.syno.maxLength">
            類似語は{{
              $v.sortinfo.syno.$params.maxLength.max
            }}文字以下で入力してください。
          </div>
        </div>
      </div>

      <div class="add-input">
        <label for="sort">分類1</label>
        <b-form-select
          id="sort"
          v-model="$v.sortinfo.sort.$model"
          :options="options"
          plain
        ></b-form-select>
        <div v-if="$v.sortinfo.sort.$dirty">
          <div class="error" v-if="!$v.sortinfo.sort.required">
            分類１は必ず指定してください。
          </div>
        </div>
      </div>

      <div class="add-input">
        <label for="sort2">分類2</label>
        <b-form-select
          id="sort2"
          class="add-input"
          v-model="$v.sortinfo.sort2.$model"
          :options="options"
          plain
        ></b-form-select>
        <div v-if="$v.sortinfo.sort2.$dirty">
          <div class="error" v-if="!$v.sortinfo.sort2.othersort">
            分類1とは異なる内容を選択してください。
          </div>
        </div>
      </div>

      <div class="add-input">
        <label for="detail">出し方のポイント</label>
        <b-form-textarea
          id="detail"
          v-model="$v.sortinfo.detail.$model"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <div v-if="$v.sortinfo.detail.$dirty">
          <div class="error" v-if="!$v.sortinfo.detail.maxLength">
            類似語は{{
              $v.sortinfo.detail.$params.maxLength.max
            }}文字以下で入力してください。
          </div>
        </div>
      </div>

      <div class="add-input">
        <label for="url">URL</label>
        <b-form-input
          class="add-input"
          id="url"
          v-model="$v.sortinfo.url.$model"
          type="text"
        ></b-form-input>
        <div v-if="$v.sortinfo.url.$dirty">
          <div class="error" v-if="!$v.sortinfo.url.url">
            URLの形式が正しくありません。
          </div>
        </div>
      </div>
      <b-button variant="success" @click="create()" class="create-button"
        >登録</b-button
      >
    </b-form>
  </div>
</template>

<script>
import {
  required,
  maxLength,
  url,
  sameAs,
  not,
} from "vuelidate/lib/validators";

export default {
  middleware: "auth",
  data() {
    return {
      sortinfo: {
        name: "",
        kana: "",
        syno: "",
        sort: null,
        sort2: null,
        detail: "",
        url: "",
      },

      //分別タイプの選択肢
      options: [
        { value: null, text: "指定なし" },
        { value: "普通ごみ", text: "普通ごみ" },
        { value: "ミックスペーパー", text: "ミックスペーパー" },
        { value: "プラスチック製容器包装", text: "プラスチック製容器包装" },
        { value: "小物金属", text: "小物金属" },
        { value: "空き缶・ペットボトル", text: "空き缶・ペットボトル" },
        { value: "空きびん", text: "空き缶びん" },
        { value: "粗大ごみ", text: "粗大ごみ" },
        { value: "資源集団回収", text: "資源集団回収" },
        { value: "粗大ごみ", text: "粗大ごみ" },
        { value: "その他", text: "その他" },
      ],
    };
  },
  validations: {
    sortinfo: {
      name: {
        required,
        maxLength: maxLength(60),
      },
      kana: {
        required,
        maxLength: maxLength(70),
      },
      syno: {
        maxLength: maxLength(850),
      },
      sort: {
        required,
      },
      sort2: {
        othersort: not(sameAs("sortinfo.sort")),
      },
      detail: {
        maxLength: maxLength(300),
      },
      url: {
        url,
        maxLength: maxLength(100),
      },
    },
  },
  methods: {
    create: async function () {
      if (this.$v.$invalid) {
        this.$toast.error("入力内容に誤りがあります！", {
          position: "top-center",
        });
      } else {
        const res = await this.$axios.$post(
          "/api/v1/sort_infos",
          this.sortinfo
        );

        if ((res.status = "SUCCESS")) {
          this.$toast.success("新規登録に成功しました。", {
            position: "top-center",
          });
          this.$router.push("/admin/menu");
        } else {
          this.$toast.error("新規登録に失敗しました。", {
            position: "top-center",
          });
        }
      }
    },
    to_menu: function () {
      this.$router.push("/admin/menu");
    },
  },
};
</script>

<style scoped>
/* 新規作成フォーム */
.add-form {
  width: 50%;
  margin: 0 auto;
}

/* メニューへボタン */
.to_menu_button {
  margin: 0 auto;
  margin-bottom: 30px;
  display: block;
}

/* 入力欄 */
.add-input {
  margin-bottom: 20px;
}

.error {
  color: red;
  background-color: #ffe4e1;
}

/* 登録ボタン */
.create-button {
  margin: 0 auto;
  display: block;
}

/* レスポンシブ対応 */
@media screen and (max-width: 960px) {
  /* 新規作成フォーム */
  .add-form {
    width: 75%;
  }
}

@media screen and (max-width: 520px) {
  /* 新規作成フォーム */
  .add-form {
    width: 100%;
  }
}
</style>