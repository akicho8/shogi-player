---
sidebar: auto
---

# コンポーネント引数

## 概要

* 2択はたまたま2択だっただけで真偽ではないため `boolean` 型はない
* パラメータ名は冗長だが `sp_` で始まる
* 値は `is_` で始まる
* 例えば二択で `sp_xxx` を有効にする場合は `is_xxx_on` を指定するルールにしている
* が、いろいろ例外もある

### 用語

* コントローラー
  * 画面下に配置する局面(手数)を変更する複数のボタン類のUIのこと
* スライダー
  * 画面下に配置する局面(手数)を左右ドラッグで変更するUIのこと

## 共通

## `sp_turn_slider_focus`

Type: `String`
Default: `"is_turn_slider_focus_on"`

mountedしたらスライダーにフォーカスする？

| 値 | 意味   |
|----|--------|
| is_turn_slider_focus_off   | しない   |
| is_turn_slider_focus_on   | する   |

## `sp_summary`

Type: `String`
Default: `"is_summary_off"`

手数や結果の表示(再生モード時) (is_summary_on is_summary_off)

| 値 | 意味   |
|----|--------|
| is_summary_off   | しない   |
| is_summary_on   | する   |

## `sp_slider`

Type: `String`
Default: `"is_slider_off"`

スライダー表示

| 値 | 意味   |
|----|--------|
| is_slider_off   | しない   |
| is_slider_on   | する   |

## `sp_setting`

Type: `String`
Default: `"is_setting_off"`

設定ボタンの表示

| 値 | 意味   |
|----|--------|
| is_setting_off   | しない   |
| is_setting_on   | する   |

## `sp_controller`

Type: `String`
Default: `"is_controller_off"`

コントローラー表示

| 値 | 意味   |
|----|--------|
| is_controller_off   | しない   |
| is_controller_on   | する   |

## `sp_viewpoint`

Type: `String`
Default: `"black"`

視点

| 値 | 意味   |
|----|--------|
| is_viewpoint_off   | しない   |
| is_viewpoint_on   | する   |

## `sp_op_disabled`

Type: `Boolean`
Default: `false`

全体の操作を無効化


## `sp_hidden_if_piece_stand_blank`

Type: `Boolean`
Default: `false`

駒がないときは駒台側を非表示


## `sp_flip_if_white`

Type: `Boolean`
Default: `false`

最初に表示した局面が△なら反転


## `sp_key_event_capture_enabled`

Type: `Boolean`
Default: `false`

スライダーにフォーカスしていなくても左右キーで手数を動かす


## `sp_shift_key_mag`

Type: `Number`
Default: `10`

キーで左右するとき shift を押したときの倍率

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_system_key_mag`

Type: `Number`
Default: `50`

キーで左右するとき command などを押したときの倍率

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_board_dimension_w`

Type: `Number`
Default: `9`

盤のセル数(W)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_board_dimension_h`

Type: `Number`
Default: `9`

盤のセル数(H)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_layout`

Type: `String`
Default: `"is_layout_vertical"`

レイアウト is_(vertical\|horizontal)

| 値 | 意味   |
|----|--------|
| is_layout_off   | しない   |
| is_layout_on   | する   |

## `sp_balloon`

Type: `String`
Default: `"is_balloon_on"`

対局者名の下に駒数スタイルと同じ背景色を置く

| 値 | 意味   |
|----|--------|
| is_balloon_off   | しない   |
| is_balloon_on   | する   |

## `sp_layer`

Type: `String`
Default: `"is_layer_off"`

レイヤー確認(デバッグ用)

| 値 | 意味   |
|----|--------|
| is_layer_off   | しない   |
| is_layer_on   | する   |

## `sp_pi_variant`

Type: `String`
Default: `"is_pi_variant_a"`

駒の種類

| 値 | 意味   |
|----|--------|
| is_pi_variant_off   | しない   |
| is_pi_variant_on   | する   |

## `sp_bg_variant`

Type: `String`
Default: `"is_bg_variant_none"`

盤の種類

| 値 | 意味   |
|----|--------|
| is_bg_variant_off   | しない   |
| is_bg_variant_on   | する   |

## `sp_mobile_vertical`

Type: `String`
Default: `"is_mobile_vertical_on"`

モバイル時に自動的に縦配置に切り替える

| 値 | 意味   |
|----|--------|
| is_mobile_vertical_off   | しない   |
| is_mobile_vertical_on   | する   |

## `sp_location_behavior`

Type: `String`
Default: `"is_location_flip_on"`

☗☖をタップしたとき視点を切り替える

| 値 | 意味   |
|----|--------|
| is_location_behavior_off   | しない   |
| is_location_behavior_on   | する   |

## `sp_debug_mode`

Type: `String`
Default: `"is_debug_mode_off"`

デバッグモード

| 値 | 意味   |
|----|--------|
| is_debug_mode_off   | しない   |
| is_debug_mode_on   | する   |

## `sp_sfen_show`

Type: `String`
Default: `"is_sfen_show_off"`

SFENを下に表示する

| 値 | 意味   |
|----|--------|
| is_sfen_show_off   | しない   |
| is_sfen_show_on   | する   |

