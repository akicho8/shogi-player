[
  { key: "ev:short_sfen"                         , name: "盤面の状態",                                     desc: "コントローラーで手を戻しても変化する", },
  { key: "ev:play_mode_next_info" , name: "操作モードで指した直後の局面を発行(movesあり)",  desc: "", },
  { key: "play_mode_next_moves"           , name: "操作モードで指した手の配列",                     desc: "", },
  { key: "ev:moves_take_turn_offset"             , name: "操作モードでの現在の手の配列",                   desc: "turn_offsetでtakeしている", },
  { key: "ev:edit_mode_short_sfen"               , name: "編集モードの局面",                               desc: "", },
  { key: "ev:edit_mode_short_sfen2"              , name: "編集モードの局面(使用禁止)",                     desc: "", },
  { key: "update:sp_turn"                            , name: "手数が変更されたとき(非推奨)",                   desc: "sp_turnに-1が指定されたとき必ず呼ばれるので名前変更するかも", },
  { key: "ev:play_mode_user_piece_put"                            , name: "ユーザーが意図して駒を盤に置いた",               desc: "指したとき", },
  { key: "user_viewpoint_flip"                       , name: "ユーザーが意図して盤の視点を変更した",           desc: "☗☖をクリックして反転したとき", },
  { key: "user_turn_change"                          , name: "ユーザーが意図して手数を変更した",               desc: "スライダーを動かして手数を変更したとき。(引数は新しい手数)", },
  { key: "user_piece_lift"                           , name: "ユーザーが意図して駒を持ち上げた",               desc: "", },
  { key: "user_piece_cancel"                         , name: "ユーザーが意図して持ち上げた駒を元に戻した",     desc: "", },
  { key: "ev:turn_offset"                        , name: "手数が変更されたとき",                           desc: "マイナスにはならない。sp_turnと被るので追加。", },
  { key: "ev:turn_offset_max"                    , name: "最大手数が変更されたとき",                       desc: "内部変数参照よりこっちの方が安全なはず", },
  { key: "board_cell_pointerdown"                    , name: "セルをクリックしたとき(スマホの場合押した瞬間)", desc: "placeが来るのでどこをクリックしたかわかる", },
  { key: "player_info_click"                         , name: "プレイヤー名をクリックしたとき",                 desc: "(location,sp_player_infoの片側)がくる", },
  { key: "operation_invalid1"                        , name: "手番が違うのに操作しようとした",                 desc: "", },
  { key: "operation_invalid2"                        , name: "自分が手番だが相手の駒を動かそうとした",         desc: "", },
  { key: "foul_accident"                             , name: "反則が発生したとき",                             desc: "sp_play_mode_foul_check_p&&sp_play_mode_foul_break_pのときのみ", },
  { key: "update:sp_run_mode"                        , name: "設定ダイアログでモードが変更されたとき",         desc: "", },
  { key: "update:sp_body"                            , name: "設定ダイアログで棋譜が変更されたとき",           desc: "", },
  { key: "update:sp_debug_mode"                      , name: "設定ダイアログでデバッグモードが変更されたとき", desc: "", },
  { key: "update:sp_viewpoint"                       , name: "盤面を反転したとき",                             desc: "", },
  { key: "update:sp_layout"                          , name: "レイアウトを変更したとき",                       desc: "", },
  { key: "update:sp_bg_variant"                      , name: "背景の種類変更",                                 desc: "", },
  { key: "update:sp_piece_variant"                   , name: "駒の種類変更",                                   desc: "", },
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
