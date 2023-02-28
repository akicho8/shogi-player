---
sidebar: auto
---

# コンポーネント引数

## 概要

* パラメータ名はすべて `sp_` で始まる
* Function 型は `_fn` で終わる

## Level 1

### `sp_mode`

Type: `String`
Default: `view`

モード

| 値   | 意味 | 用途                   |
|------|------|------------------------|
| view | 再生 | 棋譜再生               |
| play | 操作 | 対戦や棋譜作成         |
| edit | 編集 | 詰将棋や課題局面の作成 |

### `sp_body`

Type: `String`
Default: `null`

棋譜

  * SFEN, KIF, BOD に対応する
  * 棋譜の内容を渡す (URLではない)
  * 不整合な形式の棋譜を渡してもエラーを出したりはしない
  * 何が起きるかわからないので本当に正しい形式だけを渡してほしい

### `sp_turn`

Type: `Number`
Default: `-1`

開始局面

負の値は最終局面から数えた局面になる

### `sp_viewpoint`

Type: `String`
Default: `black`

視点

後手または上手視点にするには `white` を指定する

| 値    | 視点 |
|-------|------|
| black | ☗   |
| white | ☖   |

### `sp_controller`

Type: `Boolean`
Default: `false`

コントローラーを表示するか？

  * 局面を変更するボタンが合わさったコンポーネントのこと
  * `sp_slider` と合わせて表示することが多い

### `sp_slider`

Type: `Boolean`
Default: `false`

スライダーを表示するか？

* 再生モード時には表示しておくと指定の局面に移動しやすい
* 操作モード時にも表示できるけどガチ対局するときは消しておいた方がよい
* 編集モード時には設定に関係なく表示しない

### `sp_piece_variant`

Type: `String`
Default: `a`

駒の種類

| 値   | 種類     | 特徴                      | Format |                                                                   |
|------|----------|---------------------------|--------|-------------------------------------------------------------------|
| none | なし     | 見えない                  |        |                                                                   |
| a    | ぬれよん | 見やすいゴシック体の1文字 | SVG    | <img src="../../../../assets/piece_variant/a/BR0.svg" width="32"> |
| b    | 紙面風   | 白黒と一部赤              | SVG    | <img src="../../../../assets/piece_variant/b/BR0.svg" width="32"> |
| c    | 図案駒   | ユニバーサルデザイン      | PNG    | <img src="../../../../assets/piece_variant/c/BR0.png" width="32"> |
| d    | Portella | 美麗                      | PNG    | <img src="../../../../assets/piece_variant/d/BR0.png" width="32"> |

### `sp_bg_variant`

Type: `String`
Default: `none`

盤のテクスチャ

* 基本なしでよい
* そのとき盤面の色は `--sp_board_color` で変更できる
* 木を指定するときはリアル駒のときだけにしよう
  * デジタル駒と木の組み合わせは調和しない

| 値   | 種類 | 特徴 |                                                                  |
|------|------|------|------------------------------------------------------------------|
| none | なし |      |                                                                  |
| a    | 木1  | 濃い | <img src="../../../../assets/bg_variant/board_a.png" width="32"> |
| b    | 木2  | 薄め | <img src="../../../../assets/bg_variant/board_b.png" width="32"> |

## Level 2

### `sp_layout`

Type: `String`
Default: `vertical`

駒台・名前・時間の表示場所を決める

| 値        | 配置 |            |
|-----------|------|------------|
| vertical  | 縦長 | スマホ向け |
| horizontal | 横長 |            |

### `sp_preset`

Type: `String`
Default: `null`

手合割(初期配置)の指定 <Badge text="要検討" type="error" vertical="top" />

  * `sp_mode="edit"` と合わせて `sp_preset="詰将棋"` とすれば相手玉だけがある状態で始まる
  * `sp_body` があるので要らないような気がしている

### `sp_overlay_nav`

Type: `Boolean`
Default: `false`

再生モードのときの盤上の左右をクリックして動かせるようにするか？

* 有効にすると再生しやすくなるが駒を動かせなくなる
* 天王山をクリックすると反転する

### `sp_mobile_vertical`

Type: `Boolean`
Default: `true`

画面幅が狭いとき自動的に縦配置に切り替えるか？

初期値を横配置にしているときに関係してくる
言い替えると画面幅が広いときに横配置に切り替えるかの設定でもある

### `sp_coordinate`

Type: `Boolean`
Default: `false`

座標を表示するか？

### `sp_coordinate_variant`

Type: `String`
Default: `kanji`

座標の表記

| 値       | 表記   |
|----------|--------|
| kanji    | 一..九 |
| number   | 1..9   |
| alphabet | a..i   |

### `sp_stand_gravity`

Type: `String`
Default: `bottom`

駒台を左右に配置したとき位置は上か下か？

