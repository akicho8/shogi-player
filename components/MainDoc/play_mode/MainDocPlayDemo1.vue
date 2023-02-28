<template lang="pug">
.MainDocPlayDemo1.column
  b-message(type="is-info")
    | 人間が操作できる。戻れば操作をやり直せる。デフォルトでは(二歩や千日手を除く)合法手のみの制限がある
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="-1"
    sp_slider
    sp_controller
    sp_board_variant="normal"
    sp_mode="play"
    )
</template>

<script>
import { KifuBookInfo } from "../../models/kifu_book_info.js"

export default {
  name: "MainDocPlayDemo1",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_15733"),
    }
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.MainDocPlayDemo1
</style>
