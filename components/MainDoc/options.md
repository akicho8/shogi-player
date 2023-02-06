<article class="message is-info">
  <div class="message-header">
    <p>備考</p>
  </div>
  <div class="message-body">
    <ul>
      <li>sp_body も preset_key も指定がない場合は `position startpos` (平手) が初期配置になる</li>
    </ul>
  </div>
</article>

<article class="message is-warning">
  <div class="message-header">
    <p>注意点</p>
  </div>
  <div class="message-body">
    `sp_key_event_capture_enabled` は副作用がある。有効にするとどこにもフォーカスしていないときでも左右ボタンに反応するようになって便利な面もあるが、他のプログラムの操作を奪ってしまうことになるかもしれません。そのため基本は false にしておいた方がよいです。
  </div>
</article>

## イベント

| 名前                                        | 意味                                           | 備考                                                              |   |
|---------------------------------------------|------------------------------------------------|-------------------------------------------------------------------|---|
| `update:short_sfen`                         | 盤面の状態                                     | コントローラーで手を戻しても変化する                              |   |
| `update:play_mode_advanced_full_moves_sfen` | 操作モードで指した直後の局面を発行(movesあり)  |                                                                   |   |
| `update:play_mode_advanced_short_sfen`      | 操作モードで指した直後の局面を発行(movesなし)  |                                                                   |   |
| `update:play_mode_advanced_moves`           | 操作モードで指した手の配列                     |                                                                   |   |
| `update:moves_take_turn_offset`             | 操作モードでの現在の手の配列                   | turn_offset で take している                                      |   |
| `update:edit_mode_short_sfen`               | 編集モードの局面                               |                                                                   |   |
| `update:sp_turn`                            | 手数が変更されたとき                           | sp_turn に -1 が指定されたとき必ず呼ばれるので名前変更するかも    |   |
| `user_piece_put`                            | ユーザーが意図して駒を盤に置いた               | 指したとき                                                        |   |
| `user_viewpoint_flip`                       | ユーザーが意図して盤の視点を変更した           | ☗☖をクリックして反転したとき                                      |   |
| `user_turn_change`                          | ユーザーが意図して手数を変更した               | スライダーを動かして手数を変更したとき。(引数は新しい手数)        |   |
| `user_piece_lift`                           | ユーザーが意図して駒を持ち上げた               |                                                                   |   |
| `user_piece_cancel`                         | ユーザーが意図して持ち上げた駒を元に戻した     |                                                                   |   |
| `update:turn_offset`                        | 手数が変更されたとき                           | マイナスにはならない。sp_turn と被るので追加。                    |   |
| `update:turn_offset_max`                    | 最大手数が変更されたとき                       | 内部変数参照よりこっちの方が安全なはず                            |   |
| `update:sp_run_mode`                        | 設定ダイアログでモードが変更されたとき         |                                                                   |   |
| `update:sp_body`                            | 設定ダイアログで棋譜が変更されたとき           |                                                                   |   |
| `update:sp_debug_mode`                      | 設定ダイアログでデバッグモードが変更されたとき |                                                                   |   |
| `update:sp_viewpoint`                       | 盤面を反転したとき                             |                                                                   |   |
| `update:sp_layout`                          | レイアウトを変更したとき                       |                                                                   |   |
| `update:sp_bg_variant`                      | 背景の種類変更                                 |                                                                   |   |
| `update:sp_piece_variant`                      | 駒の種類変更                                   |                                                                   |   |
| `board_cell_pointerdown`     | セルをクリックしたとき(スマホの場合押した瞬間) | place が来るのでどこをクリックしたかわかる                        |   |
| `player_info_click`                         | プレイヤー名をクリックしたとき                 | (location, sp_player_infoの片側) がくる                           |   |
| `xxx.native`                                | 任意のイベント (例: `click.native`)            | click の場合はだいたい `sp_operation_disabled` と組み合わせる            |   |
| `operation_invalid1`                        | 手番が違うのに操作しようとした                 |                                                                   |   |
| `operation_invalid2`                        | 自分が手番だが相手の駒を動かそうとした         |                                                                   |   |
| `foul_accident`                             | 反則が発生したとき                             | sp_play_mode_foul_check_p && sp_play_mode_foul_break_p のときのみ |   |

## Slot

| 名前        | 引数               | 場所                                      |
|-------------|--------------------|-------------------------------------------|
| `sfen_part` | `sfen`, `xcontainer` | sp_sfen_show のときに表示する sfen の部分 |

## 内部変数 (読み取り専用)

| 名前      | 意味                                                                             |
|-----------|----------------------------------------------------------------------------------|
| `turn_offset`     | 現在の局面の手数で sp_turn に -1 を指定したときは最後の局面の手数になっている |
| `turn_offset_min` | 局面手数スライダーの最小値。常に0 |
| `turn_offset_max` | 局面手数スライダーの最大値。指し手が 2 つあれば 2 |
| `turn_base`       | 普通は 0 だけど sfen で 'b - 10' の指定があったときは 9 になっている。この変数は外から見る必要はない
