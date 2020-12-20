<template lang="pug">
.MainDocSummary
  .section
    a(name="summary")
    .container
      .title.is-3 概要
      hr
      .content
        p.mt-5
          | Vue.js 用の将棋盤ライブラリで次のモードがある
        ul
          li <b>view_mode:</b> 指定した棋譜を再生する
          li <b>play_mode:</b> 手番毎に駒を操作する
          li <b>edit_mode:</b> 自由に局面を作る
        p.mt-5
          | UIについて
        ul
          li <b>レイアウト:</b> 駒台の配置を上下か左右か選択する
          li <b>レスポンシブ対応:</b> 横幅に応じて盤の比率を維持したまま拡縮する
          li <b>モバイル対応:</b> 自動的に駒台を上下に配置して画面幅を活用する (無効にもできる)
          li <b>CSS変数:</b> 構造を調べなくても用意したCSS変数で調整できる
        p.mt-5
          | その他
        ul
          li <b>駒落ち棋譜再生</b>: 可
          li <b>対応棋譜フォーマット:</b> KIF, SFEN
          li <b>フレームワーク:</b> Buefy
</template>

<script>
export default {
  name: "MainDocSummary",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocSummary
</style>
