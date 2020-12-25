| 名前                          | 意味                         | 備考                                                                       | 初期値        | .sync |
|-------------------------------|------------------------------|----------------------------------------------------------------------------|---------------|-------|
| `run_mode`                    | 実行モード                   | `view_mode`:再生 `play_mode`:操作 編集:`edit_mode`。                       | 'view_mode'   | ○    |
| `human_side_key`              | 人間が操作する側             | play_mode 時のみ有効 `both`, `black`, `white`, `none`                      | 'both'        |       |
| `kifu_body`                   | 棋譜の本体                   | KIF と SFEN に対応。駒落ちは SFEN のみ                                     | null          |       |
| `sp_bg_variant`               | realテーマの背景             | a .. z                                                                     | 'a'           | ○    |
| `sp_pi_variant`               | realテーマの駒種             | a .. b                                                                     | 'a'           | ○    |
| `start_turn`                  | N手目の局面から表示          | 例 0:開始前 1:初手 -1:投了図 -2:投了一手前                                 | -1            | ○    |
| `sp_slider`                   | 局面スライダー表示           |                                                                            | is_slider_off |       |
| `controller_show`             | 前後移動用のボタン類の表示   |                                                                            | false         |       |
| `sfen_show`                   | 局面を sfen で表示           | 主に局面ペディア用                                                         | false         |       |
| `overlay_navi`                | 盤上の左右で前後操作         | 無効にするとview_modeで駒操作できる                                        |               |       |
| `sound_effect`                | 駒音の有無                   |                                                                            | false         |       |
| `volume`                      | 駒音の大きさ                 | 0 から 1.0                                                                 | 0.5           |       |
| `key_event_capture`           | キーボード操作を監視         | どこにもフォーカスしていないときでも左右キーが反応                         | false         |       |
| `shift_key_mag`               | shiftキー押下時の倍速        | 1 または null 指定で無効にできる                                           | 10            |       |
| `system_key_mag`              | システムキー押下時の倍速     | 1 または null 指定で無効にできる                                           | 50            |       |
| `debug_mode_p`                | デバッグモード               | 主に開発用                                                                 | false         | ○    |
| `sp_layer`                    | レイヤー確認                 | 主に開発用                                                                 | false         | ○    |
| `sp_blink`                    | 移動後の駒のセルを明滅       |                                                                            | false         | ○    |
| `flip`                        | 盤面を反転する               | △が下にくる                                                               | false         | ○    |
| `flip_if_white`               | △から始まる場合のみ反転する | △が下にくる                                                               | false         |       |
| `final_label`                 | 結果の文字列                 | 空だと「○の勝ち」                                                         | null          |       |
| `preset_key`                  | 盤面の初期配置               | kifu_body の代わりに指定するとその配置になる                               | null          |       |
| `hidden_if_piece_stand_blank` | 持駒がないときは駒台非表示   | view_mode のみ                                                             | false         |       |
| `setting_button_show`         | 設定ボタンの表示             | 右端にあるドット3つのアレ(ボタンなのか？)                                  | true          |       |
| `sp_summary`                  | まで○手で○の勝ちの表示     | 盤の上にある○手                                                           | is_summary_on |       |
| `operation_disable`           | 操作をすべて無効化する       | 無効化すると @click イベントだけが反応する。ショートカットキーも無効化する | false         |       |
| `player_info`                 | 対局者名                     | `{'black': {name: 'xxx'}, 'white': {name: 'xxx'}` 形式                     | null          |       |

<br>

<article class="message is-info">
  <div class="message-header">
    <p>備考</p>
  </div>
  <div class="message-body">
    <ul>
      <li>kifu_body も preset_key も指定がない場合は `position startpos` (平手) が初期配置になる</li>
    </ul>
  </div>
</article>

<article class="message is-warning">
  <div class="message-header">
    <p>注意点</p>
  </div>
  <div class="message-body">
    `key_event_capture` は副作用がある。有効にするとどこにもフォーカスしていないときでも左右ボタンに反応するようになって便利な面もあるが、他のプログラムの操作を奪ってしまうことになるかもしれません。そのため基本は false にしておいた方がよいです。
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
| `update:start_turn`                         | 手数が変更されたとき                           | start_turn に -1 が指定されたとき必ず呼ばれるので名前変更するかも |
| `update:turn_offset`                        | 手数が変更されたとき                           | マイナスにはならない。start_turn と被るので追加。                 |
| `update:turn_offset_max`                    | 最大手数が変更されたとき                       | 内部変数参照よりこっちの方が安全なはず                            |
| `update:run_mode`                           | 設定ダイアログでモードが変更されたとき         |                                                                   |
| `update:kifu_body`                          | 設定ダイアログで棋譜が変更されたとき           |                                                                   |
| `update:debug_mode_p`                       | 設定ダイアログでデバッグモードが変更されたとき |                                                                   |
| `update:flip`                               | 盤面を反転したとき                             |                                                                   |
| `update:sp_layout`                          | レイアウトを変更したとき                       |                                                                   |
| `update:sp_bg_variant`                      | 背景の種類変更                                 |                                                                   |
| `update:sp_pi_variant`                      | 駒の種類変更                                   |                                                                   |
| `board_cell_left_click_user_handle`         | セルをクリックしたとき                         | place が来るのでどこをクリックしたかわかる                        |
| `board_cell_pointerdown_user_handle`        | セルをクリックしたとき(スマホの場合押した瞬間) | place が来るのでどこをクリックしたかわかる                        |
| `player_click_handle`                  | プレイヤー名をクリックしたとき                 | (location, player_info) がくる                                    |
| `location_click_handle`                 | ☗☖をクリックしたとき                         | (location) がくる                                    |
| `xxx.native`                                | 任意のイベント (例: `click.native`)            | click の場合はだいたい `operation_disable` と組み合わせる         |
| `board_piece_back_user_style`               | ?
| `board_piece_back_user_class`               | ?

## Slot

| 名前      | 引数           | 場所                                   |
|-----------|----------------|----------------------------------------|
| `sfen_part` | `sfen`, `mediator` | sfen_show のときに表示する sfen の部分 |

## 内部変数 (読み取り専用)

| 名前      | 意味                                                                             |
|-----------|----------------------------------------------------------------------------------|
| `turn_offset`     | 現在の局面の手数で start_turn に -1 を指定したときは最後の局面の手数になっている |
| `turn_offset_min` | 局面手数スライダーの最小値。常に0 |
| `turn_offset_max` | 局面手数スライダーの最大値。指し手が 2 つあれば 2 |
| `turn_base`       | 普通は 0 だけど sfen で 'b - 10' の指定があったときは 9 になっている。この変数は外から見る必要はない
