| 変数                                         | 初期値                    | 意味                                                                  |
|----------------------------------------------|---------------------------|-----------------------------------------------------------------------|
| `--sp_promote_select_modal_bg_color`         | hsla(0, 0%, 0%, 0.85)     | 成り不成り選択画面の背景色                                            |
| `--sp_promote_select_modal_hover_color`      | hsla(0, 0%, 100%, 0.5)    | 成り不成り選択でhoverした駒の背景色                                   |
| `--sp_promote_select_modal_z`                | $promote_select_modal_z   | 成り不成り選択モーダルの z-index                                      |
| `--sp_piece_blur`                            |                         0 | 駒ぼかし                                                              |
| `--sp_piece_grayscale`                       |                         0 | 駒グレースケール                                                      |
| `--sp_piece_contrast`                        |                       1.0 | 駒コントラスト                                                        |
| `--sp_piece_invert`                          |                         0 | 駒色反転                                                              |
| `--sp_piece_opacity`                         |                       1.0 | 駒不透明度                                                            |
| `--sp_piece_hue`                             |                       1.0 | 駒色相                                                                |
| `--sp_piece_saturate`                        |                       1.0 | 駒彩度                                                                |
| `--sp_piece_brightness`                      |                       1.0 | 駒輝度                                                                |
| `--sp_piece_sepia`                           |                         0 | 駒色セピア度                                                          |
| `--sp_piece_blend`                           | normal                    | 駒の mix-blend-mode の値                                              |
| `--sp_board_piece_rate`                      | 90%                       | 盤のセル内の駒占有率                                                  |
| `--sp_board_piece_position`                  | center                    | 駒を選択できる範囲内の駒の縦位置                                      |
| `--sp_piece_blink_color0`                    | hsla(0, 0%, 0%, 0.25)     | 最後に動かした駒の背景色1(点滅:0%)                                    |
| `--sp_piece_blink_color1`                    | hsla(0, 0%, 0%, 0.10)     | 最後に動かした駒の背景色2(点滅:100%)                                  |
| `--sp_piece_origin_color`                    | hsla(0, 0%, 0%, 0.10)     | 最後に動かした駒の元の位置の背景色                                    |
| `--sp_piece_selectable_color`                | hsla(0, 0%, 0%, 0.1)      | 持ち上げれる駒の背景色                                                |
| `--sp_lifted_origin_bg_color`                | hsla(0, 0%, 0%, 0.25)     | 持ち上げた駒の背景色                                                  |
| `--sp_lifted_origin_opacity`                 |                       0.4 | 持ち上げた駒の元のセルの非透明度                                      |
| `--sp_stand_piece_w`                         | 47px                      | 駒台のセル(W)                                                         |
| `--sp_stand_piece_h`                         | 50px                      | 駒台のセル(H)                                                         |
| `--sp_stand_piece_rate`                      | 80%                       | 駒台のセル内の駒占有率                                                |
| `--sp_piece_box_piece_w`                     | 47px                      | 駒箱のセル(W)                                                         |
| `--sp_piece_box_piece_h`                     | 50px                      | 駒箱のセル(H)                                                         |
| `--sp_piece_box_piece_rate`                  | 80%                       | 駒箱のセル内の駒占有率                                                |
| `--sp_body_width`                            | 100%                      | 盤(駒台を含む)の幅         FIXME: とる                                |
| `--sp_body_max_width`                        | none                      | 盤(駒台を含む)の最大幅     FIXME: とる                                |
| `--sp_ground_color`                          | transparent               | グラウンド背景色                                                      |
| `--sp_ground_image`                          | none                      | グラウンド背景画像                                                    |
| `--sp_ground_blur`                           |                         0 | ぼかし                                                                |
| `--sp_ground_grayscale`                      |                         0 | グレースケール                                                        |
| `--sp_ground_contrast`                       |                       1.0 | 駒コントラスト                                                        |
| `--sp_ground_invert`                         |                         0 | 駒色反転                                                              |
| `--sp_ground_hue`                            |                       1.0 | 色相                                                                  |
| `--sp_ground_saturate`                       |                       1.0 | 彩度                                                                  |
| `--sp_ground_brightness`                     |                       1.0 | 輝度                                                                  |
| `--sp_ground_sepia`                          |                         0 | セピア                                                                |
| `--sp_location_mark_inactive_rate`           |                       0.5 | 手番ではないときの☗サイズの倍率                                      |
| `--sp_piece_box_color`                       | rgba(0, 0, 0, 0.2)        | 駒箱背景                                                              |
| `--sp_common_gap`                            | 12px                      | 共通の隙間                                                            |
| `--sp_turn_slider_block_margin_top`          | 0.75rem                   | 手数スライダーの上マージン                                            |
| `--sp_board_color`                           | rgba(0, 0, 0, 0.2)        | 盤の色                                                                |
| `--sp_board_image`                           | none                      | 盤画像                                                                |
| `--sp_board_blur`                            |                         0 | 盤ぼかし                                                              |
| `--sp_board_grayscale`                       | 0%                        | 盤グレースケール                                                      |
| `--sp_board_contrast`                        |                       1.0 | 盤コントラスト                                                        |
| `--sp_board_invert`                          |                         0 | 盤色反転                                                              |
| `--sp_board_hue`                             |                       1.0 | 盤色相                                                                |
| `--sp_board_saturate`                        |                       1.0 | 盤彩度                                                                |
| `--sp_board_brightness`                      |                       1.0 | 盤輝度                                                                |
| `--sp_board_sepia`                           |                         0 | 盤セピア                                                              |
| `--sp_board_blend`                           | normal                    | 盤の mix-blend-mode の値                                              |
| `--sp_board_opacity`                         |                       1.0 | 非半透明度                                                            |
| `--sp_board_padding`                         |                       1.5 | 盤の隅の隙間                                                          |
| `--sp_board_radius`                          |                         5 | 盤の隅の丸め度合い                                                    |
| `--sp_grid_outer_stroke`                     |                       1.5 | グリッドの外枠の太さ(紙面風のとき)                                    |
| `--sp_grid_outer_color`                      | rgba(0, 0, 0, 0.5)        | グリッド外枠色                                                        |
| `--sp_grid_color`                            | rgba(0, 0, 0, 0.5)        | グリッド色                                                            |
| `--sp_grid_stroke`                           |                         1 | グリッド太さ                                                          |
| `--sp_grid_outer_texture_edge_stroke`        |                         0 | 盤背景の縁取りの太さ(影の影響あり)                                    |
| `--sp_grid_star_size`                        | 10%                       | 星の大きさ                                                            |
| `--sp_controller_width`                      |                       0.5 | コントローラー横幅                                                    |
| `--sp_controller_width_mobile`               |                       0.8 | コントローラー横幅(モバイル時)                                        |
| `--sp_stand_hover_border_color`              | rgba(0, 0, 0, 0.2)        | 駒を持って駒箱の上にいるときのボーダー色                              |
| `--sp_stand_hover_border_stroke`             | 2px                       | 駒を持って駒箱の上にいるときのボーダーの太さ                          |
| `--sp_stand_horizontal_hoverable_min_height` |                         3 | edit_mode + 縦配置 + 駒台に置ける のときの駒台の最低限の高さ(駒N個分) |
| `--sp_stand_bg_color`                        | hsla(0, 0%, 0%, 0)        | 駒台の背景色                                                          |
| `--sp_piece_count_gap_right`                 | 62%                       | 駒数の駒右端からのオフセット(横配置時)                                |
| `--sp_piece_count_gap_bottom`                | 32%                       | 駒数の駒底辺からのオフセット(縦配置時)                                |
| `--sp_piece_count_font_size`                 | 0.75rem                   | 駒数の文字サイズ                                                      |
| `--sp_piece_count_font_color`                | rgba(0, 0, 0, 0.75)       | 駒数の文字色                                                          |
| `--sp_piece_count_bg_color`                  | rgba(255, 255, 255, 0.75) | 駒数の文字色背景                                                      |
| `--sp_piece_count_padding`                   | 3px                       | 駒数のパディング                                                      |
| `--sp_board_aspect_ratio`                    |                     1.097 | 盤の横を1.0としたときの縦の比率                                       |
| `--sp_invisible_dimension`                   |                         9 | 天王山の付近を求めるための盤の縦辺のセル数                            |
| `--sp_shadow_offset`                         |                         2 | 影の右下方法への長さ                                                  |
| `--sp_shadow_blur`                           |                         3 | 影の範囲                                                              |
| `--sp_shadow_color`                          | rgba(0, 0, 0, 0.4)        | 影の色                                                                |
