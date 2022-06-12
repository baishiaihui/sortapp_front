<template>
  <b-container class="align-items-center">
    <h2>{{ sortinfo.name }}</h2>
    <table class="tbl">
      <thread>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thread>

      <tbody>
        <tr>
          <td class="topic">分別タイプ</td>
          <td v-if="sortinfo.sort2">
            <label>{{ sortinfo.sort }}</label> または <label>{{ sortinfo.sort2 }}</label>
          </td>
          <td v-else><label>{{ sortinfo.sort }}</label></td>
        </tr>

        <tr>
          <td class="topic">出し方のポイント</td>
          <td v-if="sortinfo.detail ">{{ sortinfo.detail }}</td>
          <td v-else>特になし</td>
        </tr>

        <tr>
          <td class="topic">URL</td>
          <td v-if="sortinfo.url">
            <a :href="sortinfo.url">{{ sortinfo.url }}</a>
          </td>
          <td v-else>特になし</td>
        </tr>
      </tbody>
    </table>
    <b-button variant="success" @click="$router.go(-1)" style="margin-top: 30px"
      >戻る</b-button
    >
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
    fetchContent() {
      this.$axios
        .get(`/api/v1/sort_infos/${this.$route.params.id}`)
        .then((res) => {
          console.log(res.data);
          this.sortinfo = res.data;
        });
    },
  },
};
</script>

<style>
h2 {
  padding: 0.5em;
  color: #010101;
  background: #eaf3ff;
  border-bottom: solid 3px #516ab6;

}

label {
  font-weight: bold;
}

.topic {
  font-weight: bold;
  font-size: 22px;
  white-space: nowrap;
}

.tbl {
  border-collapse: separate;
  border-spacing: 15px;
}
</style>