---
sidebar: auto
---

# イベント

## はじめに

* Vue.js 2 でコンポーネントを使う場合の説明となっている
  * Web Components の場合はいろいろ制約がでてくる
* 冗長だがすべて `ev_` から始まる
* SFEN には2種類あって区別のための言い回しが冗長になるため単に長短で表わす
  * 短いSFEN: moves なし (BOD相当)
  * 長いSFEN: moves あり (KIF相当)
* moves は SFEN の moves 後の指し手の配列を表わす
* 手数はN手目の局面と言い表わすときの N の部分のこと
* 動詞の過去形は使わない
* `sp_event_log` にするとデバッグが楽

## 一覧

### `ev_turn_offset_change(turn: integer)`

手数が変更されたときに手数を投げる

APIで内部変数を参照するよりこちらを使った方が良い

### `ev_turn_offset_max_change(turn :integer)`

最大手数が変更されたとき最大手数を投げる

### `ev_short_sfen_change(sfen: string)`

状態が変わったとき短いSFENを投げる

コントローラーで手を戻しても変化する

### `ev_comment_change(comment_lines: array)`

コメントが変化したとき新しいコメントを投げる

* 文字列ではなく行毎の文字列配列になっている
* コメントがないときは空配列ではなく `null` が来る
* コメント形式
  * 段落毎に一行になっている正しい形式であれば `p` タグなどで囲って表示すればよい
  * 見た目で改行を入れてしまっているダメな形式であれば `(comment_lines || []).join("")` などとして詰めた方がいいかもしれない

### `ev_play_mode_move(hash: object)`

操作モードで着手後にいろんな情報を投げる

| メンバ         | 意味                                      |
|----------------|-------------------------------------------|
| sfen           | 着手後の長いSFEN                          |
| turn           | 着手後の手数                              |
| last_move_info | 着手した手の情報(Object)                  |
| snapshot_hash  | 現在の盤面のハッシュコード (千日手判定用) |

### `ev_play_mode_next_moves(moves: array)`

操作モードで着手したとき

* moves の配列を投げる
* `ev_play_mode_move` と統合する予定  <Badge text="TODO" type="error" vertical="top" />

### `ev_play_mode_moves_change(moves: array)`

操作モードで盤面が変化したとき <Badge text="非推奨" type="error" vertical="top" />

* moves を投げる
* 例えば `[a, b, c]` の指し手があってポインタが `c` のときコントローラーでポインタを `b` に戻すと `[a, b]` を持ってトリガーする

### `ev_edit_mode_short_sfen_change(sfen: string)`

編集モードで局面が変化したとき

* 短いSFENを投げる

### `ev_edit_mode_short_sfen2_change(sfen: string)`

編集モードで局面が変化したとき <Badge text="非推奨" type="error" vertical="top" />

* 短いSFENを投げる

### `ev_action_viewpoint_flip`

ユーザーが☗☖をクリックして視点を変更したとき

### `ev_action_turn_change(turn: number)`

ユーザーがコントローラーやスライダーを動かして手数を変更したとき

### `ev_action_piece_lift`

ユーザーが駒を持ち上げたとき

### `ev_action_piece_cancel`

ユーザーが持ち上げた駒を元に戻したとき

### `ev_action_board_cell_pointerdown(place: Place)`

セルを触ったとき

* その位置を投げる
* 通常のクリックイベントでは離したときに発生する

### `ev_action_player_info_click(location: Location, player_info: Object)`

プレイヤー名をクリックしたとき

* 位置とプレイヤー情報を投げる

### `ev_illegal_click_but_self_is_not_turn`

手番が違うのに操作しようとしたとき

### `ev_illegal_my_turn_but_oside_click`

自分が手番だけど相手の駒を持ち上げようとしたとき

### `ev_illegal_illegal_accident(hash: Object)`

反則が発生したとき

* 反則の情報を投げる
* `sp_illegal_validate && sp_illegal_cancel` のときのみ発生する

### `xxx.native`

任意のネイティブイベント

* `click` の場合はだいたい `sp_operation_disabled` と組み合わせる

## コンポーネント内部からの更新通知

* すべて [.sync 修飾子](https://jp.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A3%BE%E5%AD%90) 用
* 以下は内部で変更があると `update:xxx` のイベントを発行する
  * `sp_turn`
  * `sp_viewpoint`
* `sp_viewpoint` は☗☖のクリックで切り替わる
* `sp_turn` に `-1` が指定されたとき必ず呼ばれてしまうため使いづらい
* その他は内部の設定モーダルから更新される場合がある
