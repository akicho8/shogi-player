# Customize

## 紙面風の例

<ShogiPlayerWcWrapper
  class="d1428e21a56b573f72b675b22c6bfe43"
  sp_layer="is_layer_off"
  sp_layout="is_layout_horizontal"
  sp_piece_variant="is_piece_variant_b"
  sp_digit_label="is_digit_label_on"
  sp_digit_label_variant="is_digit_label_variant_kanji"
  sp_stand_gravity="is_stand_gravity_top"
  sp_player_name_direction="is_player_name_direction_vertical"
  sp_balloon="is_balloon_off"
  sp_player_info="{black: {name: '先手'}, white: {name: '後手'}}"
/>
<style lang="stylus">
.ShogiPlayerWcWrapper.d1428e21a56b573f72b675b22c6bfe43
  shogi-player-wc::part(spwc_style_scope)
    font-family: serif                     // 明朝体
    color: black                           // "先手" "後手" の色

    --sp_board_color: white                // 盤の色を白にする
    --sp_board_padding: 0                  // グリッド外周と縁の隙間を無くす
    --sp_board_radius: 0                   // 角を丸めない
    --sp_grid_stroke: 0.5                  // グリッド内線は細くする(お好みで調整)
    --sp_grid_outer_stroke: 2              // グリッド外枠を内線より太くする(お好みで調整)
    --sp_player_name_size: 0.4             // "先手" "後手" の文字サイズ調整
    --sp_location_mark_inactive_size: 1.0  // 手番でない方の☗☖の比率を変更しない

                                           // 駒数
    --sp_piece_count_size: 0.4             // 駒数の大きさ調整
    --sp_piece_count_horizontal_x: 0.70    // 右に寄せる
    --sp_piece_count_horizontal_y: 0.03    // 少し下げる
    --sp_piece_count_bg_color: transparent // 背景を透過させる

                                           // 座標
    --sp_digit_label_color: black          // 座標の色を黒にする
    --sp_digit_xlabel_size: 0.3            // 座標の大きさ(上側)
    --sp_digit_xlabel_push: 0.073          // 位置を調整する(上側)
    --sp_digit_ylabel_size: 0.3            // 座標の大きさ(右側)
    --sp_digit_ylabel_push: -0.009         // 位置を調整する(右側)
    --sp_board_horizontal_gap: 0.5         // 座標があるため盤と駒台との隙間を空ける
</style>

```vue
ShogiPlayer(
  sp_layout="is_layout_horizontal"                       // 横配置にする
  sp_piece_variant="is_piece_variant_b"                  // 紙面用駒に切り替る
  sp_digit_label="is_digit_label_on"                     // 座標を表示する
  sp_digit_label_variant="is_digit_label_variant_kanji" // 右側の座標を「数値」表記に変更する
  sp_stand_gravity="is_stand_gravity_top"                // 駒台を上寄せ配置する
  sp_player_name_direction="is_player_name_direction_vertical"       // 名前を縦書きにする
  sp_balloon="is_balloon_off"                            // 名前の下の吹き出しを表示しない
  :sp_player_info="{black: {name: '先手'}, white: {name: '後手'}}"
)
```

```stylus
font-family: serif                     // 明朝体(座標と "先手" "後手" に適用)
color: black                           // 座標と "先手" "後手" の色

--sp_board_color: white                // 盤の色を白にする
--sp_board_padding: 0                  // グリッド外周と縁の隙間を無くす
--sp_board_radius: 0                   // 角を丸めない
--sp_grid_stroke: 0.5                  // グリッド内線(お好みで調整・かなり印象変わる)
--sp_grid_outer_stroke: 2              // グリッド外枠(お好みで調整・かなり印象変わる)
--sp_player_name_size: 0.4             // "先手" "後手" の文字サイズ調整
--sp_location_mark_inactive_size: 1.0  // 手番でない方の☗☖の比率を変更しない

// 駒数
--sp_piece_count_size: 0.4             // 駒数の大きさ調整
--sp_piece_count_horizontal_x: 0.70    // 右に寄せる
--sp_piece_count_horizontal_y: 0.03    // 少し下げる
--sp_piece_count_bg_color: transparent // 背景を透明にする

// 座標
--sp_digit_label_color: black          // 座標の色を黒にする
--sp_digit_xlabel_size: 0.3            // 上X座標の大きさ
--sp_digit_xlabel_push: 0.073          // 上X座標の位置調整
--sp_digit_ylabel_size: 0.3            // 右Y座標の大きさ
--sp_digit_ylabel_push: -0.009         // 右Y座標の位置調
--sp_board_horizontal_gap: 0.5         // 座標があるため盤と駒台との隙間を空ける
```

::: tip
* sp_digit_label_variant の値で右側の座標を「漢字」「数字」「アルファベット」に変更できる
* 線の太さに関する sp_grid_stroke と sp_grid_outer_stroke は設定値によってかなり印象が変わるためお好みで調整しよう
* .ShogiPlayer は 100% の大きさになるので外側(上の例では.ShogiPlayerContainer)で大きさを調整しよう
* さらにカスタマイズしたい場合はスタイルエディタを使おう
:::

  // .ShogiPlayerColumn
  //   max-width: 480px
  // .ShogiPlayerContainer
  //   border: 1px dashed change_color($primary, $alpha: 0.5)
  //   padding: 1.75rem 1.25rem 1.25rem
