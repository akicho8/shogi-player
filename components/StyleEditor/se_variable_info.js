import { ApplicationMemoryRecord } from "../models/application_memory_record.js"
import * as DeepObjectDiff from "deep-object-diff"
import chroma from "chroma-js"

const sp_player_info_one = {
  name: "",
  time: "",
  piece_visibility: "visible",
}

const sp_player_info = {
  black: { ...sp_player_info_one },
  white: { ...sp_player_info_one },
}

export class SeVariableInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "sidebar_p",                           name: "サイドバーの状態",                                                         context_type: "se_var", type: "Bool",    sub_type: null,   default_value: true,                       development_value: null, },
      { key: "kifu_book_key",                       name: "棋譜プリセット",                                                           context_type: "se_var", type: "String",  sub_type: null,   default_value: null,                       development_value: null, },
      { key: "sfen_book_info_key",                       name: "棋譜プリセット",                                                           context_type: "se_var", type: "String",  sub_type: null,   default_value: null,                       development_value: null, },
      { key: "transform_tab_index",                 name: "Transformのタブ位置",                                                      context_type: "se_var", type: "Integer", sub_type: null,   default_value: 0,                          development_value: null, },

      { key: "user_custom_css",                     name: "カスタムCSS",                                                              context_type: "se_var", type: "String",  sub_type: null,   default_value: "",                         development_value: null, },
      { key: "component_parmas_show_all",                       name: "コンポーネント引数確認時にデフォルト値も表示する",                         context_type: "se_var", type: "Bool",    sub_type: null,   default_value: false,                      development_value: null, },
      { key: "css_params_show_all",                      name: "コンポーネント引数確認時にデフォルト値も表示する",                         context_type: "se_var", type: "Bool",    sub_type: null,   default_value: false,                      development_value: null, },

      { key: "sp_board_image",                      name: "盤の画像",                                                                 context_type: "sp_css", type: "String",  sub_type: null,   default_value: null,                       development_value: null, },
      { key: "sp_controller_width",                 name: "コントローラー横幅",                                                       context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.5,                        development_value: null, },
      { key: "sp_controller_width_mobile",          name: "コントローラー横幅(モバイル時)",                                           context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.8,                        development_value: null, },

      { key: "sp_board_color",                      name: "盤の色",                                                                   context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.2)",     development_value: null, },
      { key: "sp_board_even_cell_color",            name: "セルの色(偶数)",                                                           context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.0)",     development_value: null, },
      { key: "sp_board_odd_cell_color",             name: "セルの色(奇数)",                                                           context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.0)",     development_value: null, },

      { key: "sp_board_horizontal_gap",             name: "盤の左右の隙間(横配置時)",                                                 context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "sp_board_vertical_gap",               name: "盤の上下の隙間(縦配置時)",                                                 context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "sp_board_aspect_ratio",               name: "盤の比率",                                                                 context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 1.097,                      development_value: null, },
      { key: "sp_piece_vertical_position",          name: "駒テクスチャを貼る縦の位置",                                               context_type: "sp_css", type: "String",  sub_type: null,   default_value: "center",                   development_value: null, },
      { key: "sp_board_radius",                     name: "盤の角の丸め度合い",                                                       context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 5,                          development_value: null, },
      { key: "sp_board_padding",                    name: "盤の外周の隙間",                                                           context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.015,                      development_value: null, },

      { key: "sp_star_step",                        name: "星の配置間隔",                                                             context_type: "sp_var", type: "Integer", sub_type: null,   default_value: 3,                          development_value: null, },

      { key: "sp_board_view_x",                     name: "カメラ左上X",                                                              context_type: "sp_var", type: "Integer", sub_type: null,   default_value: 0,                          development_value: null, },
      { key: "sp_board_view_y",                     name: "カメラ左上Y",                                                              context_type: "sp_var", type: "Integer", sub_type: null,   default_value: 0,                          development_value: null, },
      { key: "sp_board_view_w",                     name: "カメラ横幅W",                                                              context_type: "sp_var", type: "Integer", sub_type: null,   default_value: 9,                          development_value: null, },
      { key: "sp_board_view_h",                     name: "カメラ高さH",                                                              context_type: "sp_var", type: "Integer", sub_type: null,   default_value: 9,                          development_value: null, },
      { key: "sp_layout",                           name: "駒台の位置",                                                               context_type: "sp_var", type: "String",  sub_type: null,   default_value: "horizontal",               development_value: null, },
      { key: "sp_mode",                             name: "モード",                                                                   context_type: "sp_var", type: "String",  sub_type: null,   default_value: "view",                     development_value: null, },
      { key: "sp_mobile_vertical",                  name: "画面幅が狭いとき自動的に縦配置に切り替える",                               context_type: "sp_var", type: "String",  sub_type: null,   default_value: true,                       development_value: null, },

      // 成り不成り選択
      { key: "sp_promote_select_modal_bg_color",    name: "成り不成り選択画面の背景色",                                               context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.5)",     development_value: null, },
      { key: "sp_promote_select_modal_hover_color", name: "成り不成り選択でhoverした駒の背景色",                                      context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 100%, 0.5)",   development_value: null, },

      // 駒を操作中の移動元
      { key: "sp_mouse_lifted_origin_bg_color",     name: "マウスで持ち上げた駒の移動元の升目の背景色",                               context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.15)",    development_value: null, },
      { key: "sp_mouse_lifted_origin_opacity",      name: "マウスで持ち上げた駒の移動元にある駒の非透明度",                           context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },

      { key: "sp_balloon",                          name: "対局者名の下に駒数スタイルと同じ背景色を置くか？",                         context_type: "sp_var", type: "String",  sub_type: null,   default_value: true,                       development_value: null, },

      //////////////////////////////////////////////////////////////////////////////// 駒
      { key: "sp_piece_variant",                    name: "駒の種類",                                                                 context_type: "sp_var", type: "String",  sub_type: null,   default_value: "nureyon",                  development_value: null, },

      { key: "sp_board_piece_size",                 name: "盤上の駒の大きさ",                                                         context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.9,                        development_value: null, },

      { key: "sp_stand_cell_size",                  name: "駒台のセルサイズ",                                                         context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 1.0 / 10,                   development_value: null, },
      { key: "sp_stand_piece_size",                 name: "駒台の駒の大きさ",                                                         context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.8,                        development_value: null, },

      { key: "sp_piece_box_cell_size",              name: "駒箱のセルサイズ",                                                         context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 1.0 / 10,                   development_value: null, },
      { key: "sp_piece_box_piece_size",             name: "駒箱の駒の大きさ",                                                         context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.8,                        development_value: null, },

      //////////////////////////////////////////////////////////////////////////////// 駒台
      { key: "sp_stand_hover_border_color",         name: "駒を持ったマウスに反応した駒台や駒箱のボーダー色",                         context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.2)",     development_value: null, },
      { key: "sp_stand_bg_color",                   name: "駒台の背景色",                                                             context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.0)",     development_value: null, },
      { key: "sp_stand_gravity",                    name: "駒台を左右に配置したとき縦位置",                                           context_type: "sp_var", type: "String",  sub_type: null,   default_value: "bottom",                   development_value: null, },
      { key: "sp_stand_flip",                       name: "相手側を反転するか？",                                                     context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },

      { key: "sp_turn",                             name: "表示する局面の手数",                                                       context_type: "sp_var", type: "Integer", sub_type: null,   default_value: -1,                         development_value: null, },
      { key: "sp_viewpoint",                        name: "視点",                                                                     context_type: "sp_var", type: "String",  sub_type: null,   default_value: "black",                    development_value: null, },
      { key: "sp_debug",                            name: "デバッグモード",                                                           context_type: "sp_var", type: "Bool",    sub_type: null,   default_value: false,                      development_value: true, },

      { key: "sp_piece_count_size",                 name: "駒数の大きさ",                                                             context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.2,                        development_value: null, },
      { key: "sp_piece_count_font_color",           name: "駒数の色",                                                                 context_type: "sp_css", type: "String",  sub_type: null,   default_value: "hsla(0, 0%, 0%, 0.75)",    development_value: null, },
      { key: "sp_piece_count_bg_color",             name: "駒数の背景色",                                                             context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 100%, 0.9)",   development_value: null, },
      { key: "sp_piece_count_padding",              name: "駒数のパディング",                                                         context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.08,                       development_value: null, },

      { key: "sp_piece_count_horizontal_x",         name: "駒数のX座標 (横配置時)",                                                   context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.43,                       development_value: null, },
      { key: "sp_piece_count_horizontal_y",         name: "駒数のY座標 (横配置時)",                                                   context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.30,                       development_value: null, },
      { key: "sp_piece_count_vertical_x",           name: "駒数のX座標 (縦配置時)",                                                   context_type: "sp_css", type: "String",  sub_type: null,   default_value: 0.00,                       development_value: null, },
      { key: "sp_piece_count_vertical_y",           name: "駒数のY座標 (縦配置時)",                                                   context_type: "sp_css", type: "String",  sub_type: null,   default_value: 0.47,                       development_value: null, },

      { key: "sp_board_variant",                    name: "盤の種類",                                                                 context_type: "sp_var", type: "String",  sub_type: null,   default_value: "none",                     development_value: null, },

      { key: "sp_board_edge_stroke",                name: "盤のエッジの縁取りの太さ",                                                 context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "sp_grid_outer_stroke",                name: "盤の格子の外枠の太さ",                                                     context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "sp_grid_outer_color",                 name: "盤の外枠の色",                                                             context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.5)",     development_value: null, },
      { key: "sp_grid_inner_color",                 name: "盤の内側の格子の色",                                                       context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.5)",     development_value: null, },
      { key: "sp_grid_inner_stroke",                name: "盤の内側の格子の太さ",                                                     context_type: "sp_css", type: "String",  sub_type: null,   default_value: 1,                          development_value: null, },
      { key: "sp_star_size",                        name: "星の大きさ",                                                               context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.1,                        development_value: null, },
      { key: "sp_star_z_index",                     name: "星の z-index",                                                             context_type: "sp_css", type: "Integer", sub_type: null,   default_value: 0,                          development_value: null, },

      { key: "sp_piece_box_color",                  name: "駒箱の色",                                                                 context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.2)",     development_value: null, },

      { key: "sp_location_mark_active_size",        name: "手番のときの☗☖の大きさ",                                                   context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 1.0,                        development_value: null, },
      { key: "sp_location_mark_inactive_size",      name: "手番ではないときの☗☖の大きさ",                                             context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.5,                        development_value: null, },

      { key: "sp_comment",                          name: "KIFコメント表示",                                                          context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },
      { key: "sp_common_gap",                       name: "共通の隙間",                                                               context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.02,                       development_value: null, },
      { key: "sp_layer",                            name: "レイヤー表示",                                                             context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },

      //////////////////////////////////////////////////////////////////////////////// 座標
      { key: "sp_coordinate",                       name: "座標表示",                                                                 context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: true, },
      { key: "sp_coordinate_variant_h",             name: "座標の種類(X)",                                                            context_type: "sp_var", type: "String",  sub_type: null,   default_value: "number",                   development_value: null, },
      { key: "sp_coordinate_variant_v",             name: "座標の種類(Y)",                                                            context_type: "sp_var", type: "String",  sub_type: null,   default_value: "kanji",                    development_value: null, },
      { key: "sp_coordinate_x_size",                name: "盤面の上に表示するX座標の文字サイズ",                                      context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.125,                      development_value: null, },
      { key: "sp_coordinate_x_push",                name: "盤面の上に表示するX座標の位置調整",                                        context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.014,                      development_value: null, },
      { key: "sp_coordinate_y_size",                name: "盤面の右に表示するY座標の文字サイズ",                                      context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.168,                      development_value: null, },
      { key: "sp_coordinate_y_push",                name: "盤面の右に表示するY座標の位置調整",                                        context_type: "sp_css", type: "String",  sub_type: null,   default_value: -0.009,                     development_value: null, },
      { key: "sp_coordinate_color",                 name: "座標の文字色",                                                             context_type: "sp_css", type: "String",  sub_type: "hsla", default_value: "hsla(0, 0%, 0%, 0.75)",    development_value: null, },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_player_info",                      name: "対局者の情報",                                                             context_type: "sp_var", type: "Hash",    sub_type: null,   default_value: sp_player_info,             development_value: null, },
      { key: "sp_name_direction",                   name: "対局者の名前の向き",                                                       context_type: "sp_var", type: "String",  sub_type: null,   default_value: "horizontal",               development_value: null, },
      { key: "sp_player_name_size",                 name: "対局者の名前の大きさ",                                                     context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.25,                       development_value: null, },
      { key: "sp_player_time_size",                 name: "対局者の持時間の大きさ",                                                   context_type: "sp_css", type: "Float",   sub_type: null,   default_value: 0.25,                       development_value: null, },
      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_body",                             name: "棋譜",                                                                     context_type: "sp_var", type: "String",  sub_type: null,   default_value: "",                         development_value: null, },
      { key: "user_body",                            name: "棋譜",                                                                     context_type: "se_var", type: "String",  sub_type: null,   default_value: "",                         development_value: null, },

      { key: "sp_turn_show",                        name: "手数表示(デバッグ用)",                                                     context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },
      { key: "sp_dev_tools",                        name: "デバッグツール",                                                           context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },
      { key: "sp_dev_tools_group",                  name: "デバッグツールのタブグループ",                                             context_type: "sp_var", type: "String",  sub_type: null,   default_value: "main",                     development_value: "event", },
      { key: "sp_overlay_nav",                      name: "盤上左右クリックで局面変更(再生モード用)",                                 context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },

      { key: "sp_slider",                           name: "スライダー表示",                                                           context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: true, },
      { key: "sp_controller",                       name: "コントローラー表示",                                                       context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: true, },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_legal_move_only",                  name: "操作モード時に駒の移動を制限する",                                         context_type: "sp_var", type: "String",  sub_type: null,   default_value: true,                       development_value: null, },
      { key: "sp_request_checkmate_stat",           name: "操作モード時に詰み判定の結果を着手イベントに含める",                       context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },
      { key: "sp_request_snapshot_hash",            name: "操作モード時に千日手判定用の局面ハッシュを着手イベントに含める",           context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },
      { key: "sp_request_op_king_check",            name: "操作モード時に王手判定結果を着手イベントに含める",                         context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },
      { key: "sp_illegal_validate",                 name: "操作モード時に反則を検知したら着手イベントに含める",                       context_type: "sp_var", type: "String",  sub_type: null,   default_value: true,                       development_value: null, },
      { key: "sp_illegal_cancel",                   name: "操作モード時に反則を検知しても着手イベントに含めずの別イベントを発生する", context_type: "sp_var", type: "String",  sub_type: null,   default_value: false,                      development_value: null, },

      { key: "sp_lift_cancel_action",               name: "盤上の持ち上げた駒のキャンセル方法",                                       context_type: "sp_var", type: "String",  sub_type: null,   default_value: "reality",                  development_value: null, },
      // { key: "sp_click_response_timing",            name: "sp_click_response_timing",                                              context_type: "sp_var", type: "String",  sub_type: null,   default_value: "fast",                     development_value: null, },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "se_bg_pattern",                       name: "背景の裏にチェック模様を置く",                                             context_type: "se_var", type: "String",  sub_type: null,   default_value: true,                       development_value: null, },
      { key: "se_frame_width",                      name: "コンテナ幅",                                                               context_type: "se_css", type: "Float",   sub_type: null,   default_value: 80.0,                       development_value: null, },
      { key: "se_ws_image",                         name: "背景画像",                                                                 context_type: "se_css", type: "String",  sub_type: null,   default_value: null,                       development_value: null, },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "se_ws_color",                         name: "背景色",                                                                   context_type: "se_css", type: "String",  sub_type: "hsla", default_value: "hsla(100, 41%, 80%, 1.0)", development_value: null, },
      { key: "se_ws_blur",                          name: "背景ぼかし",                                                               context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_ws_grayscale",                     name: "背景グレースケール",                                                       context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_ws_contrast",                      name: "背景コントラスト",                                                         context_type: "se_css", type: "Float",   sub_type: null,   default_value: 1.0,                        development_value: null, },
      { key: "se_ws_invert",                        name: "背景色反転",                                                               context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_ws_hue",                           name: "背景色相",                                                                 context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_ws_saturate",                      name: "背景彩度",                                                                 context_type: "se_css", type: "Float",   sub_type: null,   default_value: 1.0,                        development_value: null, },
      { key: "se_ws_brightness",                    name: "背景輝度",                                                                 context_type: "se_css", type: "Float",   sub_type: null,   default_value: 1.0,                        development_value: null, },
      { key: "se_ws_sepia",                         name: "背景セピア調",                                                             context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "se_tf0_mode",                         name: "背景",                                                                     context_type: "se_var", type: "String",  sub_type: null,   default_value: "is_tf0_mode_off",          development_value: null, },
      { key: "se_tf0_perspective",                  name: "背景 - 視点との距離",                                                      context_type: "se_css", type: "Float",   sub_type: null,   default_value: 200,                        development_value: null, },
      { key: "se_tf0_translate_x",                  name: "背景 - 移動 X",                                                            context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf0_translate_y",                  name: "背景 - 移動 Y",                                                            context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf0_translate_z",                  name: "背景 - 移動 Z",                                                            context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf0_rotate_x",                     name: "背景 - 回転 X",                                                            context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.03,                       development_value: null, },
      { key: "se_tf0_rotate_y",                     name: "背景 - 回転 Y",                                                            context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf0_rotate_z",                     name: "背景 - 回転 Z",                                                            context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf0_scale",                        name: "背景 - 拡縮",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 1.0,                        development_value: null, },

      { key: "se_tf1_mode",                         name: "盤",                                                                       context_type: "se_var", type: "String",  sub_type: null,   default_value: "is_tf1_mode_off",          development_value: null, },
      { key: "se_tf1_perspective",                  name: "盤 - 視点との距離",                                                        context_type: "se_css", type: "Float",   sub_type: null,   default_value: 200,                        development_value: null, },
      { key: "se_tf1_translate_x",                  name: "盤 - 移動 X",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf1_translate_y",                  name: "盤 - 移動 Y",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: -55,                        development_value: null, },
      { key: "se_tf1_translate_z",                  name: "盤 - 移動 Z",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf1_rotate_x",                     name: "盤 - 回転 X",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.015,                      development_value: null, },
      { key: "se_tf1_rotate_y",                     name: "盤 - 回転 Y",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf1_rotate_z",                     name: "盤 - 回転 Z",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf1_scale",                        name: "盤 - 拡縮",                                                                context_type: "se_css", type: "Float",   sub_type: null,   default_value: 1.0,                        development_value: null, },

      { key: "se_tf2_mode",                         name: "駒",                                                                       context_type: "se_var", type: "String",  sub_type: null,   default_value: "is_tf2_mode_off",          development_value: null, },
      { key: "se_tf2_perspective",                  name: "駒 - 視点との距離",                                                        context_type: "se_css", type: "Float",   sub_type: null,   default_value: 200,                        development_value: null, },
      { key: "se_tf2_translate_x",                  name: "駒 - 移動 X",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf2_translate_y",                  name: "駒 - 移動 Y",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf2_translate_z",                  name: "駒 - 移動 Z",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf2_rotate_x",                     name: "駒 - 回転 X",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf2_rotate_y",                     name: "駒 - 回転 Y",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf2_rotate_z",                     name: "駒 - 回転 Z",                                                              context_type: "se_css", type: "Float",   sub_type: null,   default_value: 0.0,                        development_value: null, },
      { key: "se_tf2_scale",                        name: "駒 - 拡縮",                                                                context_type: "se_css", type: "Float",   sub_type: null,   default_value: 1.0,                        development_value: null, },
    ]
  }

  static get vue_data_attributes() {
    return this.values.reduce((a, e) => ({...a, [e.key]: e.default_value}), {})
  }

  static get sp_component_attributes_default() {
    let hv = {}
    this.values.forEach(e => {
      if (e.context_type === "sp_var") {
        hv[e.key] = e.default_value
      }
    })
    return hv
  }

  static sp_component_attributes(sp_component_attributes_current) {
    const a = this.sp_component_attributes_default
    const b = sp_component_attributes_current
    const diff = DeepObjectDiff.updatedDiff(a, b)
    const claen_diff = structuredClone(diff)
    return claen_diff
  }

  // 人間向けの見やすい形に変換する
  static css_to_human(css_body) {
    let s = css_body
    s = s.replace(/\s*.Workspace.*/, "")
    s = s.replace(/\s*[{}]\s*/, "")
    s = s.replace(/url\(.*\)/g, "url(XXXXXXXX)")
    s = s.replace(/base64,.*;/, "base64,XXXXXXXX;")
    return s.trim()
  }

  // style に埋めて問題ない形に変換する
  // 以前は "//" コメントを取っていたが、もとから /* */ スタイルで書けばいいのでここでは何もしていない
  static css_normalize(css_body) {
    return css_body
  }

  static hsla_format(v) {
    return chroma(v).css("hsla")
  }

  static float_format(v) {
    return Number.isInteger(v) ? `${v}.0` : `${v}`
  }

  as_string_of(value) {
    if (this.type === "Float") {
      value = this.constructor.float_format(value)
    } else if (this.type === "String") {
      if (this.sub_type === "hsla") {
        value = this.constructor.hsla_format(value)
      }
    }
    return `${value}`
  }

  get default_value_as_str() {
    return this.as_string_of(this.default_value)
  }
}
