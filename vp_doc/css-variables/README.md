---
sidebar: auto
---

# CSS Variables

## まえがき

* 「セル内の駒の占有率」は簡単に言えば「駒の大きさ」になる
* そのとき占有率に関係なくタップできる領域の大きさは変わらない
* 「非透明度」という表現が難しい場合は「見える度」に置き換えるとイメージしやすい

## 基本

### `--sp_board_piece_size`
Default: `0.9`

盤上の駒の占有率

* かなり見た目の印象がかわる
* 駒の種類に応じて調整すべし
* Portella の場合
  * 1.0 にするのがおすすめ
  * Portella は画像の寸法は同じだが駒の種類ごとに大きさが調整されている
  * そのためデフォルト値では全体的に小さく見えてしまう
  * なので玉を最大の 1.0 にしておくとよい
* ぬれよんの場合
  * すべての駒の大きさが一定のため最大にすると圧迫感がある
  * 少し小さ目にしよう
* 紙面風の場合
  * デフォルト値よりもっと小さくてもいいかもしれない
  * 漢字が巨大だと暑苦しい
  * 小さめにすると余白ができてすっきりとした印象になる

### `--sp_board_piece_position`
Default: `center`

盤上の駒の縦の位置

升目の下方向に駒の下底を合わせたいときは bottom を指定する
top を指定するメリットはとくに思いつかない

| 値     | 位置   |
|--------|--------|
| top    | 上寄せ |
| center | 中央   |
| bottom | 下寄せ |

### `--sp_piece_origin_color`
Default: `hsla(0, 0%, 0%, 0.15)`

着手後の移動元の背景色

### `--sp_piece_selectable_color`
Default: `hsla(0, 0%, 0%, 0.15)`

持ち上げることができる駒にマウスカーソルを乗せたときの背景色

### `--sp_lifted_origin_bg_color_desktop`
Default: `hsla(0, 0%, 0%, 0.15)`

マウスカーソルで持ち上げた駒の移動元の升目の背景色

### `--sp_lifted_origin_opacity_desktop`
Default: `0.0`

マウスカーソルで持ち上げた駒の移動元にある駒の非透明度

半透明にすると駒が分身したかのように見える効果がある

### `--sp_lifted_origin_bg_color_touch`
Default: `hsla(0, 0%, 0%, 0.15)`

タッチ操作で持ち上げた駒の移動元のセルの背景色

### `--sp_lifted_origin_opacity_touch`
Default: `1.0`

タッチ操作で持ち上げた駒の移動元のセルの非透明度

### `--sp_stand_piece_size`
Default: `0.8`

駒台のセル内における駒の占有率

### `--sp_piece_box_piece_size`
Default: `0.8`

駒箱のセル内における駒の占有率

### TODO `--sp_body_width`
Default: `100%`

盤(駒台を含む)の幅         FIXME: とる

### TODO `--sp_body_max_width`
Default: `none`

盤(駒台を含む)の最大幅     FIXME: とる

### TODO `--sp_ground_color`
Default: `transparent`

グラウンド背景色

### TODO `--sp_ground_image`
Default: `none`

グラウンド背景画像

### TODO `--sp_piece_box_color`
Default: `rgba(0, 0, 0, 0.2)`

駒箱背景

### TODO `--sp_common_gap`
Default: `0.18`

共通の隙間(駒セルの縦幅に対する割合)

### TODO `--sp_turn_slider_block_margin_top`
Default: `0.75rem`

手数スライダーの上マージン

### TODO `--sp_board_horizontal_gap`
Default: `0`

盤の左右の隙間(横配置時)

### TODO `--sp_board_vertical_gap`
Default: `0`

盤の上下の隙間(縦配置時)

### TODO `--sp_board_color`
Default: `rgba(0, 0, 0, 0.2)`

盤の色

### TODO `--sp_board_image`
Default: `none`

盤画像

### TODO `--sp_board_opacity`
Default: `1.0`

非半透明度

### TODO `--sp_board_padding`
Default: `0.015`

盤の隅の隙間

### TODO `--sp_board_radius`
Default: `5`

盤の隅の丸め度合い

### TODO `--sp_grid_outer_stroke`
Default: `0`

グリッドの外枠の太さ(紙面風のとき)

### TODO `--sp_grid_outer_color`
Default: `rgba(0, 0, 0, 0.5)`

グリッド外枠色

