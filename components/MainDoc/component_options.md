| Name                                          | Description                                                                                                                                                                                                                                        | Default                         |
|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| `sp_turn_slider_focus`                        | mountedしたらスライダーにフォーカスする？                                                                                                                                                                                                          | "is_turn_slider_focus_on"       |
| `sp_summary`                                  | 手数や結果の表示(再生モード時) (is_summary_on is_summary_off)                                                                                                                                                                                      | "is_summary_off"                |
| `sp_slider`                                   | スライダー表示                                                                                                                                                                                                                                     | "is_slider_off"                 |
| `sp_setting`                                  | 設定ボタンの表示                                                                                                                                                                                                                                   | "is_setting_off"                |
| `sp_controller`                               | コントローラー表示                                                                                                                                                                                                                                 | "is_controller_off"             |
| `sp_viewpoint`                                | 視点                                                                                                                                                                                                                                               | "black"                         |
| `sp_op_disabled`                              | 全体の操作を無効化                                                                                                                                                                                                                                 | false                           |
| `sp_hidden_if_piece_stand_blank`              | 駒がないときは駒台側を非表示                                                                                                                                                                                                                       | false                           |
| `sp_flip_if_white`                            | 最初に表示した局面が△なら反転                                                                                                                                                                                                                     | false                           |
| `sp_key_event_capture_enabled`                | スライダーにフォーカスしていなくても左右キーで手数を動かす                                                                                                                                                                                         | false                           |
| `sp_shift_key_mag`                            | キーで左右するとき shift を押したときの倍率                                                                                                                                                                                                        |                              10 |
| `sp_system_key_mag`                           | キーで左右するとき command などを押したときの倍率                                                                                                                                                                                                  |                              50 |
| `sp_board_dimension_w`                        | 盤のセル数(W)                                                                                                                                                                                                                                      |                               9 |
| `sp_board_dimension_h`                        | 盤のセル数(H)                                                                                                                                                                                                                                      |                               9 |
| `sp_layout`                                   | レイアウト is_(vertical\|horizontal)                                                                                                                                                                                                               | "is_vertical"                   |
| `sp_balloon`                                  | 対局者名の下に駒数スタイルと同じ背景色を置く                                                                                                                                                                                                       | "is_balloon_on"                 |
| `sp_layer`                                    | レイヤー確認(デバッグ用)                                                                                                                                                                                                                           | "is_layer_off"                  |
| `sp_pi_variant`                               | 駒の種類                                                                                                                                                                                                                                           | "is_pi_variant_a"               |
| `sp_bg_variant`                               | 盤の種類                                                                                                                                                                                                                                           | "is_bg_variant_none"            |
| `sp_mobile_vertical`                          | モバイル時に自動的に縦配置に切り替える                                                                                                                                                                                                             | "is_mobile_vertical_on"         |
| `sp_location_behavior`                        | ☗☖をタップしたとき視点を切り替える                                                                                                                                                                                                               | "is_location_flip_on"           |
| `sp_debug_mode`                               | デバッグモード                                                                                                                                                                                                                                     | "is_debug_mode_off"             |
| `sp_sfen_show`                                | SFENを下に表示する                                                                                                                                                                                                                                 | "is_sfen_show_off"              |
| `sp_overlay_nav`                              | view_mode のとき盤の左右で手数変更(falseなら駒を動かせる)                                                                                                                                                                                          | "is_overlay_nav_off"            |
| `sp_digit_label`                              | 座標の表示                                                                                                                                                                                                                                         | "is_digit_label_off"            |
| `sp_stand_layout`                             | 駒台の位置                                                                                                                                                                                                                                         | "is_stand_layout_to_bottom"     |
| `sp_player_name_dir`                          | 名前の縦横書き切り替え(縦は横配置時のみ有効)                                                                                                                                                                                                       | "is_player_name_dir_horizontal" |
| `sp_turn`                                     | 局面(手数)                                                                                                                                                                                                                                         |                              -1 |
| `sp_run_mode`                                 | モード                                                                                                                                                                                                                                             | "view_mode"                     |
| `sp_body`                                     | 棋譜 KIF or SFEN                                                                                                                                                                                                                                   | null                            |
| `sp_player_info`                              | 対局者名と時間                                                                                                                                                                                                                                     | null                            |
| `sp_comment`                                  | KIFのコメントを表示する                                                                                                                                                                                                                            | "is_comment_on"                 |
| `sp_player_click_handle`                      | 名前(時間を含む)をタップしたときに実行する                                                                                                                                                                                                         | null                            |
| `sp_location_click_handle`                    | ☗☖をタップしたときに実行する                                                                                                                                                                                                                     | null                            |
| `sp_board_click_handle`                       | 盤をタップしたときに実行する(駒よりも優先)                                                                                                                                                                                                         | null                            |
| `sp_board_piece_back_user_style`              | セルのスタイルを決める処理                                                                                                                                                                                                                         | null                            |
| `sp_board_piece_back_user_class`              | セルのクラスを決める処理                                                                                                                                                                                                                           | null                            |
| `sp_board_cell_left_click_user_handle`        | セルタップ時の処理(クリック後に呼ぶ)                                                                                                                                                                                                               | null                            |
| `sp_board_cell_pointerdown_user_handle`       | セルタップ時の処理(クリックした瞬間に呼ぶ)                                                                                                                                                                                                         | null                            |
| `sp_human_side`                               | 含まれる側だけ操作できるようにする                                                                                                                                                                                                                 | "both"                          |
| `sp_device`                                   | デバイスを強制的に指定する (is_device_touch is_device_desktop) 自動判別するので基本そのままでよい                                                                                                                                                  | null                            |
| `sp_play_mode_foul_check_p`                   | play_mode で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？                                                                                                                                                                                   | true                            |
| `sp_play_mode_foul_break_p`                   | 判定で反則だったら emit して抜けるか？(true: 初心者向け)                                                                                                                                                                                           | false                           |
| `sp_play_mode_legal_move_only`                | play_mode で合法手のみに絞る                                                                                                                                                                                                                       | true                            |
| `sp_play_mode_auto_promote`                   | play_mode で死に駒になるときは自動的に成る                                                                                                                                                                                                         | true                            |
| `sp_play_mode_only_own_piece_to_move`         | play_mode では自分手番とき自分の駒しか動かせないようにする                                                                                                                                                                                         | true                            |
| `sp_play_mode_can_not_kill_same_team_soldier` | play_mode では自分の駒で同じ仲間の駒を取れないようにする                                                                                                                                                                                           | true                            |
| `sp_edit_mode_double_click_time_ms`           | edit_mode で駒を反転するときのダブルクリックと認識する時間(ms)                                                                                                                                                                                     |                             350 |
| `sp_move_cancel`                              | is_move_cancel_standard: (死に駒セルを除き)移動できないセルに移動したとき持った状態をキャンセルする。is_move_cancel_reality: (盤上の駒に限り)キャンセルは元の位置をタップ。is_move_cancel_rehold: (盤上の駒に限り)キャンセルと同時に盤上の駒を持つ | "is_move_cancel_standard"       |
| `sp_view_mode_soldier_movable`                | view_mode でも駒を動かせる(ただし本筋は破壊しない)                                                                                                                                                                                                 | true                            |