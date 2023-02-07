<template lang="pug">
.MainDocResponsiveWithBulmaOne.column.is-6-tablet.is-4-desktop.is-3-widescreen.is-2-fullhd
  ShogiPlayer.is_book_like(
    is_layer="is_layer_on"
    sp_piece_variant="is_piece_variant_b"
    :sp_player_info="sp_player_info"
    :sp_turn="-1"
    :sp_body="kifu_book_info.sp_body"
    )
</template>

<script>
import { KifuBookInfo } from "../../models/kifu_book_info.js"

export default {
  name: "MainDocResponsiveWithBulmaOne",
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
@import "../support.sass"
.MainDocResponsiveWithBulmaOne
  +tablet
    --sp_grid_inner_color: hsl(0, 0%, 70%)
</style>
