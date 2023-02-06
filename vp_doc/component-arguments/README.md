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

## よく使う

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

棋譜

  * SFEN, KIF, BOD に対応する
  * URL ではなく棋譜の内容を渡す
  * 不整合な形式の棋譜を渡してもエラーを出したりはしない
  * 何が起きるかわからないので本当に正しい形式だけを渡してほしい

### `sp_turn`

Type: `Number`
Default: `-1`

開始局面

負の値だと最終局面からの局面になる

| 値 | 局面         |
|----|--------------|
|  0 | 0手目        |
|  n | n手目        |
| -n | 最後-n+1手目 |
| -2 | 最後-1手目   |
| -1 | 最後         |

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

### `sp_layout`

Type: `String`
Default: `is_layout_vertical`

駒台・名前・時間の表示場所を決める

| 値                   | 配置 |            |
|----------------------|------|------------|
| is_layout_vertical   | 縦   | スマホ向け |
| is_layout_horizontal | 横   |            |

### `sp_viewpoint`

Type: `String`
Default: `black`

視点

後手または上手視点にするには `white` を指定する

| 値    | 視点 |
|-------|------|
| black | ▲   |
| white | △   |

### `sp_piece_variant`

Type: `String`
Default: `is_piece_variant_a`

駒の種類

| 値                 | 種類          | 特徴                      |
|--------------------|---------------|---------------------------|
| is_piece_variant_none | なし          | 見えない                  |
| is_piece_variant_a    | ぬれよん(SVG) | 見やすいゴシック体の1文字 |
| is_piece_variant_b    | 紙面風(SVG)   | 白黒と一部赤              |
| is_piece_variant_c    | 図案駒(PNG)   | ユニバーサルデザイン      |
| is_piece_variant_d    | Portella(PNG) | リアル駒                    |

### `sp_bg_variant`

Type: `String`
Default: `is_bg_variant_none`

盤のテクスチャ

* 基本なしでよい
* そのとき盤面の色は `--sp_board_color` で変更できる
* 木を指定するときはリアル駒のときだけにしよう
  * デジタル駒と木の組み合わせは調和しない

| 値                 | 種類 | 特徴 |
|--------------------|------|------|
| is_bg_variant_none | なし |      |
| is_bg_variant_a    | 木1  | 濃い |
| is_bg_variant_b    | 木2  | 薄め |

## あまり使わない

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

| 値                      | 寄せる方向 |
|-------------------------|------------|
| is_stand_gravity_bottom | 下         |
| is_stand_gravity_top    | 上         |

### `sp_player_name_direction`

Type: `String`
Default: `is_player_name_direction_horizontal`

名前の縦横書き切り替え

左右配置時のみ有効になる
紙面風にしたいときかつ「先手」「後手」とだけ表記するなら縦書きにするのがてっとり早い
半角アルファベットを縦書きにすると横になってしまう
その場合は、横書きのまま1文字ずつ `<br>` を入れて縦にした方がいいかもしれない

| 値                            | 意味   |
|-------------------------------|--------|
| is_player_name_direction_horizontal | 横書き |
| is_player_name_direction_vertical   | 縦書き |

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

### `sp_turn_show`

Type: `String`
Default: `is_turn_show_off`

再生モード時に手数の表示をするか？

  * 盤の上部に表示する
  * それをクリックすると入力フィールドに切り替わって局面(手数)を入力できる
  * しかしこれまでの経験からしてあまり使うことはなかった
  * スライダーを表示していれば現在の手数がわかるからというのもある
  * スマホの場合、無駄に一行分画面を使ってしまう

| 値             | 意味   |
|----------------|--------|
| is_turn_show_off | しない |
| is_turn_show_on  | する   |

### `sp_flip_if_white`

Type: `Boolean`
Default: `false`

最初に表示した局面が△視点なら反転するか？

### `sp_comment`

Type: `String`
Default: `is_comment_on`

盤の下にKIF形式棋譜のコメントを表示するか？

| 値             | 意味   |
|----------------|--------|
| is_comment_off | しない |
| is_comment_on  | する   |

### `sp_human_side`

Type: `String`
Default: `both`

再生モードで操作できる側を絞る

| 値    | 操作できる側 |
|-------|--------------|
| none  | なし         |
| both  | ☗☖           |
| black | ☗            |
| white | ☖            |

### `sp_balloon`

Type: `String`
Default: `is_balloon_on`

対局者名の下に駒数スタイルと同じ背景色を置くか？

| 値             | 意味   |
|----------------|--------|
| is_balloon_off | しない |
| is_balloon_on  | する   |

## ほぼ使わない

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

### `sp_move_cancel`

Type: `String`
Default: `is_move_cancel_standard`

盤上の持ち上げた駒のキャンセル方法

* 持駒にも同じ挙動を適用するべきだができていない
* PCであれば共通して右クリックやESCキーでもキャンセルできる
* もともとリアル志向を初期値としていたが将棋ウォーズに慣れきってしまった者たちにはハードルが高かったため初期値を変更した。が、やっぱり戻すかもしれない

| 値                      | 挙動                                       | タイプ                 |
|-------------------------|--------------------------------------------|------------------------|
| is_move_cancel_reality  | リアル志向<br>元の位置に戻す              | 最初の共有将棋盤       |
| is_move_cancel_standard | 初心者向け<br>移動できないセルに移動したとき  | 将棋ウォーズ<br>ぴよ将棋  |
| is_move_cancel_rehold   | 合理的<br>キャンセルと同時に駒を持つ      | lishogi                |

