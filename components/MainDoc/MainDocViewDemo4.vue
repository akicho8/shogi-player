<template lang="pug">
.MainDocViewDemo4.column
  b-message(type="is-info")
    | コントローラーとスライダー付き。121手目から表示。
  .has-text-centered
    .title.is-4 藤井聡太四段 vs 澤田真吾六段
    p.subtitle 第43期棋王戦予選
  hr
  ShogiPlayer.is_book_like.type_a(
    :kifu_body="kifu_body"
    :start_turn="121"
    :controller_show="true"
    :slider_show="true"
    :sp_pi_variant="'is_pi_variant_b'"
    :sp_blink="'is_blink_on'"
    )
</template>

<script>
import kifu_body from "./kif/藤井聡太四段_vs_澤田真吾六段.kif"

export default {
  name: "MainDocViewDemo4",
  data() {
    return {
      kifu_body: kifu_body,
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo4
</style>
