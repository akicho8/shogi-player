---
sidebar: auto
---

# コンポーネント引数

## 概要

* `boolean` 型はない
  * いや、あるけど無くしたい
  * 2択はたまたま2択だっただけで真偽だとは限らない
* パラメータ名は `sp_` で始まる
  * 冗長だが検索は楽
* 値は `is_` で始まる
* 例えば `sp_xxx` を有効にする場合は `is_xxx_on` を指定するルールにしている
* いろいろ例外もある

## 共通

### `sp_turn_slider_focus`

Type: `String`
Default: `is_turn_slider_focus_on`

最初にスライダーにフォーカスするか？

  * スライダーがなければ何もしない
  * ビューモードで最初からスライダーにフォーカスしておければ、そのまま左右ボタンで局面が切り替えることができて便利になる
  * スマホだととくにメリットはない

| 値                       | 意味   |
|--------------------------|--------|
| is_turn_slider_focus_off | しない |
| is_turn_slider_focus_on  | する   |

### `sp_summary`

Type: `String`
Default: `is_summary_off`

再生モード時に手数の表示をするか？

  * 盤の上部に表示する
  * それをクリックすると入力フィールドに切り替わって局面(手数)を入力できる
  * しかしこれまでの経験からしてあまり使うことはなかった
  * スライダーを表示していれば現在の手数がわかるからというのもある
  * スマホの場合、無駄に一行分画面を使ってしまう

| 値             | 意味   |
|----------------|--------|
| is_summary_off | しない |
| is_summary_on  | する   |

### `sp_slider`

Type: `String`
Default: `is_slider_off`

スライダーを表示するか？

* 再生モード時には表示しておくと指定の局面に移動しやすい
* 操作モード時にも表示できるけどガチ対局するときは消しておいた方がよい
* 編集モード時には設定に関係なく表示しない

| 値            | 意味   |
|---------------|--------|
| is_slider_off | しない |
| is_slider_on  | する   |

### `sp_setting`

Type: `String`
Default: `is_setting_off`

設定ボタンを表示するか？ <Badge text="開発者用" type="error" vertical="top" />

  * 設定というよりデバッグ用のツールに近い
  * 有効にするとコントローラーを表示したとき設定ボタンも付け加える
  * いまが何のモードなのかわかったりする

| 値             | 意味   |
|----------------|--------|
| is_setting_off | しない |
| is_setting_on  | する   |

### `sp_controller`

Type: `String`
Default: `is_controller_off`

コントローラーを表示するか？

  * 局面を変更する4つのボタンが合わさったコンポーネントのこと
  * sp_slider と合わせて表示することが多い

| 値                | 意味   |
|-------------------|--------|
| is_controller_off | しない |
| is_controller_on  | する   |

### `sp_viewpoint`

Type: `String`
Default: `black`

視点を決める

後手または上手視点にするには `white` を指定する

| 値    | 視点 |
|-------|------|
| black | ▲   |
| white | △   |

### `sp_op_disabled`

Type: `Boolean`
Default: `false`

全体の操作を無効化するか？

画像のような状態であってほしいときに使う

### `sp_hidden_if_piece_stand_blank`

Type: `Boolean`
Default: `false`

持駒がないときは駒台を非表示にするか？

開戦していない局面を狭い領域にたくさん表示したいときだけ使う

### `sp_flip_if_white`

Type: `Boolean`
Default: `false`

最初に表示した局面が△視点なら反転するか？

### `sp_key_event_capture_enabled`

Type: `Boolean`
Default: `false`

スライダーにフォーカスしていなくても左右キーで手数を動かせるようにするか？ <Badge text="非推奨" type="error" vertical="top" />

### `sp_shift_key_mag`

Type: `Number`
Default: `10`

`sp_key_event_capture_enabled` を有効にして手数を動かすときの shift を押したときの倍率 <Badge text="非推奨" type="error" vertical="top" />

### `sp_system_key_mag`

Type: `Number`
Default: `50`

`sp_key_event_capture_enabled` を有効にして手数を動かすときの command を押したときの倍率 <Badge text="非推奨" type="error" vertical="top" />

### `sp_layout`

Type: `String`
Default: `is_layout_vertical`

駒台・名前・時間の表示場所を決める

| 値                   | 配置            |
|----------------------|-----------------|
| is_layout_vertical   | 縦 (スマホ向け) |
| is_layout_horizontal | 横              |

### `sp_balloon`

Type: `String`
Default: `is_balloon_on`

対局者名の下に駒数スタイルと同じ背景色を置くか？

| 値             | 意味   |
|----------------|--------|
| is_balloon_off | しない |
| is_balloon_on  | する   |