下に寄せた方が対角線的に綺麗な配置に見える
一方、右上だけで詰将棋を作るなら上に寄せた方が持駒が見やすくなるなどの利点もある
両方を☗視点で上に寄せるのはいまのところ対応していない

| 値                      | 寄せる方向 |
|-------------------------|------------|
| bottom | 下         |
| top    | 上         |

### `sp_name_direction`

Type: `String`
Default: `horizontal`

名前の縦横書き切り替え

左右配置時のみ有効になる
紙面風にしたいときかつ「先手」「後手」とだけ表記するなら縦書きにするのがてっとり早い

| 値         | 意味   |
|------------|--------|
| horizontal | 横書き |
| vertical   | 縦書き |

::: warning
半角アルファベットを縦書きにすると横になってしまう。その場合は、横書きのまま1文字ずつ `<br>` を入れて縦にした方がいいかもしれない
:::

### `sp_player_info`

Type: `Hash`
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

Type: `Boolean`
Default: `false`

再生モード時に手数の表示をするか？

  * 盤の上部に表示する
  * それをクリックすると入力フィールドに切り替わって局面(手数)を入力できる
  * しかしこれまでの経験からしてあまり使うことはなかった
  * スライダーを表示していれば現在の手数がわかるからというのもある
  * スマホの場合、無駄に一行分画面を使ってしまう

### `sp_active_side_viewpoint`

Type: `Boolean`
Default: `false`

起動時に手番側の視点にするか？

言い替えると「指定の局面の手番が☖なら反転するか？」という意味になる

### `sp_comment`

Type: `Boolean`
Default: `true`

盤の下にKIF形式棋譜のコメントを表示するか？

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

Type: `Boolean`
Default: `true`

対局者名の下に駒数スタイルと同じ背景色を置くか？

## Level 3

### `sp_lift_cancel_action`

Type: `String`
Default: `standard`

盤上の持ち上げた駒のキャンセル方法

* 共通してマウスの右クリックやキーボードのESCキーでもキャンセルできる
* もともとリアル志向を初期値としていたが将棋ウォーズに慣れきってしまった者たちにはハードルが高かったため初期値を変更した。が、やっぱり戻すかもしれない
* 持駒にも同じ挙動を適用するべきだができていない

| 値           | 挙動                                         | タイプ                   |
|--------------|----------------------------------------------|--------------------------|
| reality  | リアル志向<br>元の位置に戻す                 | 最初の共有将棋盤         |
| standard | 初心者向け<br>移動できないセルに移動したとき | 将棋ウォーズ<br>ぴよ将棋 |
| rehold   | 合理的<br>キャンセルと同時に駒を持つ         | lishogi                  |

::: tip
lishogi の方法は常に駒を持った状態になってしまって駒を離せないので使いにくい仕様だと見ていたが、よく考えてみればこれから何かの手を指そうとしているときに、駒を持ち替えることはあっても、駒を離した状態に戻らないといけなくなることはないので、実はとても合理的な仕様だった。
:::

### `sp_view_mode_piece_movable`

Type: `Boolean`
Default: `true`

再生モードでも駒を動かせるようにするか？

  * 継盤のような動作をする
  * 本筋は破壊しない
  * コントローラーやスライダーで手数を動かすと本筋の**前後**に戻る
    * 駒を動かす直前の局面に戻るべき？ <Badge text="要検討" type="error" vertical="top" />

### `sp_board_cell_left_click_disabled`

Type: `Boolean`
Default: `false`

盤上のセルをクリックしたときの通常処理を無効化するか？ <Badge text="要検討" type="error" vertical="top" />
この機能は sp_view_mode_piece_movable を false するのでいい気がしている
### `sp_location_click_behavior`

Type: `String`
Default: `flip`

☗☖をクリックしたときの挙動

| 値   | 挙動           |
|------|----------------|
| flip | 視点を反転する |
| nop  | 何もしない     |

### `sp_sfen_show`

Type: `Boolean`
Default: `false`

盤面の下にSFENを表示するか？ <Badge text="削除予定" type="error" vertical="top" />

### `sp_mounted_focus_to_slider`

Type: `Boolean`
Default: `false`

起動時にスライダーがあればフォーカスするか？

  * スライダーがなければ何もしない
  * 再生モードで最初からスライダーにフォーカスしておけばそのまま左右ボタンで局面が切り替えることができて利用者に優しいUIになる
  * スマホだととくにメリットはない

::: warning
フォーカスする際にブラウザがスクロールしてしまう場合がある
:::

### `sp_operation_disabled`

Type: `Boolean`
Default: `false`

全体の操作を無効化するか？

画像のような状態であってほしいときに使う

### `sp_piece_stand_blank_then_hidden`

Type: `Boolean`
Default: `false`

持駒がないときは駒台を非表示にするか？

開戦していない局面を狭い領域にたくさん表示したいときだけ使う

