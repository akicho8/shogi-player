const DEVELOPMENT_P = process.env.NODE_ENV === "development"

import { ApplicationMemoryRecord } from "../models/application_memory_record.js"

export class SeVariableInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "kifu_sample_key", default: null, },
      { key: "transform_tab_index", default: 0, },

      { key: "user_custom_css", default: DEVELOPMENT_P ? ".BoardTexture, .PieceObject { filter: drop-shadow(4px 4px 4px hsla(0 0% 0% / 0.5)) }" : "", },

      ////////////////////////////////////////////////////////////////////////////////
      { key: "se_frame_width", default: 80, },
      { key: "se_ws_image", default: null, },
      { key: "se_bg_pattern", default: true, },
      { key: "sp_board_image", default: null, },
      { key: "sp_controller_width", default:        0.5, },
      { key: "sp_controller_width_mobile", default: 0.8, },

      { key: "se_ws_color", default: "hsl(100, 41%, 80%)", },
      { key: "se_ws_blur", default: 0, },
      { key: "se_ws_grayscale", default: 0, },
      { key: "se_ws_contrast", default: 1.0, },
      { key: "se_ws_invert", default: 0, },
      { key: "se_ws_hue", default:        0, },
      { key: "se_ws_saturate", default:   1.0, },
      { key: "se_ws_saturate2", default:   0, },
      { key: "se_ws_brightness", default: 1.0, },
      { key: "se_ws_sepia", default: 0, },

      { key: "sp_board_color", default:           "hsla(0, 0%, 0%, 0.2)", },
      { key: "sp_board_even_cell_color", default: "hsla(0, 0%, 0%, 0.0)", },
      { key: "sp_board_odd_cell_color", default: "hsla(0, 0%, 0%, 0.0)", },

      { key: "sp_board_horizontal_gap", default: 0, },
      { key: "sp_board_vertical_gap", default: 0, },
      { key: "sp_board_aspect_ratio", default: 1.097, },
      { key: "sp_board_piece_size", default: 0.9, },
      { key: "sp_board_piece_position", default: "center", },
      { key: "sp_board_radius", default: 5, },
      { key: "sp_board_padding", default: 0.015, },

      { key: "sp_board_dimension_w", default: 9, },
      { key: "sp_board_dimension_h", default: 9, },
      { key: "sp_layout", default: "horizontal", },
      { key: "sp_mode", default: DEVELOPMENT_P ? "view" : "view", },
      { key: "sp_mobile_vertical", default: true, },

      // 成り不成り選択
      { key: "sp_promote_select_modal_bg_color", default: "hsla(0, 0%, 0%, 0.5)", },
      { key: "sp_promote_select_modal_hover_color", default: "hsla(0, 0%, 100%, 0.5)", },

      // 駒を操作中の移動元スタイル
      { key: "sp_mouse_lifted_origin_bg_color", default: "hsla(0, 0%, 0%, 0.15)", },
      { key: "sp_mouse_lifted_origin_opacity", default: 0.0, },

      { key: "sp_balloon", default: true, },

      //////////////////////////////////////////////////////////////////////////////// 駒台
      { key: "sp_stand_piece_size", default: 0.8, },
      { key: "sp_stand_hover_border_color", default: "hsla(0, 0%, 0%, 0.2)", },
      { key: "sp_stand_bg_color", default: "hsla(0, 0%, 0%, 0.0)", },
      { key: "sp_stand_gravity", default: DEVELOPMENT_P ? "top" : "bottom", },
      { key: "sp_stand_flip", default: DEVELOPMENT_P ? true : false, },

      { key: "sp_turn", default: -1, },
      { key: "sp_viewpoint", default: DEVELOPMENT_P ? "white" : "black", },
      { key: "sp_debug", default: DEVELOPMENT_P ? false : false, },
      { key: "sp_piece_count_size", default: 0.2, },
      { key: "sp_piece_count_font_color", default:  "hsla(0, 0%, 0%, 0.75)", },
      { key: "sp_piece_count_bg_color", default: "hsla(0, 0%, 100%, 0.9)", },
      { key: "sp_piece_count_padding", default: 0.08, },

      { key: "sp_piece_count_horizontal_x", default: 0.43, },
      { key: "sp_piece_count_horizontal_y", default: 0.30, },
      { key: "sp_piece_count_vertical_x", default:   0.00, },
      { key: "sp_piece_count_vertical_y", default:   0.47, },

      { key: "sp_board_edge_stroke", default: 0, },
      { key: "sp_grid_outer_stroke", default: 0, },
      { key: "sp_grid_outer_color", default: "hsla(0, 0%, 0%, 0.5)", },
      { key: "sp_grid_inner_color", default: "hsla(0, 0%, 0%, 0.5)", },
      { key: "sp_grid_inner_stroke", default: 1, },
      { key: "sp_star_size", default: 0.1, },
      { key: "sp_star_z_index", default: 0, },

      { key: "sp_piece_box_color", default: "hsla(0, 0%, 0%, 0.2)", },
      { key: "sp_piece_box_piece_size", default: 0.8, },

      { key: "sp_location_mark_active_size", default: 1.0, },
      { key: "sp_location_mark_inactive_size", default: 0.5, },

      { key: "sp_comment", default: false, },
      { key: "sp_common_gap", default: 0.02, },
      { key: "sp_layer", default: DEVELOPMENT_P ? true : false, },
      { key: "sp_piece_variant", default: "nureyon",    },
      { key: "sp_board_variant", default: "none",  },

      //////////////////////////////////////////////////////////////////////////////// 座標
      { key: "sp_coordinate", default: DEVELOPMENT_P ? true : false, },
      { key: "sp_coordinate_variant_v", default: DEVELOPMENT_P ? "alphabet" : "kanji", },
      { key: "sp_coordinate_x_size", default: 0.125, },
      { key: "sp_coordinate_y_size", default: 0.168, },
      { key: "sp_coordinate_x_push", default: 0.014, },
      { key: "sp_coordinate_y_push", default: -0.009, },
      { key: "sp_coordinate_color", default: "hsla(0, 0%, 0%, 0.75)", },

      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_player_info", default: { black: { name: "先手", time: "", }, white: { name: "後手", time: "", },}, },
      { key: "sp_name_direction", default: DEVELOPMENT_P ? "vertical" : "horizontal", },
      { key: "sp_player_name_size", default: 0.25, },
      { key: "sp_player_time_size", default: 0.25, },
      ////////////////////////////////////////////////////////////////////////////////

      { key: "sp_body", default: null, },

      { key: "sp_turn_show", default:    DEVELOPMENT_P ? true : false, },
      { key: "sp_dev_tools", default:    DEVELOPMENT_P ? false : false, },

      { key: "sp_slider", default:     DEVELOPMENT_P ? true : true, },
      { key: "sp_controller", default: DEVELOPMENT_P ? true : false, },
      { key: "sp_legal_move_only", default: false, },
      { key: "sp_illegal_validate", default: false, },
      { key: "sp_lift_cancel_action", default: "reality", },

      { key: "se_tf0_mode", default: "is_tf0_mode_off", },
      { key: "se_tf0_perspective", default: 200, },
      { key: "se_tf0_translate_x", default: 0, },
      { key: "se_tf0_translate_y", default: 0, },
      { key: "se_tf0_translate_z", default: 0, },
      { key: "se_tf0_rotate_x", default: 0.03, },
      { key: "se_tf0_rotate_y", default: 0, },
      { key: "se_tf0_rotate_z", default: 0, },
      { key: "se_tf0_scale", default: 1.0, },

      { key: "se_tf1_mode", default: "is_tf1_mode_off", },
      { key: "se_tf1_perspective", default: 200, },
      { key: "se_tf1_translate_x", default: 0, },
      { key: "se_tf1_translate_y", default: -55, },
      { key: "se_tf1_translate_z", default: 0, },
      { key: "se_tf1_rotate_x", default: 0.015, },
      { key: "se_tf1_rotate_y", default: 0, },
      { key: "se_tf1_rotate_z", default: 0, },
      { key: "se_tf1_scale", default: 1.0, },

      { key: "se_tf2_mode", default: "is_tf2_mode_off", },
      { key: "se_tf2_perspective", default: 200, },
      { key: "se_tf2_translate_x", default: 0, },
      { key: "se_tf2_translate_y", default: 0, },
      { key: "se_tf2_translate_z", default: 0, },
      { key: "se_tf2_rotate_x", default: 0, },
      { key: "se_tf2_rotate_y", default: 0, },
      { key: "se_tf2_rotate_z", default: 0, },
      { key: "se_tf2_scale", default: 1.0, },
    ]
  }

  static get data_all() {
    return this.values.reduce((a, e) => ({...a, [e.key]: e.default}), {})
  }
}
