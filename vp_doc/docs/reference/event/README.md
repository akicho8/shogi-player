---
sidebar: auto
---

# イベント

## はじめに

* Vue.js 2 でコンポーネントを使う場合の説明となっている
  * Web Components の場合はいろいろ制約がでてくる
* SFEN には2種類あって区別のための言い回しが冗長になるため単に長短で表わす
  * 短いSFEN: moves なし (BOD相当)
  * 長いSFEN: moves あり (KIF相当)
* moves は SFEN の moves 後の指し手配列を表わす
* 手数はN手目の局面と言い表わすときの N の部分のこと

## 一覧

### `ev:short_sfen(sfen: string)`

状態が変わったとき短いSFENを投げる

コントローラーで手を戻しても変化する

### `ev:play_mode_next_info(hash: object)`

操作モードで着手後にいろんな情報を投げる

| メンバ         | 意味                                      |
|----------------|-------------------------------------------|
| sfen           | 着手後の長いSFEN                          |
| turn           | 着手後の手数                              |
| last_move_info | 着手した手の情報(Object)                  |
| snapshot_hash  | 現在の盤面のハッシュコード (千日手判定用) |

### `ev:play_mode_next_moves(moves: array)`

操作モードで着手後に moves の配列を投げる

`ev:play_mode_next_info` と統合する予定 (TODO)

### `ev:moves_take_turn_offset(moves: array)`

操作モードで盤面が変化したときの moves を投げる <Badge text="非推奨" type="error" vertical="top" />

例えば `[a, b, c]` の指し手があってポインタが `c` のときコントローラーでポインタを `b` に戻すと `[a, b]` を持ってトリガーする

### `ev:edit_mode_short_sfen(sfen: string)`

編集モードで局面が変化したら短いSFENを投げる

### `ev:edit_mode_short_sfen2(sfen: string)`

編集モードで局面が変化したら短いSFENを投げる <Badge text="非推奨" type="error" vertical="top" />

### `ev:play_mode_user_piece_put`

操作モードでユーザーが意図して駒を盤に置いた

指したとき

### `user_viewpoint_flip`

ユーザーが意図して盤の視点を変更した

☗☖をクリックして反転したとき

### `user_turn_change`

ユーザーが意図して手数を変更した

スライダーを動かして手数を変更したとき。(引数は新しい手数)

### `user_piece_lift`

ユーザーが意図して駒を持ち上げた

### `user_piece_cancel`

ユーザーが意図して持ち上げた駒を元に戻した

### `ev:turn_offset`

手数が変更されたときに手数を投げる

### `ev:turn_offset_max`

最大手数が変更されたとき

内部変数参照よりこっちの方が安全なはず

### `board_cell_pointerdown`

セルをクリックしたとき(スマホの場合押した瞬間)

placeが来るのでどこをクリックしたかわかる

### `player_info_click`

プレイヤー名をクリックしたとき

(location,sp_player_infoの片側)がくる

### `operation_invalid1`

手番が違うのに操作しようとした

### `operation_invalid2`

自分が手番だが相手の駒を動かそうとした

### `foul_accident`

反則が発生したとき

sp_play_mode_foul_check_p&&sp_play_mode_foul_break_pのときのみ

### `xxx.native`

任意のイベント(例:click.native)

clickの場合はだいたいsp_operation_disabledと組み合わせる

## .sync 用

### `update:sp_turn(turn: number)`

手数が変更されたときに手数を投げる <Badge text="非推奨" type="error" vertical="top" />

sp_turn に -1 が指定されたとき必ず呼ばれてしまう副作用があって使いづらい

### `update:sp_body(str: string)`

コンポーネント内から棋譜が変更されたとき

### `update:sp_debug_mode(mode: string)`

コンポーネント内からデバッグモードが変更されたとき

### `update:sp_viewpoint(location_key: string)`

コンポーネント内から視点が切り替わったとき

### `update:sp_layout(layout: string)`

レイアウトを変更したとき

### `update:sp_bg_variant(type: string)`

コンポーネント内から背景の種類が変更されたとき

### `update:sp_piece_variant(type: string)`

コンポーネント内から駒の種類が変更されたとき

### `update:sp_run_mode(mode: string)`

コンポーネント内からモードが変更されたとき
