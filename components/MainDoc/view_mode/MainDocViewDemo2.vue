<template lang="pug">
.MainDocViewDemo2.column
  b-message(type="is-info")
    | シンプル。最終手から表示。※盤面クリックで操作可。天王山クリックで反転
  .has-text-centered
    .title.is-4 {{kifu_book_info.name}}
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="-1"
    sp_bg_variant="bright"
    sp_piece_variant="nureyon"
    sp_overlay_nav
    )
</template>

<script>
import { KifuBookInfo } from "../../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo2",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_27480"),
    }
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.MainDocViewDemo2
</style>
