<template lang="pug">
.MainDocPaperStyle
  .title.is-5
    | 紙面風にもっとも近づける例
  .columns.is-centered
    .column.is-4.ShogiPlayerColumn
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
  .columns.is-centered.is-multiline.is-variable.is-0-mobile.is-4-tablet.is-5-desktop.is-6-widescreen.is-7-fullhd.is-marginless
    .column.is-6
      .is-size-7 HTML (pug)
      pre.is-size-7
        | .ShogiPlayerContainer
        |   ShogiPlayer(
        |     sp_layout="is_horizontal"                        // 横配置にする
        |     sp_pi_variant="is_pi_variant_b"                  // 紙面用駒に切り替る
        |     sp_summary="is_summary_off"                      // 手数を表示しない
        |     sp_digit_label="is_digit_label_on"               // 座標を表示する
        |     sp_stand_layout="is_stand_layout_to_top"         // 駒台を上寄せ配置する
        |     sp_player_name_dir="is_player_name_dir_vertical" // 名前を縦書きにする
        |     sp_balloon="is_balloon_off"                      // 名前の下の吹き出しを表示しない
        |     :sp_player_info="{black: {name: '先手'}, white: {name: '後手'}}"
        |   )
    .column.is-6
      .is-size-7 CSS (sass)
      pre.is-size-7
        | .ShogiPlayerContainer
        |   font-family: serif                     // 明朝体(座標と "先手" "後手" に適用)
        |   color: black                           // "先手" "後手" の色
        |
        |   --sp_board_color: white                // 盤の色を白にする
        |   --sp_board_padding: 0                  // グリッド外周と縁の隙間を無くす
        |   --sp_board_radius: 0                   // 角を丸めない
        |   --sp_grid_stroke: 0.5                  // グリッド内線は細くする(お好みで調整)
        |   --sp_grid_outer_stroke: 2              // グリッド外枠を内線より太くする(お好みで調整)
        |   --sp_player_name_size: 0.4             // "先手" "後手" の文字サイズ調整
        |   --sp_location_mark_inactive_size: 1.0  // 手番でない方の☗☖の比率を変更しない
        |
        |   // 駒数
        |   --sp_piece_count_size: 0.4   // 駒数の大きさ調整
        |   --sp_piece_count_horizontal_x: 0.70    // 右に寄せる
        |   --sp_piece_count_horizontal_y: 0.03    // 少し下げる
        |   --sp_piece_count_bg_color: transparent // 背景を透過させる
        |
        |   // 座標
        |   --sp_digit_label_color: black          // 座標の色を黒にする
        |   --sp_digit_label_size: 0.35            // 座標のフォントサイズの調整
        |   --sp_digit_label_push: 0.14            // 座標を14%盤の外に押し出す
        |   --sp_board_horizontal_gap: 0.5         // 座標があるため盤と駒台との隙間を空ける
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
    font-family: serif                    // 明朝体
    color: black                          // "先手" "後手" の色

    --sp_board_color: white               // 盤の色を白にする
    --sp_board_padding: 0                 // グリッド外周と縁の隙間を無くす
    --sp_board_radius: 0                  // 角を丸めない
    --sp_grid_stroke: 0.5                 // グリッド内線は細くする(お好みで調整)
    --sp_grid_outer_stroke: 2             // グリッド外枠を内線より太くする(お好みで調整)
    --sp_player_name_size: 0.4       // "先手" "後手" の文字サイズ調整
    --sp_location_mark_inactive_size: 1.0 // 手番でない方の☗☖の比率を変更しない

    // 駒数
    --sp_piece_count_size: 0.4      // 駒数の大きさ調整
    --sp_piece_count_horizontal_x: 0.70       // 右に寄せる
    --sp_piece_count_horizontal_y: 0.03       // 少し下げる
    --sp_piece_count_bg_color: transparent    // 背景を透過させる

    // 座標
    --sp_digit_label_color: black  // 座標の色を黒にする
    --sp_digit_label_size: 0.35    // 座標のフォントサイズの調整
    --sp_digit_label_push: 0.14    // 座標を14%盤の外に押し出す
    --sp_board_horizontal_gap: 0.5 // 座標があるため盤と駒台との隙間を空ける

  // .ShogiPlayerColumn
  //   max-width: 480px
  // .ShogiPlayerContainer
  //   border: 1px dashed change_color($primary, $alpha: 0.5)
  //   padding: 1.75rem 1.25rem 1.25rem
</style>
