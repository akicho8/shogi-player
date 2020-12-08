<template lang="pug">
.MainDocumentSummary
  .section
    a(name="summary")
    .container
      h2.title 概要
      hr
      .content
        p
          | Vue.js 用の将棋盤ライブラリで次のモードがあります
        ul
          li 棋譜再生 (view_mode)
          li 駒操作 (play_mode)
          li 盤面編集 (edit_mode)
        p.mt-5
          | その他の特徴
        ul
          li CSS変数による表示カスタマイズが容易
          li KIF と SFEN フォーマットに対応
          li Buefy 使用
</template>

<script>
export default {
  name: "MainDocumentSummary",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"
.MainDocumentSummary
</style>
