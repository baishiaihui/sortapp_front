<template>
  <div>
    <h2>
      川崎市　ゴミ分別情報
    </h2>
    <table v-if="sortinfos.length">
      <thead>
        <tr>
          <th>name</th>
          <th>kana</th>
          <th>sort</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in sortinfos" :key="info.id">
          <td>{{ info.name }}</td>
          <td>{{ info.kana }}</td>
          <td>{{ info.sort }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      情報が取得できませんでした
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    let sortinfos = []
    await $axios.$get('/api/v1/sort_infos')
      .then(res => (sortinfos = res))
    return { sortinfos }
  }
}
</script>