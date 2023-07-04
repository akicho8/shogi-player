---
sidebar: auto
---

# 命令型API

## 概要 ##

  * フロー駆動に適した命令型の公開メソッド集
  * 冗長だが `api_` から始めることにしている
  * Vue.js の場合 ShogiPlayer コンポーネントをレシーバーとして実行できる

## Public Methods ##

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

### `api_play_mode_setup()`

api_sfen_or_kif_set で指定した棋譜で再生モード用の内部変数を初期化する

### `api_lifted_piece_cancel()`

持った駒を離す

### `api_turn_slider_focus()`

スライダーがあればフォーカスする

### `api_moves_take_turn_offset()`

操作モードでの `moves.take(turn_offset)` 相当を返す

### `api_turn_add`

局面を移動する

| 実行例                               | 意味                               |
|--------------------------------------|------------------------------------|
| api_turn_add(1)                      | 一手進む                           |
| api_turn_add(-1)                     | 一手戻る                           |
| api_turn_add(1, {cycle: true})       | 最後の次は0手目に戻る              |
| api_turn_add(1, {interactive: true}) | ユーザー操作によって移動したとする |

### `api_turn_set_to_min()`

開始局面に移動する

| 実行例                             | 意味                               |
|------------------------------------|------------------------------------|
| api_turn_set_to_min()                    | 静かに移動する                     |
| api_turn_set_to_min({interactive: true}) | ユーザー操作によって移動したとする |

### `api_turn_set_to_max()`

最終局面に移動する

| 実行例                            | 意味                               |
|-----------------------------------|------------------------------------|
| api_turn_set_to_max()                    | 静かに移動する |
| api_turn_set_to_max({interactive: true}) | ユーザー操作によって移動したとする |

## Read Only プロパティ

| 名前            | 意味                                                                                                 |
|-----------------|------------------------------------------------------------------------------------------------------|
| turn_offset     | 現在の局面の手数で sp_turn に -1 を指定したときは最後の局面の手数になっている                        |
| turn_offset_min | 局面手数スライダーの最小値。常に0                                                                    |
| turn_offset_max | 局面手数スライダーの最大値。指し手が 2 つあれば 2                                                    |
| turn_base       | 普通は 0 だけど sfen で 'b - 10' の指定があったときは 9 になっている。この変数は外から見る必要はない |
