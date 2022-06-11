<template>
  <div class="container">
    <table>
      <thread>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thread>

      <tbody>
        <tr>
          <td>品目名</td>
          <td>{{ sortinfo.name }}</td>
        </tr>

        <tr>
          <td>分別タイプ</td>
          <td v-if="sortinfo.sort2">{{ sortinfo.sort }}　または　{{ sortinfo.sort2 }}</td>
          <td v-else>{{ sortinfo.sort }}</td>
        </tr>

        <tr>
          <td>出し方のポイント</td>
          <td>{{ sortinfo.detail }}</td>
        </tr>

        <tr>
          <td>URL</td>
          <td>{{ sortinfo.url }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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