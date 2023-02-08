---
sidebar: auto
---

# API Functions

## まえがき ##

  * フロー駆動型に適した公開メソッド集
  * 冗長だが `api_` から始めることにしている
  * Vue.js の場合 ShogiPlayer コンポーネントをレシーバーとして実行できる
  * Web Components の場合どうやって呼ぶのかまたは呼べるのかわからない
  * メソッド名がいまいち
  * すべて非推奨

## 一覧 ##

### `api_random_puton()`

盤面をクリアし、ランダムに駒を1つ配置し、Soldier インスタンスを返す

### `api_place_on(soldier)`

Soldier インスタンスを盤面に置く

### `api_board_clear()`

盤面をクリアする

### `api_board_turn_set(turn)`

指定手数の局面に移動する

### `api_play_mode_seek_to(turn)`

再生モード専用で、指定手数の局面に移動する

### `api_flip_set(flag)`

盤の反転の有無を設定する

### `api_flip_toggle()`

トグル式で盤を反転する

### `api_retract_a_move()`

待ったする (現在の局面から2手戻す)

### `api_sfen_or_kif_set(sfen_or_kif)`

棋譜を指定する

### `api_turn_slider_focus()`

スライダーがあればフォーカスする
