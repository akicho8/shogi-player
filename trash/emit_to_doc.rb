[
  { key: "ev_short_sfen_change"                         , name: "盤面の状態",                                     desc: "コントローラーで手を戻しても変化する", },
  { key: "ev_play_mode_next" , name: "操作モードで指した直後の局面を発行(movesあり)",  desc: "", },
  { key: "play_mode_next_moves"           , name: "操作モードで指した手の配列",                     desc: "", },
  { key: "ev_play_mode_moves_change"             , name: "操作モードでの現在の手の配列",                   desc: "turn_offsetでtakeしている", },
  { key: "ev_edit_mode_short_sfen_change"               , name: "編集モードの局面",                               desc: "", },
  { key: "ev_edit_mode_short_sfen2_change"              , name: "編集モードの局面(使用禁止)",                     desc: "", },
  { key: "update:sp_turn"                            , name: "手数が変更されたとき(非推奨)",                   desc: "sp_turnに-1が指定されたとき必ず呼ばれるので名前変更するかも", },
  { key: "ev_play_mode_piece_put"                            , name: "ユーザーが意図して駒を盤に置いた",               desc: "指したとき", },
  { key: "ev_action_viewpoint_flip"                       , name: "ユーザーが意図して盤の視点を変更した",           desc: "☗☖をクリックして反転したとき", },
  { key: "ev_action_turn_change"                          , name: "ユーザーが意図して手数を変更した",               desc: "スライダーを動かして手数を変更したとき。(引数は新しい手数)", },
  { key: "ev_action_piece_lift"                           , name: "ユーザーが意図して駒を持ち上げた",               desc: "", },
  { key: "ev_action_piece_cancel"                         , name: "ユーザーが意図して持ち上げた駒を元に戻した",     desc: "", },
  { key: "ev_turn_offset_change"                        , name: "手数が変更されたとき",                           desc: "マイナスにはならない。sp_turnと被るので追加。", },
  { key: "ev_turn_offset_max_change"                    , name: "最大手数が変更されたとき",                       desc: "内部変数参照よりこっちの方が安全なはず", },
  { key: "ev_action_board_cell_pointerdown"                    , name: "セルをクリックしたとき(スマホの場合押した瞬間)", desc: "placeが来るのでどこをクリックしたかわかる", },
  { key: "ev_action_player_info_click"                         , name: "プレイヤー名をクリックしたとき",                 desc: "(location,sp_player_infoの片側)がくる", },
  { key: "ev_error_click_but_self_is_not_turn"                        , name: "手番が違うのに操作しようとした",                 desc: "", },
  { key: "ev_error_my_turn_but_oside_click"                        , name: "自分が手番だが相手の駒を動かそうとした",         desc: "", },
  { key: "ev_error_foul_accident"                             , name: "反則が発生したとき",                             desc: "sp_foul_check&&sp_foul_breakのときのみ", },
  { key: "update:sp_mode"                        , name: "設定ダイアログでモードが変更されたとき",         desc: "", },
  { key: "update:sp_debug"                      , name: "設定ダイアログでデバッグモードが変更されたとき", desc: "", },
  { key: "update:sp_viewpoint"                       , name: "盤面を反転したとき",                             desc: "", },
  { key: "xxx.native"                                , name: "任意のイベント(例:click.native)",                desc: "clickの場合はだいたいsp_operation_disabledと組み合わせる", },
].each do |e|
  puts "### `#{e[:key]}`"
  puts
  puts "Arguments: `(event)`"
  puts
  puts e[:name]
  puts
  puts e[:desc]
  puts
end
