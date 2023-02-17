<template lang="pug">
.MainDocEditDemo1.column
  b-message(type="is-info")
    | すべての駒を自由に動かせる
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="-1"
    sp_slider
    sp_bg_variant="a"
    sp_mode="edit"
    )
</template>

<script>
import { KifuBookInfo } from "../../models/kifu_book_info.js"

export default {
  name: "MainDocEditDemo1",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_15733"),
    }
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.MainDocEditDemo1
</style>
