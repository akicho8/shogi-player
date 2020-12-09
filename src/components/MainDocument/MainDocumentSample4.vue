<template lang="pug">
.MainDocumentSample4.column
  b-message(type="is-info")
    | コントローラーとスライダー付き。121手目から表示。
  .has-text-centered
    .title.is-3 藤井聡太四段 vs 澤田真吾六段
    p.subtitle 第43期棋王戦予選
  hr
  ShogiPlayer.is_book_like(
    :kifu_body="kifu_body"
    :start_turn="121"
    :controller_show="true"
    :slider_show="true"
    :sp_pi_variant="'is_pi_variant_b'"
    )
</template>

<script>
export default {
  name: "MainDocumentSample4",
  data() {
    return {
      kifu_body: require("./kif/藤井聡太四段_vs_澤田真吾六段.kif"),
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocumentSample4
</style>
