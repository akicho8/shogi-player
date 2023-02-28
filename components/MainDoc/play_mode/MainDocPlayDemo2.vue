<template lang="pug">
.MainDocPlayDemo2.column
  b-message(type="is-info")
    | sp_human_side オプションで▲側だけを人間が操作できるようにする。これは主にCPU対人間のときに使う
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="21"
    sp_slider
    sp_controller
    sp_board_variant="bright"
    sp_mode="play"
    sp_human_side="black"
    )
</template>

<script>
import { KifuBookInfo } from "../../models/kifu_book_info.js"

export default {
  name: "MainDocPlayDemo2",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_15733"),
    }
  },
}
</script>

<style lang="sass">
@import "../support.sass"
.MainDocPlayDemo2
</style>
