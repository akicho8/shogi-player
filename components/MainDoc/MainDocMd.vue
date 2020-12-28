<template lang="pug">
.content.MainDocMd(v-html="html_formated")
</template>

<script>
import { CustomMarked } from "./CustomMarked.js"

export default {
  name: "MainDocMd",
  props: {
    body: { type: String, required: true, default: "", },
  },
  computed: {
    html_formated() { return CustomMarked(this.body) },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocMd
  // オプションの説明がつっぱらないように横スクロールバー表示
  .table_wrap
    overflow-x: auto
  table
    white-space: nowrap
  pre
    font-family: Osaka-mono, "Osaka-等幅", "ＭＳ ゴシック", "Courier New", Consolas, monospace ! important
    white-space: pre-wrap
    word-break: break-all
</style>
