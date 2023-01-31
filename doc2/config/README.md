---
sidebar: auto
---

# コンポーネント引数

## 概要

* `boolean` 型はない
  * 例外もあるが無くしていく方向で考えている
* 冗長だが `sp_` で始まる
* 二択で `sp_xxx` を有効にする場合は `is_xxx_on` を指定するルールにしている
* 値は `is_` で始まる
  * が、例外もある

### 用語

* コントローラー
  * 画面下に配置する局面(手数)を変更する複数のボタン類のUIのこと
* スライダー
  * 画面下に配置する局面(手数)を左右ドラッグで変更するUIのこと

## 共通

### `sp_controller`

- Type: `string`
- Default: `is_controller_off`

盤の下にコントローラーを表示するか？

| 値                | 意味   |
|-------------------|--------|
| is_controller_off | しない |
| is_controller_on  | する   |

### `sp_viewpoint`

- Type: `string`
- Default: `black`

視点を決める。
後手または上手視点にするには `white` を指定する。

| 値 | 意味  |
|----|-------|
| ☗  | black |
| ☖  | white |

### `sp_op_disabled`

- Type: `boolean`
- Default: `false`

全体の操作を無効化するか？
画像のような状態であってほしいときに使う。

| 値    | 意味   |
|-------|--------|
| false | しない |
| true  | する   |

### `sp_hidden_if_piece_stand_blank`

- Type: `boolean`
- Default: `false`

持駒がないときは駒台側の領域を消すか？
一覧でより小さくたくさん表示したい場合に使う。

| 値    | 意味     |
|-------|----------|
| false | 消さない |
| true  | 消す     |

### `sp_flip_if_white`

- Type: `boolean`
- Default: `false`

最初に表示した局面が△側なら反転するか？

| 値    | 意味   |
|-------|--------|
| false | しない |
| true  | する   |

### `sp_key_event_capture_enabled`

- Type: `boolean`
- Default: `false`

スライダーにフォーカスしていなくても左右キーで手数を動かす

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_shift_key_mag`

- Type: `string`
- Default: `10`

キーで左右するとき shift を押したときの倍率

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_system_key_mag`

- Type: `string`
- Default: `50`

キーで左右するとき command などを押したときの倍率

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_board_dimension_w`

- Type: `string`
- Default: `9`

盤のセル数(W)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_board_dimension_h`

- Type: `string`
- Default: `9`

盤のセル数(H)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_layout`

- Type: `string`
- Default: `is_vertical`

レイアウト is_(vertical\|horizontal)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_balloon`

- Type: `string`
- Default: `is_balloon_on`

対局者名の下に駒数スタイルと同じ背景色を置く

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_layer`

- Type: `string`
- Default: `is_layer_off`

レイヤー確認(デバッグ用)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_pi_variant`

- Type: `string`
- Default: `is_pi_variant_a`

駒の種類

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_bg_variant`

- Type: `string`
- Default: `is_bg_variant_none`

盤の種類

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_mobile_vertical`

- Type: `string`
- Default: `is_mobile_vertical_on`

モバイル時に自動的に縦配置に切り替える

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_location_behavior`

- Type: `string`
- Default: `is_location_flip_on`

☗☖をタップしたとき視点を切り替える

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_debug_mode`

- Type: `string`
- Default: `is_debug_mode_off`

デバッグモード

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_sfen_show`

- Type: `string`
- Default: `is_sfen_show_off`

SFENを下に表示する

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_overlay_nav`

- Type: `string`
- Default: `is_overlay_nav_off`

view_mode のとき盤の左右で手数変更(falseなら駒を動かせる)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_digit_label`

- Type: `string`
- Default: `is_digit_label_off`

座標の表示

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_digit_label_variant`

- Type: `string`
- Default: `is_digit_label_variant_kanji`

座標の表記

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_stand_gravity`

- Type: `string`
- Default: `is_stand_gravity_bottom`

駒台の位置

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_player_name_dir`

- Type: `string`
- Default: `is_player_name_dir_horizontal`

名前の縦横書き切り替え(縦は横配置時のみ有効)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_turn`

- Type: `string`
- Default: `-1`

局面(手数)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_run_mode`

- Type: `string`
- Default: `view_mode`

モード

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_body`

- Type: `string`
- Default: `null`

棋譜 KIF or SFEN

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_player_info`

- Type: `string`
- Default: `null`

