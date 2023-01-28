<template lang="pug">
.MainDocPaperStyle
  .title.is-5
    | 紙面風にもっとも近づける例
  .columns.mt-0
    .column.is-4
      .ShogiPlayerContainer
        ShogiPlayer(
          :sp_body="kifu_book_info.sp_body"
          :sp_turn="-1"
          sp_layer="is_layer_off"
          sp_layout="is_horizontal"
          sp_pi_variant="is_pi_variant_b"
          sp_summary="is_summary_off"
          sp_digit_label="is_digit_label_on"
          sp_stand_layout="is_stand_layout_to_top"
          sp_player_name_dir="is_player_name_dir_vertical"
          sp_balloon="is_balloon_off"
          :sp_player_info="{black: {name: '先手'}, white: {name: '後手'}}"
        )
    .column.is-4
      .is-size-7 HTML (pug)
      pre.is-size-7
        | .ShogiPlayerContainer
        |   ShogiPlayer(
        |     sp_layout="is_horizontal"                        // 横配置
        |     sp_pi_variant="is_pi_variant_b"                  // 紙面用駒に切り替え
        |     sp_summary="is_summary_off"                      // 手数を表示しない
        |     sp_digit_label="is_digit_label_on"               // 座標を表示する
        |     sp_stand_layout="is_stand_layout_to_top"         // 駒台を上寄せ配置する
        |     sp_player_name_dir="is_player_name_dir_vertical" // 名前を縦書きにする
        |     sp_balloon="is_balloon_off"                      // 名前の下の背景を表示しない
        |     :sp_player_info="{black: {name: '先手'}, white: {name: '後手'}}"
        |   )
    .column.is-4
      .is-size-7 CSS (sass)
      pre.is-size-7
        | .ShogiPlayerContainer
        |   --sp_board_color: white          // 盤の色を白にする
        |   --sp_board_padding: 0            // グリッド外周と縁の隙間を無くす
        |   --sp_grid_stroke: 1              // グリッド内線は細くする
        |   --sp_grid_outer_stroke: 2        // グリッド外枠を内線より太くする
        |   --sp_player_name_font_size: 16px // "先手" "後手" の文字サイズ調整
        |
        |   // 持駒サイズ調整
        |   --sp_stand_piece_w: 30px
        |   --sp_stand_piece_h: 30px
        |
        |   // 駒数
        |   --sp_piece_count_horizontal_x: 70      // 右に寄せる
        |   --sp_piece_count_horizontal_y: 2       // 少し下げる(錯視を考慮)
        |   --sp_piece_count_bg_color: transparent // 背景を透過させる
        |
        |   // 座標
        |   font-family: serif                 // 明朝体
        |   --sp_digit_label_font_color: black // 座標の色を黒にする
        |   --sp_digit_label_font_size: 12px   // 座標のフォントサイズの調整
        |   --sp_digit_label_position: 14      // 座標を14%盤の外に押し出す
        |   --sp_board_horizontal_gap: 4%      // 座標があるため盤と駒台との隙間を空ける

  .ShogiPlayerContainer
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
    --sp_board_color: white          // 盤の色を白にする
    --sp_board_padding: 0            // グリッド外周と縁の隙間を無くす
    --sp_grid_stroke: 1              // グリッド内線は細くする
    --sp_grid_outer_stroke: 2        // グリッド外枠を内線より太くする
    --sp_player_name_font_size: 16px // "先手" "後手" の文字サイズ調整

    // 持駒サイズ調整
    --sp_stand_piece_w: 30px
    --sp_stand_piece_h: 30px

    // 駒数
    --sp_piece_count_horizontal_x: 70      // 右に寄せる
    --sp_piece_count_horizontal_y: 2       // 少し下げる(錯視を考慮)
    --sp_piece_count_bg_color: transparent // 背景を透過させる

    // 座標
    font-family: serif                 // 明朝体
    --sp_digit_label_font_color: black // 座標の色を黒にする
    --sp_digit_label_font_size: 12px   // 座標のフォントサイズの調整
    --sp_digit_label_position: 14      // 座標を14%盤の外に押し出す
    --sp_board_horizontal_gap: 4%      // 座標があるため盤と駒台との隙間を空ける

  .ShogiPlayerContainer
    border: 1px dashed change_color($primary, $alpha: 0.5)
    padding: 1.75rem 1.25rem 1.25rem
</style>
