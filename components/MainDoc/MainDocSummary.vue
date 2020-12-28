<template lang="pug">
.MainDocSummary
  .section
    a(name="summary")
    .container
      .title.is-3 概要
      hr
      .content
        p.mt-5
          | Vue.js 用の将棋盤ライブラリで3つのモードがある
        ul
          li <b>再生:</b> 指定した棋譜を再生する
          li <b>操作:</b> 手番毎に駒を操作する
          li <b>編集:</b> 自由に局面を作る
        p.mt-5
          | UI
        ul
          li <b>レイアウト:</b> 駒台の配置を上下か左右か選択する
          li <b>レスポンシブ対応:</b> 親要素の横幅に応じて盤の比率を維持したまま拡縮する
          li <b>モバイル対応:</b> 駒台が横配置であっても自動的に上下に配置して狭い画面を活用する (無効にできる)
          li <b>カスタマイズ:</b> 見た目の微調整は、HTMLの構造を調べることなく、用意したCSS変数で変更可
        p.mt-5
          | その他
        ul
          li <b>駒落ち棋譜再生</b>: 対応
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