対局者名と時間

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_comment`

- Type: `string`
- Default: `is_comment_on`

KIFのコメントを表示する

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_player_click_handle`

- Type: `string`
- Default: `null`

名前(時間を含む)をタップしたときに実行する

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_location_click_handle`

- Type: `string`
- Default: `null`

☗☖をタップしたときに実行する

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_board_click_handle`

- Type: `string`
- Default: `null`

盤をタップしたときに実行する(駒よりも優先)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_board_piece_back_user_style`

- Type: `string`
- Default: `null`

セルのスタイルを決める処理

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_board_piece_back_user_class`

- Type: `string`
- Default: `null`

セルのクラスを決める処理

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_board_cell_left_click_user_handle`

- Type: `string`
- Default: `null`

セルタップ時の処理(クリック後に呼ぶ)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_board_cell_pointerdown_user_handle`

- Type: `string`
- Default: `null`

セルタップ時の処理(クリックした瞬間に呼ぶ)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_human_side`

- Type: `string`
- Default: `both`

含まれる側だけ操作できるようにする

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_device`

- Type: `string`
- Default: `null`

デバイスを強制的に指定する (is_device_touch is_device_desktop) 自動判別するので基本そのままでよい

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_play_mode_foul_check_p`

- Type: `string`
- Default: `true`

play_mode で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_play_mode_foul_break_p`

- Type: `boolean`
- Default: `false`

判定で反則だったら emit して抜けるか？(true: 初心者向け)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_play_mode_legal_move_only`

- Type: `string`
- Default: `true`

play_mode で合法手のみに絞る

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_play_mode_auto_promote`

- Type: `string`
- Default: `true`

play_mode で死に駒になるときは自動的に成る

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_play_mode_only_own_piece_to_move`

- Type: `string`
- Default: `true`

play_mode では自分手番とき自分の駒しか動かせないようにする

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_play_mode_can_not_kill_same_team_soldier`

- Type: `string`
- Default: `true`

play_mode では自分の駒で同じ仲間の駒を取れないようにする

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_edit_mode_double_click_time_ms`

- Type: `string`
- Default: `350`

edit_mode で駒を反転するときのダブルクリックと認識する時間(ms)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_move_cancel`

- Type: `string`
- Default: `is_move_cancel_standard`

is_move_cancel_standard: (死に駒セルを除き)移動できないセルに移動したとき持った状態をキャンセルする。is_move_cancel_reality: (盤上の駒に限り)キャンセルは元の位置をタップ。is_move_cancel_rehold: (盤上の駒に限り)キャンセルと同時に盤上の駒を持つ

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_view_mode_soldier_movable`

- Type: `string`
- Default: `true`

view_mode でも駒を動かせる(ただし本筋は破壊しない)

| 値 | 意味   |
|----|--------|
|    | しない   |
|    | する |

### `sp_summary`

- Type: `string`
- Default: `is_summary_off`

再生モード時に手数の表示をするか？
盤の上部に表示する。
それをクリックすると入力フィールドに切り替わって局面(手数)を入力できる。
しかしこれまでの経験からしてあまり使うことはなかった。
スライダーを表示していれば現在の手数がわかるからというのもある。
スマホの場合、無駄に一行分画面を使ってしまう。

| 値             | 意味   |
|----------------|--------|
| is_summary_off | しない |
| is_summary_on  | する   |

### `sp_slider`

- Type: `string`
- Default: `is_slider_off`

再生モード時に局面変更用スライダーを盤の下に表示するか？

| 値            | 意味   |
|---------------|--------|
| is_slider_off | しない |
| is_slider_on  | する   |

## ユーザービリティ

### `sp_turn_slider_focus`

- Type: `string`
- Default: `is_turn_slider_focus_on`

最初にスライダーにフォーカスするか？
スライダーがなければ何もしない。
ビューモードで最初からスライダーにフォーカスしておければ、そのまま左右ボタンで局面が切り替えることができて便利になる。
スマホだととくにメリットはない。

| 値                       | 意味   |
|--------------------------|--------|
| is_turn_slider_focus_on  | する   |
| is_turn_slider_focus_off | しない |

## 開発者向け

### `sp_setting`

- Type: `string`
- Default: `is_setting_off`

設定ボタンを表示するか？

| 値             | 意味   |
|----------------|--------|
| is_setting_off | しない |
| is_setting_on  | する   |
