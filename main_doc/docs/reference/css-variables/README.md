---
sidebar: auto
---

# CSS Variables

## 概要

* CSS変数は基本 `:root` に対して定義している
* Web Components 版は `:host` に定義している
* セルと駒の占有率について
  * セルは駒をタップできる領域
  * 占有率は簡単に言えば駒の見た目の大きさになる
  * 占有率が変わってもタップできる領域は変わらない
* 非透明度とは？
  * 「見える度」に置き換えるとイメージしやすい

## 盤

### `--sp_board_color`
Default: `hsl(0 0% 0% / 0.2)`

盤の色

* 初期値は灰色ではなく黒の半透明なので配置する場所の背景色を変更すると調和しやすい

### `--sp_board_even_cell_color`
Default: `transparent`

偶数番目のセルの色

### `--sp_board_odd_cell_color`
Default: `transparent`

奇数番目のセルの色

### `--sp_board_image`
Default: `none`

盤の画像

### `--sp_board_padding`
Default: `0.015`

盤の外周の隙間

* 紙面風であれば 0 にしよう

### `--sp_board_radius`
Default: `5`

盤の角の丸め度合い

* 駒のセルの縦幅に対する比率

### `--sp_board_aspect_ratio`
Default: `1.097`

盤の横を 1.0 としたときの縦の比率

### `--sp_board_horizontal_gap`
Default: `0`

盤の左右の隙間

* 横配置時にのみ有効
* 紙面風で座標を表示したときだけ隙間を開けると見栄えがよくなる

### `--sp_board_vertical_gap`
Default: `0`

盤の上下の隙間

* 縦配置時にのみ有効

### `--sp_common_gap`
Default: `0.02`

共通の隙間 <Badge text="要改善" type="error" vertical="top" />

* 盤の縦幅に対する割り合い
* どこを表しているのかわかりにくい

## 盤上の駒

### `--sp_board_piece_size`
Default: `0.9`

盤上の駒の占有率

* かなり印象がかわる
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

| 値       | おすすめ |
|----------|----------|
| ぬれよん |      0.9 |
| 紙面風   | 0.8〜0.9 |
| Portella |      1.0 |

### `--sp_board_piece_position`
Default: `center`

盤上の駒の縦の位置

| 値     | 位置   | 備考                                   |
|--------|--------|----------------------------------------|
| top    | 上寄せ | 違和感しかない                         |
| center | 中央   | 初期値                                 |
| bottom | 下寄せ | 升目の下方向に駒の下底を合わせたいとき |

## 格子 (グリッド)

### `--sp_grid_inner_stroke`
Default: `1`

盤の内側の格子の太さ

### `--sp_grid_inner_color`
Default: `hsl(0 0% 0% / 0.5)`

盤の内側の格子の色

### `--sp_grid_outer_stroke`
Default: `0`

盤の格子の外枠の太さ

* 通常の盤はパディングがあるため 0 で良い
* 紙面風の場合は 1 以上を指定する
  * 1 か 2 で印象が変わる

### `--sp_grid_outer_color`
Default: `hsl(0 0% 0% / 0.5)`

盤の外枠の色

### `--sp_board_edge_stroke`
Default: `0`

盤のエッジの縁取りの太さ

### `--sp_board_edge_color`
Default: `var(--sp_grid_outer_color)`

盤のエッジの縁取りの太さ

## 星

### `--sp_star_size`
Default: `0.1`

星の大きさ

### `--sp_star_color`
Default: `var(--sp_grid_outer_color)`

星の色

### `--sp_star_z_index`
Default: `0`

星の z-index

