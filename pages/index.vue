<template lang="pug">
MainDocumentIndex
</template>

<script>
export default {
  name: "index",
  data () {
    return {
    }
  },
  computed: {
    // 内容は nuxt.config.js と同じだけど設定は必要
    // 他のページから遷移してきたとき設定していないと title が undefined になってしまう
    meta() {
      return {
        title: this.$config.APP_NAME,
        short_title: true,
      }
    },
  },
}
</script>

<style lang="sass">
.index
</style>