::: tip
lishogi の方法は常に駒を持った状態になってしまって駒を離せないので使いにくい仕様だと見ていたが、よく考えてみればこれから何かの手を指そうとしているときに、駒を持ち替えることはあっても、駒を離した状態に戻らないといけなくなることはないので、実はとても合理的な仕様だった。
:::

### `sp_view_mode_soldier_movable`

Type: `Boolean`
Default: `true`

再生モードでも駒を動かせるようにするか？

  * 継盤のような動作をする
  * 本筋は破壊しない
  * コントローラーやスライダーで手数を動かすと本筋の**前後**に戻る
    * 駒を動かす直前の局面に戻るべき？ <Badge text="要検討" type="error" vertical="top" />

Type: `Function`
Default: `null`

セルのクラスを決める処理を指定する

引数には Place のインスタンスが来る
Web Components 版で動くのかは怪しい

### `sp_board_cell_left_click_disabled`

Type: `Boolean`
Default: `false`

盤上のセルをクリックしたときの通常処理を無効化するか？ <Badge text="要検討" type="error" vertical="top" />
この機能は sp_view_mode_soldier_movable を false するのでいい気がしている
### `sp_location_behavior`

Type: `String`
Default: `is_location_flip_on`

☗☖をタップしたとき視点を切り替えるか？

| 値                       | 挙動         |
|--------------------------|--------------|
| is_location_behavior_off | 切り替えない |
| is_location_behavior_on  | 切り替える   |

### `sp_sfen_show`

Type: `String`
Default: `is_sfen_show_off`

盤面の下にSFENを表示するか？ <Badge text="削除予定" type="error" vertical="top" />

| 値               | 意味   |
|------------------|--------|
| is_sfen_show_off | しない |
| is_sfen_show_on  | する   |

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

### `sp_operation_disabled`

Type: `Boolean`
Default: `false`

全体の操作を無効化するか？

画像のような状態であってほしいときに使う

### `sp_hidden_if_piece_stand_blank`

Type: `Boolean`
Default: `false`

持駒がないときは駒台を非表示にするか？

開戦していない局面を狭い領域にたくさん表示したいときだけ使う
### `sp_board_piece_back_user_class_fn`
### `sp_play_mode_foul_check_p`

Type: `Boolean`
Default: `true`

操作モードで反則の判定をするか？

* 反則の種類
  * 二歩
  * 王手放置
  * 駒ワープ
  * 死に駒

### `sp_play_mode_foul_break_p`

Type: `Boolean`
Default: `false`

反則判定にひっかかったあと反則を無なかったことにするか？

* 無かったことにしてもイベントで反則を知ることはできる
* 有効にすると基本的な反則の操作はできなくなる
* 将棋ウォーズのような仕様にするなら true にする

### `sp_play_mode_legal_move_only`

Type: `Boolean`
Default: `true`

操作モードで合法手のみに絞るか？

* false にすると？
  * 禁じ手や手番の制約がなくなる
  * ということは自分の手番で相手の駒を操作できる
  * それを利用して後手のときも先手の駒を動かせばずっと先手側を操作できるので先手だけの囲いの手順の棋譜(SFENに限る)を作ったりするのが簡単になる
    * SFENに限る理由は駒の種類を見ていないため

### `sp_play_mode_auto_promote`

Type: `Boolean`
Default: `true`

操作モードで死に駒になるときは自動的に成るか？

* 例えば「桂」を「11」に移動したとき自動的に成る
* 完全なリアル対局をイメージしたいときは `false` にする

### `sp_play_mode_only_own_piece_to_move`

Type: `Boolean`
Default: `true`

操作モードでは自分の駒しか動かせないようにするか？ <Badge text="要検討" type="error" vertical="top" />

* `sp_human_side` と機能が重複しているような気がする

### `sp_play_mode_can_not_kill_same_team_soldier`

Type: `Boolean`
Default: `true`

操作モードでは自分の駒で味方の駒を取れないようにするか？

### `sp_edit_mode_double_click_time_ms`

Type: `Number`
Default: `350`

編集モードで駒を反転するときのダブルクリックと認識する時間(ms)

ネイティブなダブルクリック判定を入れると通常のクリック判定が遅れるため自力判定している
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

## デバッグ用

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

### `sp_device`

Type: `String`
Default: `null`

デバイスを強制的に指定する <Badge text="開発者用" type="error" vertical="top" />

  * 自動判別するので基本そのままでよい
  * デバイス判別によって駒を動かすときの挙動が変わる

| 値                | 意味             | 挙動                                           |
|-------------------|------------------|------------------------------------------------|
| is_device_touch   | タッチパネル操作 | 移動元の色で駒を持ち上げたのがわかるようにする |
| is_device_desktop | マウス操作       | 持ち上げた駒がマウスに追随する                 |

### `sp_layer`

Type: `String`
Default: `is_layer_off`

レイヤーを確認するか？ <Badge text="開発者用" type="error" vertical="top" />

| 値           | 意味   |
|--------------|--------|
| is_layer_off | しない |
| is_layer_on  | する   |

### `sp_debug_mode`

Type: `String`
Default: `is_debug_mode_off`

デバッグモードを有効にするか？ <Badge text="開発者用" type="error" vertical="top" />

| 値                | 意味   |
|-------------------|--------|
| is_debug_mode_off | しない |
| is_debug_mode_on  | する   |
