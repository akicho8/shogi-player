---
sidebar: auto
---

# API

## まえがき ##

  * フロー駆動型に適した公開メソッド集
  * 冗長だが `api_` から始めることにしている
  * Vue.js の場合 ShogiPlayer コンポーネントをレシーバーとして実行できる
  * Web Components の場合はたどり付くのが大変 → [APIの呼び方](/web-components/#api%E3%81%AE%E5%91%BC%E3%81%B2%E3%82%99%E6%96%B9)
  * なるべく非推奨

## 一覧 ##

### `api_random_puton()`

盤面をクリアし、ランダムに駒を1つ配置し、Soldier インスタンスを返す

### `api_place_on(soldier: Soldier)`

Soldier インスタンスを盤面に置く

### `api_board_clear()`

盤面をクリアする

### `api_board_turn_set(turn: number)`

指定手数の局面に移動する

### `api_play_mode_seek_to(turn: number)`

再生モード専用で、指定手数の局面に移動する

### `api_viewpoint_set(location_key: string)`

視点を指定する

### `api_viewpoint_flip()`

視点を反転する

### `api_retract_a_move()`

待ったする (現在の局面から2手戻す)

### `api_sfen_or_kif_set(sfen_or_kif: string)`

棋譜を指定する

### `api_turn_slider_focus()`

スライダーがあればフォーカスする
