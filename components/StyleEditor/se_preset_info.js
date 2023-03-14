import { ApplicationMemoryRecord } from "../models/application_memory_record.js"

export class SePresetInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      {
        key: "default",
        key: "初期値",
        func: context => {
          context.SeVariableInfo.values.forEach(e => {
            context.$data[e.key] = e.default
          })
          context.data_init()
        }
      },
      {
        key: "paper",
        key: "紙面風",
        func: context => {
          context.se_ws_color                    = "rgb(255,255,255)" // 背景

          context.sp_piece_variant               = "paper"            // 紙面風駒
          context.sp_board_radius                = 0                  // 角を丸くしない
          context.sp_board_padding               = 0                  // 隙間なし
          context.sp_board_color                 = "rgb(255,255,255)" // 盤透過
          context.sp_board_even_cell_color       = "hsla(0, 0%, 0%, 0.0)"
          context.sp_board_odd_cell_color        = "hsla(0, 0%, 0%, 0.0)"

          context.sp_grid_inner_stroke           = 1                  // グリッド線(細)
          context.sp_grid_outer_stroke           = 2                  // グリッド枠(太)
          context.sp_board_edge_stroke           = 0
          context.sp_stand_gravity               = "top"              // 駒台の位置
          context.sp_stand_flip                  = false              // 相手側を反転
          context.sp_name_direction              = "vertical"         // 縦横書き
          context.sp_balloon                     = false              // 名前の下に吹き出し背景を入れない
          context.sp_location_mark_active_size   = 1.0                // 手番でないときの☗☖を小さくしない
          context.sp_location_mark_inactive_size = 1.0                // 手番でないときの☗☖を小さくしない
          context.sp_player_info.black.name      = "先手"
          context.sp_player_info.white.name      = "後手"

          context.sp_coordinate                  = true               // 座標を表示する
          context.sp_coordinate_variant_v        = "kanji"          // 座標の種類
          context.sp_board_horizontal_gap        = 0.2                // 座標があるため盤面の左右を空ける
          context.sp_coordinate_x_push           = 0.05               // 座標調整
          context.sp_coordinate_y_push           = 0.01               // 座標調整

          context.user_custom_css                = ""
        }
      },
    ]
  }
}
