<template lang="pug">
.MainDocViewDemo5.column
  b-message(type="is-info")
    | 最終手から表示。SFEN表示
  .has-text-centered
    .title.is-4 {{kifu_book_info.name}}
  ShogiPlayer.is_book_like(
    sp_piece_variant="is_piece_variant_b"
    :sp_controller="true"
    :sp_slider="true"
    sp_sfen_show="is_sfen_show_on"
    :sp_body="kifu_book_info.sp_body"
    )
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo5",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_27479"),
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo5
</style>
