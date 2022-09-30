<template lang="pug">
// https://bulma.io/documentation/columns/responsiveness/
// widescreen 1/5 (is-one-fifth-widescreen)
// desktop    1/4 (is-one-quarter-desktop)
// tablet     1/3 (is-one-third-tablet)
.MainDocViewDemo7.column.is-one-fifth-widescreen.is-one-quarter-desktop.is-one-third-tablet
  ShogiPlayer.is_book_like(
    is_layer="is_layer_on"
    sp_pi_variant="is_pi_variant_b"
    sp_summary="is_summary_off"
    :sp_player_info="sp_player_info"
    :sp_turn="-1"
    :sp_body="kifu_book_info.sp_body"
    )
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo7",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_27489"),
      sp_player_info: {
        black: { name: "伊藤印達",     },
        white: { name: "六代大橋宗銀", },
      },
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo7
  +tablet
    --sp_grid_color: hsl(0, 0%, 70%)
    --sp_stand_piece_w: 20px
    --sp_stand_piece_h: 25px
    --sp_piece_count_gap_bottom: 70%
</style>