### `sp_layer`

Type: `String`
Default: `is_layer_off`

レイヤーを確認するか？ <Badge text="開発者用" type="error" vertical="top" />

| 値           | 意味   |
|--------------|--------|
| is_layer_off | しない |
| is_layer_on  | する   |

### `sp_pi_variant`

Type: `String`
Default: `is_pi_variant_a`

駒の種類

| 値                 | 種類          | 特徴                      |
|--------------------|---------------|---------------------------|
| is_pi_variant_none | なし          | 見えない                  |
| is_pi_variant_a    | ぬれよん(SVG) | 見やすいゴシック体の1文字 |
| is_pi_variant_b    | 紙面風(SVG)   | 白黒と一部赤              |
| is_pi_variant_c    | 図案駒(PNG)   | ユニバーサルデザイン      |
| is_pi_variant_d    | Portella(PNG) | リアル駒                    |

### `sp_bg_variant`

Type: `String`
Default: `is_bg_variant_none`

盤のテクスチャ

* 基本なしでよい
* そのとき盤面の色は `--sp_board_color` で変更できる
* 木を指定するときはリアル駒のときだけにしよう
  * デジタル駒と木の組み合わせは調和しない

| 値                 | 種類 | 特徴                               |
|--------------------|------|------------------------------------|
| is_bg_variant_none | なし | 見えない(が、単色の色はつけられる) |
| is_bg_variant_a    | 木1  | 濃い                               |
| is_bg_variant_b    | 木2  | 薄め                               |

### `sp_mobile_vertical`

Type: `String`
Default: `is_mobile_vertical_on`

画面幅が狭いとき自動的に縦配置に切り替えるか？

初期値を横配置にしているときに関係してくる
言い替えると画面幅が広いときに横配置に切り替えるかの設定でもある

| 値                     | 挙動         |
|------------------------|--------------|
| is_mobile_vertical_off | 切り替えない |
| is_mobile_vertical_on  | 切り替える   |

### `sp_location_behavior`

Type: `String`
Default: `is_location_flip_on`

☗☖をタップしたとき視点を切り替えるか？

| 値                       | 挙動         |
|--------------------------|--------------|
| is_location_behavior_off | 切り替えない |
| is_location_behavior_on  | 切り替える   |

### `sp_debug_mode`

Type: `String`
Default: `is_debug_mode_off`

デバッグモードを有効にするか？ <Badge text="開発者用" type="error" vertical="top" />

| 値                | 意味   |
|-------------------|--------|
| is_debug_mode_off | しない |
| is_debug_mode_on  | する   |

### `sp_sfen_show`

Type: `String`
Default: `is_sfen_show_off`

盤面の下にSFENを表示するか？ <Badge text="削除予定" type="error" vertical="top" />

| 値               | 意味   |
|------------------|--------|
| is_sfen_show_off | しない |
| is_sfen_show_on  | する   |

### `sp_overlay_nav`

Type: `String`
Default: `is_overlay_nav_off`

再生モードのときの局面切り替えで盤上の左右の領域をタップして動かせるようにするか？

有効にすると再生しやすくなるが駒を動かせなくなる

| 値                 | 意味   |
|--------------------|--------|
| is_overlay_nav_off | しない |
| is_overlay_nav_on  | する   |

### `sp_digit_label`

Type: `String`
Default: `is_digit_label_off`

盤の上と右に座標を表示するか？

| 値                 | 意味   |
|--------------------|--------|
| is_digit_label_off | しない |
| is_digit_label_on  | する   |

### `sp_digit_label_variant`

Type: `String`
Default: `is_digit_label_variant_kanji`

座標の表記を変更する

| 値                              | 表記   |
|---------------------------------|--------|
| is_digit_label_variant_kanji    | 一..九 |
| is_digit_label_variant_number   | 1..9   |
| is_digit_label_variant_alphabet | a..i   |

### `sp_stand_gravity`

Type: `String`
Default: `is_stand_gravity_bottom`

駒台を左右に配置したとき位置は上か下か？

下に寄せた方が対角線的に綺麗な配置に見える
一方、右上だけで詰将棋を作るなら上に寄せた方が持駒が見やすくなるなどの利点もある
両方を▲視点で上に寄せるのはいまのところ対応していない

| 値                      | 意味       |
|-------------------------|------------|
| is_stand_gravity_bottom | 下に寄せる |
| is_stand_gravity_top    | 上に寄せる |

### `sp_player_name_dir`

Type: `String`
Default: `is_player_name_dir_horizontal`

名前の縦横書き切り替え

