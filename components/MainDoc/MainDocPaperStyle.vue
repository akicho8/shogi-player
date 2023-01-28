<template lang="pug">
.MainDocPaperStyle
  .columns
    .column
      b-message(type="is-info")
        p 紙面風にもっとも近づけた例
  .columns
    .column.ShogiPlayerContainer
      ShogiPlayer(
        :sp_body="kifu_book_info.sp_body"
        :sp_turn="-1"
        sp_layout="is_horizontal"
        sp_pi_variant="is_pi_variant_b"
        sp_summary="is_summary_off"
        sp_digit_label="is_digit_label_on"
        sp_stand_layout="is_stand_layout_to_top"
        sp_player_name_dir="is_player_name_dir_vertical"
        sp_balloon="is_balloon_off"
        :sp_player_info="{black: {name: '先手'}, white: {name: '後手'}}"
      )
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocPaperStyle",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_27479"),
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocPaperStyle
  .ShogiPlayerContainer
    max-width: 480px

    --sp_board_padding: 0        // 隙間なし
    --sp_board_color: white      // 盤透過
    --sp_grid_stroke: 1          // グリッド線(細)
    --sp_grid_outer_stroke: 2    // グリッド枠(太)
    --sp_stand_piece_w: 80px
    --sp_player_name_font_size: 16px
    --sp_digit_label_position: 14
    --sp_digit_label_font_size: 12px
</style>