## `sp_overlay_nav`

Type: `String`
Default: `"is_overlay_nav_off"`

view_mode のとき盤の左右で手数変更(falseなら駒を動かせる)

| 値 | 意味   |
|----|--------|
| is_overlay_nav_off   | しない   |
| is_overlay_nav_on   | する   |

## `sp_digit_label`

Type: `String`
Default: `"is_digit_label_off"`

座標の表示

| 値 | 意味   |
|----|--------|
| is_digit_label_off   | しない   |
| is_digit_label_on   | する   |

## `sp_digit_label_variant`

Type: `String`
Default: `"is_digit_label_variant_kanji"`

座標の表記

| 値 | 意味   |
|----|--------|
| is_digit_label_variant_off   | しない   |
| is_digit_label_variant_on   | する   |

## `sp_stand_gravity`

Type: `String`
Default: `"is_stand_gravity_bottom"`

駒台の位置

| 値 | 意味   |
|----|--------|
| is_stand_gravity_off   | しない   |
| is_stand_gravity_on   | する   |

## `sp_player_name_dir`

Type: `String`
Default: `"is_player_name_dir_horizontal"`

名前の縦横書き切り替え(縦は横配置時のみ有効)

| 値 | 意味   |
|----|--------|
| is_player_name_dir_off   | しない   |
| is_player_name_dir_on   | する   |

## `sp_turn`

Type: `Number`
Default: `-1`

局面(手数)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_run_mode`

Type: `String`
Default: `"view_mode"`

モード

| 値 | 意味   |
|----|--------|
| is_run_mode_off   | しない   |
| is_run_mode_on   | する   |

## `sp_body`

Type: `String`
Default: `null`

棋譜 KIF or SFEN

| 値 | 意味   |
|----|--------|
| is_body_off   | しない   |
| is_body_on   | する   |

## `sp_player_info`

Type: `Object`
Default: `null`

対局者名と時間

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_comment`

Type: `String`
Default: `"is_comment_on"`

KIFのコメントを表示する

| 値 | 意味   |
|----|--------|
| is_comment_off   | しない   |
| is_comment_on   | する   |

## `sp_player_click_handle`

Type: `Function`
Default: `null`

名前(時間を含む)をタップしたときに実行する

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_location_click_handle`

Type: `Function`
Default: `null`

☗☖をタップしたときに実行する

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_board_click_handle`

Type: `Function`
Default: `null`

盤をタップしたときに実行する(駒よりも優先)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_board_piece_back_user_style`

Type: `Function`
Default: `null`

セルのスタイルを決める処理

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_board_piece_back_user_class`

Type: `Function`
Default: `null`

セルのクラスを決める処理

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_board_cell_left_click_user_handle`

Type: `Function`
Default: `null`

セルタップ時の処理(クリック後に呼ぶ)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_board_cell_pointerdown_user_handle`

Type: `Function`
Default: `null`

セルタップ時の処理(クリックした瞬間に呼ぶ)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_human_side`

Type: `String`
Default: `"both"`

含まれる側だけ操作できるようにする

| 値 | 意味   |
|----|--------|
| is_human_side_off   | しない   |
| is_human_side_on   | する   |

## `sp_device`

Type: `String`
Default: `null`

デバイスを強制的に指定する (is_device_touch is_device_desktop) 自動判別するので基本そのままでよい

| 値 | 意味   |
|----|--------|
| is_device_off   | しない   |
| is_device_on   | する   |

## `sp_play_mode_foul_check_p`

Type: `Boolean`
Default: `true`

play_mode で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？


## `sp_play_mode_foul_break_p`

Type: `Boolean`
Default: `false`

判定で反則だったら emit して抜けるか？(true: 初心者向け)


## `sp_play_mode_legal_move_only`

Type: `Boolean`
Default: `true`

play_mode で合法手のみに絞る


## `sp_play_mode_auto_promote`

Type: `Boolean`
Default: `true`

play_mode で死に駒になるときは自動的に成る


## `sp_play_mode_only_own_piece_to_move`

Type: `Boolean`
Default: `true`

play_mode では自分手番とき自分の駒しか動かせないようにする


## `sp_play_mode_can_not_kill_same_team_soldier`

Type: `Boolean`
Default: `true`

play_mode では自分の駒で同じ仲間の駒を取れないようにする


## `sp_edit_mode_double_click_time_ms`

Type: `Number`
Default: `350`

edit_mode で駒を反転するときのダブルクリックと認識する時間(ms)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

## `sp_move_cancel`

Type: `String`
Default: `"is_move_cancel_standard"`

is_move_cancel_standard: (死に駒セルを除き)移動できないセルに移動したとき持った状態をキャンセルする。is_move_cancel_reality: (盤上の駒に限り)キャンセルは元の位置をタップ。is_move_cancel_rehold: (盤上の駒に限り)キャンセルと同時に盤上の駒を持つ

| 値 | 意味   |
|----|--------|
| is_move_cancel_off   | しない   |
| is_move_cancel_on   | する   |

## `sp_view_mode_soldier_movable`

Type: `Boolean`
Default: `true`

view_mode でも駒を動かせる(ただし本筋は破壊しない)