### TODO `--sp_grid_color`
Default: `rgba(0, 0, 0, 0.5)`

グリッド色

### TODO `--sp_grid_stroke`
Default: `1`

グリッド太さ

### TODO `--sp_grid_outer_texture_edge_stroke`
Default: `0`

盤背景の縁取りの太さ(影の影響あり)

### TODO `--sp_grid_star_size`
Default: `0.1`

星の大きさ

### TODO `--sp_grid_star_z_index`
Default: `0`

星の z-index (符号の鬼ではタップの邪魔にならないよう -1 にする)

### TODO `--sp_controller_width`
Default: `0.5`

コントローラー横幅

### TODO `--sp_controller_width_mobile`
Default: `0.8`

コントローラー横幅(モバイル時)

### TODO `--sp_digit_xlabel_size`
Default: `0.125`

座標表記の文字サイズ(右)

### TODO `--sp_digit_ylabel_size`
Default: `0.168`

座標表記の文字サイズ(上)

### TODO `--sp_digit_xlabel_push`
Default: `0.014`

座標表記の位置調整(右)

### TODO `--sp_digit_ylabel_push`
Default: `-0.034`

座標表記の位置調整(上)

### TODO `--sp_digit_label_color`
Default: `hsla(0,0%,0%,0.75)`

座標表記の文字色

### TODO `--sp_piece_count_horizontal_x`
Default: `0.43`

駒数の中央からの相対位置X(%) (横配置時)

### TODO `--sp_piece_count_horizontal_y`
Default: `0.30`

駒数の中央からの相対位置Y(%) (横配置時)

### TODO `--sp_piece_count_vertical_x`
Default: `0.0`

駒数の中央からの相対位置X(%) (縦配置時)

### TODO `--sp_piece_count_vertical_y`
Default: `0.47`

駒数の中央からの相対位置y(%) (縦配置時)

### TODO `--sp_piece_count_size`
Default: `0.2`

駒数の文字サイズ(駒セル縦幅に対する比率)

### TODO `--sp_piece_count_font_color`
Default: `rgba(0, 0, 0, 0.75)`

駒数の文字色

### TODO `--sp_piece_count_bg_color`
Default: `rgba(255, 255, 255, 0.9)`

駒数の文字色背景

### TODO `--sp_piece_count_padding`
Default: `0.08`

駒数のパディング(駒セル縦幅に対する比率)

### TODO `--sp_board_aspect_ratio`
Default: `1.097`

盤の横を1.0としたときの縦の比率

### TODO `--sp_location_mark_inactive_size`
Default: `0.5`

手番ではないときの☗サイズの倍率

### TODO `--sp_player_name_size`
Default: `0.25`

対局者の名前の表示サイズ

### TODO `--sp_player_time_size`
Default: `0.25`

対局者の時間の表示サイズ

### TODO `--sp_stand_hover_border_color`
Default: `rgba(0, 0, 0, 0.2)`

駒を持って駒箱の上にいるときのボーダー色

### TODO `--sp_stand_hover_border_stroke`
Default: `2px`

駒を持って駒箱の上にいるときのボーダーの太さ

### TODO `--sp_stand_horizontal_hoverable_min_height`
Default: `3`

edit_mode + 縦配置 + 駒台に置ける のときの駒台の最低限の高さ(駒N個分)

### TODO `--sp_stand_bg_color`
Default: `hsla(0, 0%, 0%, 0)`

駒台の背景色

## 成り不成り

### TODO `--sp_promote_select_modal_bg_color`
Default: `hsla(0, 0%, 0%, 0.5)`

成り不成り選択画面の背景色

### TODO `--sp_promote_select_modal_hover_color`
Default: `hsla(0, 0%, 100%, 0.5)`

成り不成り選択でhoverした駒の背景色

### TODO `--sp_promote_select_modal_z`
Default: `30`

成り不成り選択モーダルの z-index

## 内部で使用

* オーバーライド禁止
* 何かのときに参照するのは良い

### TODO `--sp_board_dimension_w`
Default: `9`

盤面の横のセル数

### TODO `--sp_board_dimension_h`
Default: `9`

盤面の縦のセル数

### TODO `--sp_base_w`
Default: `47px`

盤面のセルの現在の横幅で動的に変化する

### TODO `--sp_base_h`
Default: `50px`

盤面のセルの現在の縦幅で動的に変化する
