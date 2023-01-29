<template lang="pug">
.MainDocViewDemo8.column
  b-message(type="is-info")
    | BOD形式を含むKIFの読み込み
  //- .has-text-centered
  //-   .title.is-4 {{kifu_book_info.name}}
  .columns
    .column
      ShogiPlayer(
        sp_pi_variant="is_pi_variant_a"
        sp_controller="is_controller_on"
        sp_slider="is_slider_on"
        :sp_turn="0"
        :sp_body="kifu_book_info.sp_body"
        )
    .column
      pre
        | {{kifu_book_info.sp_body}}
</template>

<script>
import { KifuBookInfo } from "../../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo8",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_BOD_LIKE_SAMPLE1"),
    }
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.MainDocViewDemo8
  --sp_board_color: hsla(205.71,17.07%,59.8%,1)
</style>
