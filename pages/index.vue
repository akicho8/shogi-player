<template lang="pug">
MainDocApp
</template>

<script>
export default {
  name: "PageIndex",
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
// .PageIndex
</style>
