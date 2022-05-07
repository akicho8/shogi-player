<template lang="pug">
.MainDocViewDemo3.column
  b-message(type="is-info")
    | スライダーのみ表示
  .has-text-centered
    .title.is-4 {{kifu_book_info.name}}
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="-1"
    sp_slider="is_slider_on"
    sp_bg_variant="is_bg_variant_d"
    )
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo3",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_27482"),
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo3
</style>
