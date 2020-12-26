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

| 名前                                        | 意味                                           | 備考                                                              |
|---------------------------------------------|------------------------------------------------|-------------------------------------------------------------------|
| `update:mediator_snapshot_sfen`             | 操作モードの盤面の状態                         | コントローラーで手を戻しても変化する。view_mode でも呼ばれる      |
| `update:play_mode_advanced_full_moves_sfen` | 操作モードで指した直後の局面を発行(movesあり)  |                                                                   |
| `update:play_mode_advanced_snapshot_sfen`   | 操作モードで指した直後の局面を発行(movesなし)  |                                                                   |
| `update:play_mode_advanced_last_move`       | 操作モードで指した手(sfenのmovesの最後の1つ)   |                                                                   |
| `update:play_mode_advanced_moves`           | 操作モードで指した手の配列                     |                                                                   |
| `update:moves_take_turn_offset`             | 操作モードでの現在の手の配列                   | turn_offset で take している                                      |
| `update:edit_mode_snapshot_sfen`            | 編集モードの局面                               | play_mode でも呼ばれるので注意                                    |
| `update:sp_turn`                         | 手数が変更されたとき                           | sp_turn に -1 が指定されたとき必ず呼ばれるので名前変更するかも |
| `update:turn_offset`                        | 手数が変更されたとき                           | マイナスにはならない。sp_turn と被るので追加。                 |
| `update:turn_offset_max`                    | 最大手数が変更されたとき                       | 内部変数参照よりこっちの方が安全なはず                            |
| `update:sp_run_mode`                           | 設定ダイアログでモードが変更されたとき         |                                                                   |
| `update:sp_body`                          | 設定ダイアログで棋譜が変更されたとき           |                                                                   |
| `update:sp_debug`                       | 設定ダイアログでデバッグモードが変更されたとき |                                                                   |
| `update:sp_viewpoint`                               | 盤面を反転したとき                             |                                                                   |
| `update:sp_layout`                          | レイアウトを変更したとき                       |                                                                   |
| `update:sp_bg_variant`                      | 背景の種類変更                                 |                                                                   |
| `update:sp_pi_variant`                      | 駒の種類変更                                   |                                                                   |
| `sp_board_cell_left_click_user_handle`         | セルをクリックしたとき                         | place が来るのでどこをクリックしたかわかる                        |
| `sp_board_cell_pointerdown_user_handle`        | セルをクリックしたとき(スマホの場合押した瞬間) | place が来るのでどこをクリックしたかわかる                        |
| `sp_player_click_handle`                  | プレイヤー名をクリックしたとき                 | (location, sp_player_infoの片側) がくる                                    |
| `sp_location_click_handle`                 | ☗☖をクリックしたとき                         | (location) がくる                                    |
| `xxx.native`                                | 任意のイベント (例: `click.native`)            | click の場合はだいたい `sp_op_disabled` と組み合わせる         |
| `sp_board_piece_back_user_style`               | ?
| `sp_board_piece_back_user_class`               | ?

## Slot

| 名前      | 引数           | 場所                                   |
|-----------|----------------|----------------------------------------|
| `sfen_part` | `sfen`, `mediator` | sp_sfen_show のときに表示する sfen の部分 |

## 内部変数 (読み取り専用)

| 名前      | 意味                                                                             |
|-----------|----------------------------------------------------------------------------------|
| `turn_offset`     | 現在の局面の手数で sp_turn に -1 を指定したときは最後の局面の手数になっている |
| `turn_offset_min` | 局面手数スライダーの最小値。常に0 |
| `turn_offset_max` | 局面手数スライダーの最大値。指し手が 2 つあれば 2 |
| `turn_base`       | 普通は 0 だけど sfen で 'b - 10' の指定があったときは 9 になっている。この変数は外から見る必要はない