左右配置時のみ有効になる
紙面風にしたいときかつ「先手」「後手」とだけ表記するなら縦書きにするのがてっとり早い
半角アルファベットを縦書きにすると横になってしまう
その場合は、横書きのまま1文字ずつ `<br>` を入れて縦にした方がいいかもしれない

| 値                            | 意味   |
|-------------------------------|--------|
| is_player_name_dir_horizontal | 横書き |
| is_player_name_dir_vertical   | 縦書き |

### `sp_turn`

Type: `Number`
Default: `-1`

開始局面(手数)を決める

負の値だと最終局面からの局面になる

| 値 | 局面       |
|----|------------|
|  0 | 0手目      |
|  1 | 1手目      |
| -2 | 最後-1手目 |
| -1 | 最後       |

### `sp_run_mode`

Type: `String`
Default: `view_mode`

モード

| 値        | 意味 | 何向け？         |
|-----------|------|----------------|
| view_mode | 再生 | 棋譜再生       |
| play_mode | 操作 | 対戦や棋譜作成 |
| edit_mode | 編集 | 主に詰将棋     |

### `sp_body`

Type: `String`
Default: `null`

棋譜を指定する

KIF, SFEN, BOD に対応する
不整合な棋譜の場合は親切なエラーを出すこともない
何が起きるかわからないので本当に正しい形式だけを渡してほしい

### `sp_player_info`

Type: `Object`
Default: `null`

対局者と時間の情報をハッシュ形式で渡す

例:

``` js
{
  black: {
    name: "六代大橋宗銀",
    time: "12:34"
  },
  white: {
    name: "伊藤印達",
    time: "56:78",
  },
}
```

### `sp_comment`

Type: `String`
Default: `is_comment_on`

盤の下にKIF形式棋譜のコメントを表示するか？

| 値             | 意味   |
|----------------|--------|
| is_comment_off | しない |
| is_comment_on  | する   |

### `sp_board_piece_back_user_style`

Type: `Function`
Default: `null`

セルのスタイルを決める処理

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

### `sp_board_piece_back_user_class`

Type: `Function`
Default: `null`

セルのクラスを決める処理

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

### `sp_board_cell_left_click_user_handle`

Type: `Function`
Default: `null`

セルタップ時の処理(クリック後に呼ぶ)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

### `sp_board_cell_pointerdown_user_handle`

Type: `Function`
Default: `null`

セルタップ時の処理(クリックした瞬間に呼ぶ)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

### `sp_human_side`

Type: `String`
Default: `both`

含まれる側だけ操作できるようにする

| 値 | 意味   |
|----|--------|
| is_human_side_off   | しない   |
| is_human_side_on   | する   |

### `sp_device`

Type: `String`
Default: `null`

デバイスを強制的に指定する (is_device_touch is_device_desktop) 自動判別するので基本そのままでよい

| 値 | 意味   |
|----|--------|
| is_device_off   | しない   |
| is_device_on   | する   |

### `sp_play_mode_foul_check_p`

Type: `Boolean`
Default: `true`

play_mode で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？

### `sp_play_mode_foul_break_p`

Type: `Boolean`
Default: `false`

判定で反則だったら emit して抜けるか？(true: 初心者向け)

### `sp_play_mode_legal_move_only`

Type: `Boolean`
Default: `true`

play_mode で合法手のみに絞る

### `sp_play_mode_auto_promote`

Type: `Boolean`
Default: `true`

play_mode で死に駒になるときは自動的に成る

### `sp_play_mode_only_own_piece_to_move`

Type: `Boolean`
Default: `true`

play_mode では自分手番とき自分の駒しか動かせないようにする

### `sp_play_mode_can_not_kill_same_team_soldier`

Type: `Boolean`
Default: `true`

play_mode では自分の駒で同じ仲間の駒を取れないようにする

### `sp_edit_mode_double_click_time_ms`

Type: `Number`
Default: `350`

edit_mode で駒を反転するときのダブルクリックと認識する時間(ms)

| 値 | 意味   |
|----|--------|
| FIXME  | FIXME   |

### `sp_move_cancel`

Type: `String`
Default: `is_move_cancel_standard`

is_move_cancel_standard: (死に駒セルを除き)移動できないセルに移動したとき持った状態をキャンセルする。is_move_cancel_reality: (盤上の駒に限り)キャンセルは元の位置をタップ。is_move_cancel_rehold: (盤上の駒に限り)キャンセルと同時に盤上の駒を持つ

| 値 | 意味   |
|----|--------|
| is_move_cancel_off   | しない   |
| is_move_cancel_on   | する   |

### `sp_view_mode_soldier_movable`

Type: `Boolean`
Default: `true`

view_mode でも駒を動かせる(ただし本筋は破壊しない)
