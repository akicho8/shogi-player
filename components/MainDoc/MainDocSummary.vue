<template lang="pug">
.MainDocSummary
  .section
    a(name="summary")
    .container
      .title.is-3 概要
      hr
      .content
        p.mt-5
          | Vue.js 用の将棋盤ライブラリで次のモードがあります
        ul
          li <b>view_mode:</b> 指定した棋譜を再生します
          li <b>play_mode:</b> 手番毎に駒を操作できます
          li <b>edit_mode:</b> 盤面を編集して課題局面や詰将棋などを作れます
        p.mt-5
          | UIについて
        ul
          li <b>レイアウト:</b> 駒台の配置を上下か左右か選択できます
          li <b>レスポンシブ対応:</b> 横幅に応じて盤が比率を維持したまま自動的に拡縮します
          li <b>モバイル対応:</b> 自動的に駒台を上下に配置し、横幅を最大に活用します (無効にもできます)
          li <b>表示カスタマイズ:</b> 構造を調べて上書きするのではなく、用意したCSS変数で調整が可能です
        p.mt-5
          | その他
        ul
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