### `sp_board_cell_class_fn`

Type: `Function`
Default: `null`

盤面のセルのクラスを決める

座標を引数にして呼び出すので例えば次のようにすると55の地点に「天王山」のクラスを付与する

```html
:sp_board_cell_class_fn="p => p.human_x === 5 && p.human_y === 5 && '天王山'"
```

Web Components 版では内部で eval しているため動作する

### `sp_illegal_validate`

Type: `Boolean`
Default: `true`

操作モードで反則の判定をするか？

* 反則の種類
  * 二歩
  * 王手放置
  * 駒ワープ
  * 死に駒

### `sp_illegal_cancel`

Type: `Boolean`
Default: `false`

反則判定にひっかかったあと反則を無なかったことにするか？

* 無かったことにしてもイベントで反則を知ることはできる
* 有効にすると基本的な反則の操作はできなくなる
* 有効にすると将棋ウォーズのようになる

### `sp_legal_move_only`

Type: `Boolean`
Default: `true`

操作モードで合法手のみに絞るか？

* false にすると？
  * 禁じ手や手番の制約がなくなる
  * ということは自分の手番で相手の駒を操作できる
  * それを利用して後手のときも先手の駒を動かせばずっと先手側を操作できるので先手だけの囲いの手順の棋譜(SFENに限る)を作ったりするのが簡単になる
    * SFENに限る理由は駒の種類を見ていないため

### `sp_piece_auto_promote`

Type: `Boolean`
Default: `true`

操作モードで死に駒になるときは自動的に成るか？

* 有効にすると「桂」を「11」に飛んだとき自動的に成る
* 完全なリアル対局をイメージしたいときは `false` にする

### `sp_my_piece_only_move`

Type: `Boolean`
Default: `true`

操作モードで動かせるのは自分の駒だけとするか？ <Badge text="要検討" type="error" vertical="top" />

* `sp_human_side` と機能が重複しているような気がする

### `sp_my_piece_kill_disabled`

Type: `Boolean`
Default: `true`

操作モードでは味方の駒を取れないようにするか？

### `sp_double_click_threshold_ms`

Type: `Number`
Default: `350`

編集モードで駒を反転するときのダブルクリックと認識する時間(ms)

ネイティブなダブルクリック判定を入れると通常のクリック判定が遅れるため自力判定している

### `sp_key_event_capture`

Type: `Boolean`
Default: `false`

スライダーにフォーカスしていなくても左右キーで手数を動かせるようにするか？ <Badge text="非推奨" type="error" vertical="top" />

::: warning
副作用あり。他のプログラムの操作を奪ってしまうかもしれないため基本は false にしておいた方がよい
:::

### `sp_shift_key_mag`

Type: `Number`
Default: `10`

`sp_key_event_capture` を有効にして手数を動かすときの shift を押したときの倍率 <Badge text="非推奨" type="error" vertical="top" />

### `sp_system_key_mag`

Type: `Number`
Default: `50`

`sp_key_event_capture` を有効にして手数を動かすときの command を押したときの倍率 <Badge text="非推奨" type="error" vertical="top" />

## Level 4

### `sp_pass_style`

Type: `String`
Default: `null`

style 属性に似ていて Web Components で `shogi-player-wc::part(root) {}` を使わず直接タグにCSS変数を渡したときに使う

* Web Components では style を指定してもそれは外側に適用されるだけで内側(Shadow Dom)には届かないため引数を設けている
* ネイテイブなハッシュではなく**JSON5形式文字列**で指定する

## Development

### `sp_dev_tools`

Type: `Boolean`
Default: `false`

開発ツールを起動するか？

### `sp_dev_tools_position`

Type: `String`
Default: `bottom`

開発ツールの画面位置

### `sp_dev_tools_group`

Type: `String`
Default: `main`

開発ツールのタブ

### `sp_device`

Type: `String`
Default: `null`

デバイスを強制的に指定する

  * 自動判別するので基本そのままでよい
  * デバイス判別によって駒を動かすときの挙動が変わる

| 値      | 意味             | 挙動                                           |
|---------|------------------|------------------------------------------------|
| touch   | タッチパネル操作 | 持ち上げた駒がマウスポインタについてこないかわりに移動元の色で駒を持ち上げたのがわかるようにする |
| desktop | マウス操作       | 持ち上げた駒がマウスポインタについてくる       |

### `sp_layer`

Type: `Boolean`
Default: `false`

レイヤーを確認するか？

### `sp_debug`

Type: `Boolean`
Default: `false`

デバッグモードを有効にするか？

### `sp_event_log`

Type: `Boolean`
Default: `false`

イベント情報を JavaScript コンソールに出力するか？

## Slot

### `sfen_part`

引数: `sfen`, `xcontainer`

`sp_sfen_show` のときに表示する sfen の部分 <Badge text="非推奨" type="error" vertical="top" />
