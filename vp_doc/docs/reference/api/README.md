---
sidebar: auto
---

# API

## 概要 ##

  * フロー駆動型に適した公開メソッド集
  * 冗長だが `api_` から始めることにしている
  * Vue.js の場合 ShogiPlayer コンポーネントをレシーバーとして実行できる
  * Web Components の場合はたどり付くのが大変 → [APIの呼び方](/guide/usage#apiの呼び方)
  * なるべく非推奨

## 一覧 ##

### `api_board_shuffle()`

盤上の駒をシャッフルしてランダムに配置し直す

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

### `api_moves_take_turn_offset()`

操作モードでの `moves.take(turn_offset)` 相当を返す

## 内部変数 (読み取り専用)

| 名前      | 意味                                                                             |
|-----------|----------------------------------------------------------------------------------|
| `turn_offset`     | 現在の局面の手数で sp_turn に -1 を指定したときは最後の局面の手数になっている |
| `turn_offset_min` | 局面手数スライダーの最小値。常に0 |
| `turn_offset_max` | 局面手数スライダーの最大値。指し手が 2 つあれば 2 |
| `turn_base`       | 普通は 0 だけど sfen で 'b - 10' の指定があったときは 9 になっている。この変数は外から見る必要はない