* 本来、星の大きさにかかわらずそのまわりの4つのセルはタップできるべきだが星が大きすぎるとタップできない <Badge text="BUG" type="error" vertical="top" />
* そのため[符号の鬼](https://www.shogi-extend.com/xy)では判定ミスを防ぐため `-1` にしている

## 着手

### `--sp_piece_selectable_color`
Default: `hsl(0 0% 0% / 0.15)`

持ち上げることができる駒にマウスポインタを乗せたときの背景色

### `--sp_mouse_lifted_origin_bg_color`
Default: `hsl(0 0% 0% / 0.15)`

マウスポインタで持ち上げた駒の移動元の升目の背景色

### `--sp_mouse_lifted_origin_opacity`
Default: `0.0`

マウスポインタで持ち上げた駒の移動元にある駒の非透明度

半透明にすると駒が分身したかのように見える効果がある

### `--sp_touch_lifted_origin_bg_color`
Default: `hsl(0 0% 0% / 0.15)`

タッチ操作で持ち上げた駒の移動元のセルの背景色

### `--sp_touch_lifted_origin_opacity`
Default: `1.0`

タッチ操作で持ち上げた駒の移動元のセルの非透明度

### `--sp_piece_origin_color`
Default: `hsl(0 0% 0% / 0.15)`

着手後の移動元の背景色

## 駒台

### `--sp_stand_piece_size`
Default: `0.8`

駒台のセル内における駒の占有率

### `--sp_stand_hover_border_color`
Default: `hsl(0 0% 0% / 0.2)`

駒を持ったマウスに反応した駒台や駒箱のボーダー色

### `--sp_stand_hover_border_stroke`
Default: `2`

駒を持ったマウスに反応した駒台や駒箱のボーダーの太さ

### `--sp_stand_bg_color`
Default: `hsl(0 0% 0% / 0)`

駒台の背景色

### `--sp_player_name_size`
Default: `0.25`

対局者名の大きさ

### `--sp_player_time_size`
Default: `0.25`

持ち時間表記の大きさ

## 駒箱
### `--sp_piece_box_piece_size`
Default: `0.8`

駒箱のセル内における駒の占有率

### `--sp_piece_box_color`
Default: `hsl(0 0% 0% / 0.2)`

駒箱の背景色

## 先後のマーク

### `--sp_location_mark_active_size`
Default: `1.0`

手番のときの☗☖の大きさ

### `--sp_location_mark_inactive_size`
Default: `0.5`

手番ではないときの☗☖の大きさ

## コントローラーとスライダー

### `--sp_controller_width`
Default: `0.5`

コントローラーの横幅 (タブレット以上)

### `--sp_controller_width_mobile`
Default: `0.8`

コントローラーの横幅 (スマホ時)

## 駒数

### `--sp_piece_count_horizontal_x`
Default: `0.43`

駒数のX座標 (横配置時)

### `--sp_piece_count_horizontal_y`
Default: `0.30`

駒数のY座標 (横配置時)

### `--sp_piece_count_vertical_x`
Default: `0.0`

駒数のX座標 (縦配置時)

### `--sp_piece_count_vertical_y`
Default: `0.47`

駒数のY座標 (横配置時)

### `--sp_piece_count_size`
Default: `0.2`

駒数の文字サイズ

* 駒のセルの縦幅に対する比率

### `--sp_piece_count_font_color`
Default: `hsl(0 0% 0% / 0.75)`

駒数の文字色

### `--sp_piece_count_bg_color`
Default: `hsl(0 0% 100% / 0.9)`

駒数の背景色

### `--sp_piece_count_padding`
Default: `0.08`

駒数の余白

## 成り不成り

### `--sp_promote_select_modal_bg_color`
Default: `hsl(0 0% 0% / 0.5)`

成り不成りオーバーレイの色

### `--sp_promote_select_modal_z_index`
Default: `30`

成り不成り選択オーバーレイの z-index

### `--sp_promote_select_modal_hover_color`
Default: `hsl(0 0% 100% / 0.5)`

成り不成り選択でマウスをホバーした側の駒の背景色

## 座標(符号)

### `--sp_coordinate_x_size`
Default: `0.125`

盤面の上に表示するX座標の文字サイズ

### `--sp_coordinate_x_push`
Default: `0.014`

盤面の上に表示するX座標の位置調整

### `--sp_coordinate_y_size`
Default: `0.168`

盤面の右に表示するY座標の文字サイズ

### `--sp_coordinate_y_push`
Default: `-0.009`

盤面の右に表示するY座標の位置調整

### `--sp_coordinate_color`
Default: `hsl(0 0% 0% / 0.75)`

座標の文字色

## 全体

### `--sp_ground_color`
Default: `transparent`

駒台を含めた盤の領域の背景色

### `--sp_ground_image`
Default: `none`

駒台を含めた盤の領域に敷く画像

## 内部で使用

* 参照可
* オーバーライド禁止

### `--sp_board_dimension_w`
Default: `9`

盤面の横のセル数

### `--sp_board_dimension_h`
Default: `9`

盤面の縦のセル数

### `--sp_board_w`
Default: `47px`

現在の盤の横幅で動的に変化する

### `--sp_board_h`
Default: `50px`

現在の盤の縦幅で動的に変化する

### `--sp_cell_w`
Default: `47px`

現在の盤面のセルの横幅で動的に変化する

### `--sp_cell_h`
Default: `50px`

現在の盤面のセルの縦幅で動的に変化する
