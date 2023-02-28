<template lang="pug">
.MainDocViewDemo1.column
  b-message(type="is-info")
    | コメント付きのKIF表示。view_modeは再生用のモードだけど、継盤のような感じでデフォルトでは駒を動かせる。勝手に駒を動かした後でも手を進めると本線に戻る
  .has-text-centered
    .title.is-4 {{kifu_book_info.name}}
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="4"
    :sp_player_info="sp_player_info"
    sp_board_variant="normal"
    sp_piece_variant="portella"
    sp_layout="horizontal"
    sp_controller
    sp_slider
  )
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo1",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_15733"),
      sp_player_info: {
        black: { name: "六代大橋宗銀", },
        white: { name: "伊藤印達",     },
      },
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo1
</style>
