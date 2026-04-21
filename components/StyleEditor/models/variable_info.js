import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"
import { GX } from "../../models/gx.js"
import { ColorHelper } from "./color_helper.js"
import _ from "lodash"

const sp_player_info_one_create = () => Object.freeze({
  name: "",
  time: "",
  piece_visibility: "visible",
})

export const sp_player_info_create = () => Object.freeze({
  black: sp_player_info_one_create(),
  white: sp_player_info_one_create(),
})

export class VariableInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "last_selected_category_key",             name: "最後に選択したカテゴリーのキー",                                            group: "geneal",   context_type: "se_var",    type: "String",  sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sidebar_p",                              name: "サイドバーの状態",                                                          group: "geneal",   context_type: "se_class",  type: "Bool",    sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "kifu_book_key",                          name: "棋譜プリセット",                                                            group: "geneal",   context_type: "se_var",    type: "String",  sub_type: null,    default_value: null,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sfen_book_key",                          name: "棋譜プリセット",                                                            group: "geneal",   context_type: "se_var",    type: "String",  sub_type: null,    default_value: null,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "transform_tab_index",                    name: "Transformのタブ位置",                                                       group: "geneal",   context_type: "se_var",    type: "Integer", sub_type: null,    default_value: 0,                        development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "event_show_p",                              name: "簡易確認",                                                              group: "geneal",   context_type: "se_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },

      { key: "user_custom_css",                        name: "カスタムCSS",                                                               group: "geneal",   context_type: "se_var",    type: "Text",    sub_type: null,    default_value: "",                       development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "component_parmas_show_all",              name: "ShogiPlayerのコンポーネント引数確認時にデフォルト値も表示する",             group: "geneal",   context_type: "se_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "AllShowInfo",               },
      { key: "css_params_show_all_sp",                 name: "ShogiPlayerのCSS変数確認時にデフォルト値も表示する",                        group: "geneal",   context_type: "se_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "AllShowInfo",               },
      { key: "css_params_show_all_se",                 name: "スタイルエディタ側のCSS変数確認時にデフォルト値も表示する",                 group: "geneal",   context_type: "se_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "AllShowInfo",               },

      { key: "sp_player_info_black_piece_visibility",  name: "☗の持駒表示",                                                              group: "geneal",   context_type: "virtual",   type: "String",  sub_type: null,    default_value: null,                development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "PieceVisibilityInfo",       },
      { key: "sp_player_info_white_piece_visibility",  name: "☖の持駒表示",                                                              group: "geneal",   context_type: "virtual",   type: "String",  sub_type: null,    default_value: null,                development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "PieceVisibilityInfo",       },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_board_image",                         name: "盤の画像",                                                                  group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: null,    default_value: "none",                   development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_controller_width",                    name: "コントローラー横幅",                                                        group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.5,                      development_value: null, min: 0.0,  max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "sp_controller_width_mobile",             name: "コントローラー横幅(モバイル時)",                                            group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.8,                      development_value: null, min: 0.0,  max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },

      { key: "sp_board_color",                         name: "盤の色",                                                                    group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.2)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_board_even_cell_color",               name: "セルの色(偶数)",                                                            group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.0)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_board_odd_cell_color",                name: "セルの色(奇数)",                                                            group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.0)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      { key: "sp_board_radius",                        name: "盤の角の丸め度合い",                                                        group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 5,                        development_value: null, min: 0.0,    max: 50.0, step: 0.01,  parent_key: null,            relative_model: null,                        },
      { key: "sp_board_padding",                       name: "盤の外周の隙間",                                                            group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.015,                    development_value: null, min: 0.0,    max: 0.05, step: 0.001, parent_key: null,            relative_model: null,                        },
      { key: "sp_board_aspect_ratio",                  name: "盤の比率",                                                                  group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 1.097,                    development_value: null, min: 0.5,    max: 1.5,  step: 0.001, parent_key: null,            relative_model: null,                        },
      { key: "sp_board_horizontal_gap",                name: "盤の左右の隙間(全体横レイアウト時)",         group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,    max: 0.5,  step: 0.01,  parent_key: null,            relative_model: null,                        },
      { key: "sp_board_vertical_gap",                  name: "盤の上下の隙間(全体縦レイアウト時)",         group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,    max: 0.5,  step: 0.01,  parent_key: null,            relative_model: null,                        },

      { key: "sp_board_view_x",                        name: "カメラ左上X",                                                               group: "geneal",   context_type: "sp_var",    type: "Integer", sub_type: null,    default_value: 0,                        development_value: null, min: -9,   max: 9,    step: 1,       parent_key: null,            relative_model: null,                        },
      { key: "sp_board_view_y",                        name: "カメラ左上Y",                                                               group: "geneal",   context_type: "sp_var",    type: "Integer", sub_type: null,    default_value: 0,                        development_value: null, min: -9,   max: 9,    step: 1,       parent_key: null,            relative_model: null,                        },
      { key: "sp_board_view_w",                        name: "カメラ横幅W",                                                               group: "geneal",   context_type: "sp_var",    type: "Integer", sub_type: null,    default_value: 9,                        development_value: null, min: 0,    max: 19,   step: 1,       parent_key: null,            relative_model: null,                        },
      { key: "sp_board_view_h",                        name: "カメラ高さH",                                                               group: "geneal",   context_type: "sp_var",    type: "Integer", sub_type: null,    default_value: 9,                        development_value: null, min: 0,    max: 19,   step: 1,       parent_key: null,            relative_model: null,                        },

      { key: "sp_layout",                              name: "駒台の位置",                                                                group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "horizontal",             development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "LayoutInfo",                },

      { key: "sp_mode",                                name: "モード",                                                                    group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "view",                   development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "ModeInfo",                  },
      { key: "sp_mobile_vertical",                     name: "画面幅が狭いとき自動的に上下配置に切り替える",                              group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },

      // 成り不成り選択
      { key: "sp_promote_select_modal_bg_color",       name: "成り不成り選択画面の背景色",                                                group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.5)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_promote_select_modal_hover_color",    name: "成り不成り選択でhoverした駒の背景色",                                       group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 100% / 0.5)",   development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      // 駒を操作中の移動元
      { key: "sp_mouse_lifted_origin_bg_color",        name: "マウスで持ち上げた駒の移動元セルの背景色",                                  group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.15)",    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_mouse_lifted_origin_opacity",         name: "マウスで持ち上げた駒の移動元駒の不透明度",                                  group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0, max: 1.0, step: 0.001,     parent_key: null,            relative_model: null,                        },

      { key: "sp_balloon",                             name: "対局者名の下に駒数スタイルと同じ背景色を置くか？",                          group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BalloonInfo",               },
      { key: "sp_board_variant_to_stand",                              name: "盤の種類を駒台にも適用するか？",                                            group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },

      //////////////////////////////////////////////////////////////////////////////// 駒
      { key: "sp_piece_variant",                       name: "駒の種類",                                                                  group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "nureyon",                development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "PieceVariantInfo",          },
      { key: "sp_piece_vertical_position",             name: "駒テクスチャを貼る縦の位置",                                                group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: null,    default_value: "center",                 development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "PieceVerticalPositionInfo", },

      { key: "sp_board_piece_size",                    name: "盤上の駒の大きさ",                                                          group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.9,                      development_value: null, min: 0, max: 1.0, step: 0.001,       parent_key: null,            relative_model: null,                        },

      { key: "sp_stand_cell_size",                     name: "駒台のセルサイズ",                                                          group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 1.0 / 10,                 development_value: null, min: 0, max: 1.0, step: 0.0001,      parent_key: null,            relative_model: null,                        },
      { key: "sp_stand_piece_size",                    name: "駒台の駒の大きさ",                                                          group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.8,                      development_value: null, min: 0, max: 1.0, step: 0.01,        parent_key: null,            relative_model: null,                        },

      { key: "sp_piece_box_cell_size",                 name: "駒箱のセルサイズ",                                                          group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 1.0 / 10,                 development_value: null, min: 0, max: 1.0, step: 0.0001,      parent_key: null,            relative_model: null,                        },
      { key: "sp_piece_box_piece_size",                name: "駒箱の駒の大きさ",                                                          group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.8,                      development_value: null, min: 0, max: 1.0, step: 0.01,        parent_key: null,            relative_model: null,                        },

      //////////////////////////////////////////////////////////////////////////////// 駒台
      { key: "sp_stand_hover_border_color",            name: "駒を持ったマウスに反応した駒台や駒箱のボーダー色",                          group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.2)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_stand_bg_color",                      name: "駒台の背景色",                                                              group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.0)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_stand_gravity",                       name: "駒台を左右に配置したとき縦位置",                                            group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "bottom",                 development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "StandGravityInfo",          },
      { key: "sp_stand_flip",                          name: "相手側を反転するか？",                                                      group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "StandFlipInfo",             },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_turn",                                name: "表示する局面の手数",                                                        group: "geneal",   context_type: "sp_var",    type: "Integer", sub_type: null,    default_value: -1,                       development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_viewpoint",                           name: "視点",                                                                      group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "black",                  development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "Location",                  },
      { key: "sp_debug",                               name: "デバッグモード",                                                            group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_piece_count_horizontal_x",            name: "駒数のX座標 (左右配置時)",                                                  group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.43,                     development_value: null, min: -1.0, max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "sp_piece_count_horizontal_y",            name: "駒数のY座標 (左右配置時)",                                                  group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.30,                     development_value: null, min: -1.0, max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "sp_piece_count_vertical_x",              name: "駒数のX座標 (上下配置時)",                                                  group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.00,                     development_value: null, min: -1.0, max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "sp_piece_count_vertical_y",              name: "駒数のY座標 (上下配置時)",                                                  group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.47,                     development_value: null, min: -1.0, max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },

      { key: "sp_piece_count_padding",                 name: "駒数のパディング",                                                          group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.08,                     development_value: null, min: 0.0,  max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "sp_piece_count_bg_color",                name: "駒数の背景色",                                                              group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 100% / 0.9)",   development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_piece_count_size",                    name: "駒数の大きさ",                                                              group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.2,                      development_value: null, min: 0.0,  max: 1.0,  step: 0.01,    parent_key: null,            relative_model: null,                        },
      { key: "sp_piece_count_font_color",              name: "駒数の色",                                                                  group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: null,    default_value: "hsl(0 0% 0% / 0.75)",    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      { key: "sp_piece_count_border_width",            name: "駒数の外枠の太さ",                                                          group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,  max: 5.0,  step: 0.5,     parent_key: null,            relative_model: null,                        },
      { key: "sp_piece_count_border_color",            name: "駒数の外枠の色",                                                            group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: null,    default_value: "hsl(0 0% 0% / 0.1)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_board_variant",                       name: "盤の種類",                                                                  group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "none",                   development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BoardVariantInfo",          },

      { key: "sp_grid_inner_stroke",                   name: "盤の内側の格子の太さ",                                                      group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 1,                        development_value: null, min: 0, max: 10, step: 0.5,          parent_key: null,            relative_model: null,                        },
      { key: "sp_grid_outer_stroke",                   name: "盤の格子の外枠の太さ",                                                      group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0, max: 10, step: 0.5,          parent_key: null,            relative_model: null,                        },
      { key: "sp_board_edge_stroke",                   name: "盤のエッジの縁取りの太さ",                                                  group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0, max: 10, step: 0.5,          parent_key: null,            relative_model: null,                        },
      { key: "sp_grid_inner_color",                    name: "盤の内側の格子の色",                                                        group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.5)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_grid_outer_color",                    name: "盤の外枠の色",                                                              group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.5)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      { key: "sp_star_size",                           name: "星の大きさ",                                                                group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.1,                      development_value: null, min: 0, max: 1.0, step: 0.001,       parent_key: null,            relative_model: null,                        },
      { key: "sp_star_step",                           name: "星の配置間隔",                                                              group: "geneal",   context_type: "sp_var",    type: "Integer", sub_type: null,    default_value: 3,                        development_value: null, min: 0, max: 10,  step: 1,           parent_key: null,            relative_model: null,                        },
      { key: "sp_star_z_index",                        name: "星の z-index",                                                              group: "geneal",   context_type: "sp_css",    type: "Integer", sub_type: null,    default_value: 0,                        development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "StarZIndexInfo",            },

      { key: "sp_piece_box_color",                     name: "駒箱の色",                                                                  group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.2)",     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      { key: "sp_location_mark_active_size",           name: "手番のときの☗☖の大きさ",                                                    group: "geneal",   context_type: "sp_css",    type: "Float",     sub_type: null,    default_value: 1.0,                    development_value: null, min: 0, max: 1.5, step: 0.01,        parent_key: null,            relative_model: null,                        },
      { key: "sp_location_mark_inactive_size",         name: "手番ではないときの☗☖の大きさ",                                              group: "geneal",   context_type: "sp_css",    type: "Float",     sub_type: null,    default_value: 1.0,                    development_value: null, min: 0, max: 1.5, step: 0.01,        parent_key: null,            relative_model: null,                        },

      { key: "sp_comment",                             name: "棋譜コメント表示",                                                          group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_common_gap",                          name: "共通の隙間",                                                                group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.02,                     development_value: null, min: 0,    max: 0.1,  step: 0.0001,  parent_key: null,            relative_model: null,                        },
      { key: "sp_layer",                               name: "レイヤー表示",                                                              group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },

      //////////////////////////////////////////////////////////////////////////////// 座標
      { key: "sp_coordinate",                          name: "座標表示",                                                                  group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "CoordinateInfo",            },
      { key: "sp_coordinate_variant_h",                name: "座標の種類(X)",                                                             group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "number",                 development_value: null, min: null, max: null, step: null,    parent_key: "sp_coordinate", relative_model: "CoordinateVariantInfo",     },
      { key: "sp_coordinate_variant_v",                name: "座標の種類(Y)",                                                             group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "kanji",                  development_value: null, min: null, max: null, step: null,    parent_key: "sp_coordinate", relative_model: "CoordinateVariantInfo",     },
      { key: "sp_coordinate_x_size",                   name: "盤面の上に表示するX座標の文字サイズ",                                       group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.128,                    development_value: null, min: 0.0,  max: 1.0,  step: 0.001,   parent_key: "sp_coordinate", relative_model: null,                        },
      { key: "sp_coordinate_x_push",                   name: "盤面の上に表示するX座標の位置調整",                                         group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.038,                    development_value: null, min: -0.5, max: 0.5,  step: 0.001,   parent_key: "sp_coordinate", relative_model: null,                        },
      { key: "sp_coordinate_y_size",                   name: "盤面の右に表示するY座標の文字サイズ",                                       group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.128,                    development_value: null, min: 0.0,  max: 1.0,  step: 0.001,   parent_key: "sp_coordinate", relative_model: null,                        },
      { key: "sp_coordinate_y_push",                   name: "盤面の右に表示するY座標の位置調整",                                         group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.041,                    development_value: null, min: -0.5, max: 0.5,  step: 0.001,   parent_key: "sp_coordinate", relative_model: null,                        },
      { key: "sp_coordinate_color",                    name: "座標の文字色",                                                              group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 0% 0% / 0.75)",    development_value: null, min: null, max: null, step: null,    parent_key: "sp_coordinate", relative_model: null,                        },

      //////////////////////////////////////////////////////////////////////////////// 印共通

      { key: "sp_general_mark_base_color",        name: "基本色",         group: "geneal",   context_type: "sp_css",    type: "String",  sub_type: "color", default_value: "hsl(0 56% 58% / 0.8)", development_value: null, min: null, max: null, step: null,    parent_key: null, relative_model: null,                        },
      { key: "se_current_user_name",              name: "所有者の名前",   group: "geneal",   context_type: "se_var",    type: "String",  sub_type: null,    default_value: "(name)",                 development_value: null, min: null, max: null,   step: null,    parent_key: null, relative_model: null,                        },
      { key: "se_current_color_index",            name: "所有者の色番号", group: "geneal",   context_type: "se_var",    type: "Integer", sub_type: null,    default_value: 0,                        development_value: null, min: 0,    max: 9 - 1,  step: 1,       parent_key: null, relative_model: null,                        }, // SP_GENERAL_MARK_PALETTE_COUNT

      //////////////////////////////////////////////////////////////////////////////// 思考印

      { key: "think_mark_collection_json_text",   name: "思考印の確認用初期データ",   group: "geneal",   context_type: "se_var",    type: "Text",    sub_type: null,    default_value: "[]",                     development_value: null, min: null, max: null,   step: null,    parent_key: null, relative_model: null,                        },
      { key: "sp_think_mark_variant",             name: "思考印の種類",               group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "circle",                 development_value: null, min: null, max: null,   step: null,    parent_key: null, relative_model: "ThinkMarkVariantInfo",      },
      { key: "sp_think_mark_collection",          name: "思考印",                     group: "geneal",   context_type: "sp_var",    type: "Array",   sub_type: null,    default_value: [],                       development_value: null, min: null, max: null,   step: null,    parent_key: null, relative_model: null,                        },
      { key: "sp_think_mark_circle_stroke_width", name: "思考印の太さ",               group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.08,                     development_value: null, min: 0.0,  max: 0.2,    step: 0.001,   parent_key: null, relative_model: null,                        },
      { key: "sp_think_mark_circle_size",         name: "思考印のサイズ",             group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.85,                     development_value: null, min: 0.0,  max: 1.0,    step: 0.01,    parent_key: null, relative_model: null,                        },

      //////////////////////////////////////////////////////////////////////////////// 移動元印

      { key: "origin_mark_collection_json_text",   name: "移動元印の確認用初期データ", group: "geneal",   context_type: "se_var",    type: "Text",    sub_type: null,    default_value: "[]",                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_origin_mark_variant",             name: "移動元印の種類",             group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "square",                 development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "OriginMarkVariantInfo",               },
      { key: "sp_origin_mark_collection",          name: "移動元印",                   group: "geneal",   context_type: "sp_var",    type: "Array",   sub_type: null,    default_value: [],                       development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_origin_mark_square_stroke_width", name: "移動元印の太さ",             group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.06,                     development_value: null, min: 0.0,  max: 0.2,    step: 0.001,   parent_key: null, relative_model: null,                        },
      { key: "sp_origin_mark_square_size",         name: "移動元のサイズ",             group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 1.0,                      development_value: null, min: 0.0,  max: 1.0,    step: 0.01,    parent_key: null, relative_model: null,                        },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_player_info",                         name: "対局者の情報",                                                              group: "geneal",   context_type: "sp_var",    type: "Hash",    sub_type: null,    default_value: sp_player_info_create(),  development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_name_direction",                      name: "対局者の名前の向き",                                                        group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "horizontal",             development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "NameDirectionInfo",         },
      { key: "sp_player_name_size",                    name: "対局者の名前の大きさ",                                                      group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.25,                     development_value: null, min:    0, max:  0.5, step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "sp_player_time_size",                    name: "対局者の持時間の大きさ",                                                    group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.25,                     development_value: null, min:    0, max:  0.5, step: 0.001,   parent_key: null,            relative_model: null,                        },

      //////////////////////////////////////////////////////////////////////////////// 余白

      { key: "sp_membership_horizontal_gap",           name: "盤外要素の縦並びの隙間(全体横レイアウト時)", group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,    max: 0.5,  step: 0.01,  parent_key: null,            relative_model: null,                        },
      { key: "sp_membership_vertical_gap",             name: "盤外要素の横並びの隙間(全体縦レイアウト時)", group: "geneal",   context_type: "sp_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,    max: 0.5,  step: 0.01,  parent_key: null,            relative_model: null,                        },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_body",                                name: "棋譜",                                                                      group: "geneal",   context_type: "sp_var",    type: "Text",    sub_type: null,    default_value: "",                       development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "user_body",                              name: "棋譜",                                                                      group: "geneal",   context_type: "se_var",    type: "Text",    sub_type: null,    default_value: "",                       development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      { key: "sp_turn_show",                           name: "手数表示(デバッグ用)",                                                      group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_dev_tools",                           name: "デバッグツール",                                                            group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_dev_tools_group",                     name: "デバッグツールのタブグループ",                                              group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "main",                   development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "sp_overlay_nav",                         name: "盤上左右クリックで局面変更(再生モード用)",                                  group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },

      { key: "sp_slider",                              name: "スライダー表示",                                                            group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_controller",                          name: "コントローラー表示",                                                        group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_resize_observer_feature",             name: "リサイズ監視",                                                                  group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_resize_observer_threshold",           name: "リサイズ変動閾値",                                                              group: "geneal",   context_type: "sp_var",    type: "Integer", sub_type: null,    default_value: 2,                        development_value: null, min: 0,    max: 10,   step: 1,       parent_key: null,            relative_model: null,                        },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_legal_move_only",                     name: "操作モード時に駒の移動を制限する",                                          group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_request_checkmate_stat",              name: "操作モード時に詰み判定の結果を着手イベントに含める",                        group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "RequestCheckmateStatInfo",  },
      { key: "sp_request_position_hash",               name: "操作モード時に千日手判定用の局面ハッシュを着手イベントに含める",            group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_request_op_king_check",               name: "操作モード時に王手判定結果を着手イベントに含める",                          group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_illegal_validate",                    name: "操作モード時に反則を検知したら着手イベントに含める",                        group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "sp_illegal_cancel",                      name: "操作モード時に反則を検知しても着手イベントに含めずの別イベントを発生する",  group: "geneal",   context_type: "sp_var",    type: "Bool",    sub_type: null,    default_value: false,                    development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },

      { key: "sp_lift_cancel_action",                  name: "盤上の持ち上げた駒のキャンセル方法",                                        group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "standard",               development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "LiftCancelActionInfo",      },
      // { key: "sp_click_response_timing",            name: "sp_click_response_timing",                                                  group: "geneal",   context_type: "sp_var",    type: "String",  sub_type: null,    default_value: "fast",                   development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "se_checkerboard_p",                      name: "背景の裏にチェック模様を置く",                                              group: "geneal",   context_type: "se_var",    type: "Bool",    sub_type: null,    default_value: true,                     development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "se_frame_width",                         name: "コンテナ幅",                                                                group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 0.8,                      development_value: null, min: 0.0,  max: 1.0,  step: 0.0001,  parent_key: null,            relative_model: null,                        },
      { key: "se_ws_image",                            name: "背景画像",                                                                  group: "geneal",   context_type: "se_css",    type: "String",  sub_type: null,    default_value: "none",                   development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "se_ws_color",                            name: "背景色",                                                                    group: "geneal",   context_type: "se_css",    type: "String",  sub_type: "color", default_value: "hsl(100 41% 80% / 1.0)", development_value: null, min: null, max: null, step: null,    parent_key: null,            relative_model: null,                        },
      { key: "se_ws_blur",                             name: "背景ぼかし",                                                                group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,  max: 30.0, step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "se_ws_grayscale",                        name: "背景グレースケール",                                                        group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,  max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "se_ws_contrast",                         name: "背景コントラスト",                                                          group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 1.0,                      development_value: null, min: 0.0,  max: 2.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "se_ws_invert",                           name: "背景色反転",                                                                group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,  max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "se_ws_hue",                              name: "背景色相",                                                                  group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: -0.5, max: 0.5,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "se_ws_saturate",                         name: "背景彩度",                                                                  group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 1.0,                      development_value: null, min: 0.0,  max: 2.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "se_ws_brightness",                       name: "背景輝度",                                                                  group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 1.0,                      development_value: null, min: 0.0,  max: 2.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },
      { key: "se_ws_sepia",                            name: "背景セピア調",                                                              group: "geneal",   context_type: "se_css",    type: "Float",   sub_type: null,    default_value: 0.0,                      development_value: null, min: 0.0,  max: 1.0,  step: 0.001,   parent_key: null,            relative_model: null,                        },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "se_tf_board_p",                          name: "盤",                                                                        group: "geneal",   context_type: "se_class",  type: "Bool",  sub_type: null,    default_value: false,                      development_value: null, min: null,  max: null, step: null,   parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "se_tf_board_perspective",                name: "盤 - 視点との距離",                                                         group: "tf_board", context_type: "se_css",    type: "Float", sub_type: null,    default_value: 1200,                       development_value: null, min: 0,     max: 2000, step: 1,      parent_key: "se_tf_board_p", relative_model: null,                        },
      { key: "se_tf_board_scale",                      name: "盤 - スケール",                                                             group: "tf_board", context_type: "se_css",    type: "Float", sub_type: null,    default_value: 1.0,                        development_value: null, min: 0,     max:  2.0, step: 0.001,  parent_key: "se_tf_board_p", relative_model: null,                        },
      { key: "se_tf_board_rotate_x",                   name: "盤 - 回転 X",                                                               group: "tf_board", context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.02,                       development_value: null, min: -0.25, max: 0.25, step: 0.001,  parent_key: "se_tf_board_p", relative_model: null,                        },
      { key: "se_tf_board_rotate_y",                   name: "盤 - 回転 Y",                                                               group: "tf_board", context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.0,                        development_value: null, min: -0.25, max: 0.25, step: 0.001,  parent_key: "se_tf_board_p", relative_model: null,                        },
      { key: "se_tf_board_rotate_z",                   name: "盤 - 回転 Z",                                                               group: "tf_board", context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.0,                        development_value: null, min: -0.5,  max:  0.5, step: 0.001,  parent_key: "se_tf_board_p", relative_model: null,                        },
      { key: "se_tf_board_translate_x",                name: "盤 - 移動 X",                                                               group: "tf_board", context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.0,                        development_value: null, min: -0.5,  max:  0.5, step: 0.001,  parent_key: "se_tf_board_p", relative_model: null,                        },
      { key: "se_tf_board_translate_y",                name: "盤 - 移動 Y",                                                               group: "tf_board", context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.0,                        development_value: null, min: -0.5,  max:  0.5, step: 0.001,  parent_key: "se_tf_board_p", relative_model: null,                        },
      { key: "se_tf_board_translate_z",                name: "盤 - 移動 Z",                                                               group: "tf_board", context_type: "se_css",    type: "Float", sub_type: null,    default_value: -50,                        development_value: null, min: -2000, max:    0, step: 1,      parent_key: "se_tf_board_p", relative_model: null,                        },

      { key: "se_tf_piece_p",                          name: "駒",                                                                        group: "geneal",   context_type: "se_class",  type: "Bool",  sub_type: null,    default_value: false,                      development_value: null, min: null,  max: null, step: null,   parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "se_tf_piece_perspective",                name: "駒 - 視点との距離",                                                         group: "tf_piece", context_type: "se_css",    type: "Float", sub_type: null,    default_value:     75,                     development_value: null, min: 0,     max:  150, step: 1,      parent_key: "se_tf_piece_p", relative_model: null,                        },
      { key: "se_tf_piece_scale",                      name: "駒 - スケール",                                                             group: "tf_piece", context_type: "se_css",    type: "Float", sub_type: null,    default_value:    1.0,                     development_value: null, min: 0,     max:  2.0, step: 0.001,  parent_key: "se_tf_piece_p", relative_model: null,                        },
      { key: "se_tf_piece_rotate_x",                   name: "駒 - 回転 X",                                                               group: "tf_piece", context_type: "se_css",    type: "Float", sub_type: null,    default_value:  -0.09,                     development_value: null, min: -0.25, max: 0.25, step: 0.001,  parent_key: "se_tf_piece_p", relative_model: null,                        },
      { key: "se_tf_piece_rotate_y",                   name: "駒 - 回転 Y",                                                               group: "tf_piece", context_type: "se_css",    type: "Float", sub_type: null,    default_value:    0.0,                     development_value: null, min: -0.25, max: 0.25, step: 0.001,  parent_key: "se_tf_piece_p", relative_model: null,                        },
      { key: "se_tf_piece_rotate_z",                   name: "駒 - 回転 Z",                                                               group: "tf_piece", context_type: "se_css",    type: "Float", sub_type: null,    default_value:    0.0,                     development_value: null, min: -0.5,  max:  0.5, step: 0.001,  parent_key: "se_tf_piece_p", relative_model: null,                        },
      { key: "se_tf_piece_translate_x",                name: "駒 - 移動 X",                                                               group: "tf_piece", context_type: "se_css",    type: "Float", sub_type: null,    default_value:    0.0,                     development_value: null, min: -0.5,  max:  0.5, step: 0.001,  parent_key: "se_tf_piece_p", relative_model: null,                        },
      { key: "se_tf_piece_translate_y",                name: "駒 - 移動 Y",                                                               group: "tf_piece", context_type: "se_css",    type: "Float", sub_type: null,    default_value:    0.1,                     development_value: null, min: -0.5,  max:  0.5, step: 0.001,  parent_key: "se_tf_piece_p", relative_model: null,                        },
      { key: "se_tf_piece_translate_z",                name: "駒 - 移動 Z",                                                               group: "tf_piece", context_type: "se_css",    type: "Float", sub_type: null,    default_value:    0.0,                     development_value: null, min: -100,  max:  100, step: 0.001,  parent_key: "se_tf_piece_p", relative_model: null,                        },

      { key: "se_tf_wall_p",                           name: "背景",                                                                      group: "geneal",   context_type: "se_class",  type: "Bool",  sub_type: null,    default_value: false,                      development_value: null, min: null,  max: null, step: null,   parent_key: null,            relative_model: "BinaryInfo",                },
      { key: "se_tf_wall_perspective",                 name: "背景 - 視点との距離",                                                       group: "tf_wall",  context_type: "se_css",    type: "Float", sub_type: null,    default_value: 1200,                       development_value: null, min: 0,     max: 2000, step: 1,      parent_key: "se_tf_wall_p",  relative_model: null,                        },
      { key: "se_tf_wall_scale",                       name: "背景 - スケール",                                                           group: "tf_wall",  context_type: "se_css",    type: "Float", sub_type: null,    default_value: 1.0,                        development_value: null, min: 0,     max:  2.0, step: 0.001,  parent_key: "se_tf_wall_p",  relative_model: null,                        },
      { key: "se_tf_wall_rotate_x",                    name: "背景 - 回転 X",                                                             group: "tf_wall",  context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.04,                       development_value: null, min: -0.25, max: 0.25, step: 0.001,  parent_key: "se_tf_wall_p",  relative_model: null,                        },
      { key: "se_tf_wall_rotate_y",                    name: "背景 - 回転 Y",                                                             group: "tf_wall",  context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.0,                        development_value: null, min: -0.25, max: 0.25, step: 0.001,  parent_key: "se_tf_wall_p",  relative_model: null,                        },
      { key: "se_tf_wall_rotate_z",                    name: "背景 - 回転 Z",                                                             group: "tf_wall",  context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.0,                        development_value: null, min: -0.5,  max:  0.5, step: 0.001,  parent_key: "se_tf_wall_p",  relative_model: null,                        },
      { key: "se_tf_wall_translate_x",                 name: "背景 - 移動 X",                                                             group: "tf_wall",  context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.0,                        development_value: null, min: -0.5,  max:  0.5, step: 1,      parent_key: "se_tf_wall_p",  relative_model: null,                        },
      { key: "se_tf_wall_translate_y",                 name: "背景 - 移動 Y",                                                             group: "tf_wall",  context_type: "se_css",    type: "Float", sub_type: null,    default_value: 0.0,                        development_value: null, min: -0.5,  max:  0.5, step: 1,      parent_key: "se_tf_wall_p",  relative_model: null,                        },
      { key: "se_tf_wall_translate_z",                 name: "背景 - 移動 Z",                                                             group: "tf_wall",  context_type: "se_css",    type: "Float", sub_type: null,    default_value: -400,                       development_value: null, min: -2000, max:    0, step: 1,      parent_key: "se_tf_wall_p",  relative_model: null,                        },
    ]
  }

  // Hash を含んでいるため deep clone (structuredClone) が必要になる
  // deep clone していないとデフォルト値を書き換えてしまって「対局者名」が正しくでなくなる
  static vue_define_attributes() {
    const values = this.values.filter(e => (e.context_type !== "virtual"))
    return values.reduce((a, e) => ({...a, [e.key]: e.default_value_clone}), {})
  }

  static get sp_component_bind_attrs_default() {
    let hv = {}
    this.values.forEach(e => {
      if (e.context_type === "sp_var") {
        hv[e.key] = e.default_value
      }
    })
    return hv
  }

  // 差分だけを返す
  // 引数の all_attrs から初期値を除いた状態にして返す
  static default_value_reject(all_attrs) {
    const attrs_default = this.sp_component_bind_attrs_default
    const hv = {}
    _.each(all_attrs, (value, key) => {
      let a = attrs_default[key]
      let b = value
      if (true) {
        a = structuredClone(a)
        b = structuredClone(b)
      }
      if (JSON.stringify(a) === JSON.stringify(b)) {
      } else {
        hv[key] = b
      }
    })
    return hv
  }

  static float_format(v) {
    return Number.isInteger(v) ? `${v}.0` : `${v}`
  }

  as_string_of(value) {
    if (value == null) {
      value = ""
    } else if (this.type === "Float") {
      value = this.constructor.float_format(value)
    } else if (this.type === "String") {
      if (this.sub_type === "color") {
        value = ColorHelper.normalize(value) // hsl(a b c / d) 形式に変換する意味で使っている
      }
    } else if (this.type === "Text") {
      value = value.trim()
    }
    return `${value}`
  }

  get default_value_as_str() {
    return this.as_string_of(this.default_value)
  }

  // 更新しても問題ないデフォルト値を返す
  get default_value_clone() {
    return structuredClone(this.default_value)
  }

  native_value_from(str) {
    if (str == null) {
      return null
    }
    let v = null
    if (false) {
    } else if (this.type === "String") {
      v = str.trim()
    } else if (this.type === "Text") {
      v = str.trim()
    } else if (this.type === "Bool") {
      v = (str === "true")
    } else if (this.type === "Hash" || this.type === "Array") {
      v = JSON5.parse(str)
    } else if (this.type === "Float") {
      v = parseFloat(str)
    } else if (this.type === "Integer") {
      v = parseInt(str)
    } else {
      throw new Error("must not happen")
    }
    return v
  }

  get parent_info() {
    return this.constructor.fetch_if(this.parent_key)
  }

  get slider_options() {
    return { min: this.min, max: this.max, step: this.step }
  }
}
