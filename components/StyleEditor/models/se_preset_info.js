import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class SePresetInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      {
        key: "初期値",
        parent_key: null,
        func: context => {
          context.VariableInfo.values.forEach(e => {
            context[e.key] = e.default_value_clone
          })
        }
      },
      {
        key: "紙面風",
        parent_key: "初期値",
        func: context => {
          context.se_ws_color                    = "hsl(none 0% 100%)" // 背景

          context.sp_piece_variant               = "paper"                  // 紙面風駒
          context.sp_board_radius                = 0                        // 角を丸くしない
          context.sp_board_padding               = 0                        // 隙間なし
          context.sp_board_color                 = "white"                  // 盤を白くする

          context.sp_grid_inner_stroke           = 1                        // グリッド線(細)
          context.sp_grid_outer_stroke           = 2                        // グリッド枠(太)
          context.sp_board_edge_stroke           = 0
          context.sp_stand_gravity               = "top"                    // 駒台の位置
          context.sp_stand_flip                  = false                    // 相手側を反転
          context.sp_name_direction              = "vertical"               // 縦横書き
          context.sp_balloon                     = false                    // 名前の下に吹き出し背景を入れない
          context.sp_location_mark_active_size   = 1.0                      // 手番でないときの☗☖を小さくしない
          context.sp_location_mark_inactive_size = 1.0                      // 手番でないときの☗☖を小さくしない
          context.sp_player_info.black.name      = "先手"
          context.sp_player_info.white.name      = "後手"

          context.sp_coordinate                  = true                     // 座標を表示する
          context.sp_board_horizontal_gap        = 0.2                      // 座標があるため盤面の左右を空ける
        }
      },
      {
        key: "リアル",
        parent_key: "初期値",
        func: context => {
          context.se_ws_color             = "hsla(37.5,52.94%,73.33%,1)"

          context.sp_piece_variant        = "portella",
          context.sp_board_variant        = "wood_normal"

          context.sp_board_piece_size     = 1.0
          context.sp_stand_piece_size     = 1.0
          context.sp_piece_box_piece_size = 1.0

          context.user_custom_css_update_by("盤に影")
        },
      },
      {
        key: "ダーク",
        parent_key: null,
        func: context => {
          context.user_custom_css_update_by("ノイズ盤")
          context.sp_board_variant    = "none"
          context.se_ws_color         = "hsla(0,0%, 10%,1.0)"
          context.sp_grid_outer_color = "hsla(0,0%,100%,0.4)"
          context.sp_grid_inner_color = "hsla(0,0%,100%,0.4)"
        },
      },

      {
        key: "洋風",
        parent_key: null,
        func: context => {
          // this.fetch("初期値").func(context)
          context.sp_board_even_cell_color = "hsla(0,0%,0%,0.2)"  // セルの色(偶数)
          context.sp_board_edge_stroke     = 3.0                  // 盤のエッジの縁取りの太さ
          context.sp_grid_inner_stroke     = 3.0                  // 盤の内側の格子の太さ
          context.sp_star_size             = 0.0                  // 星の大きさ
        },
      },
      {
        key: "5五将棋",
        parent_key: null,
        func: context => {
          context.body_update("position sfen 4rbsgk/8p/9/4P4/4KGSBR/9/9/9/9 b - 1")
          context.sp_board_view_x = 4
          context.sp_board_view_w = 5
          context.sp_board_view_h = 5
          context.sp_star_size = 0.0
        },
      },
      // {
      //   key: "ランダム色",
      //   parent_key: null,
      //   func: context => {
      //     context.se_ws_color = context.ColorHelper.random()
      //   },
      // },
      {
        key: "3D",
        parent_key: null,
        func: context => {
          context.se_tf_board_mode = true
        },
      },
      {
        key: "駒変形",
        parent_key: null,
        func: context => {
          context.se_tf_piece_mode = true
        },
      },
      {
        key: "コントローラー付き",
        parent_key: null,
        func: context => {
          context.sp_slider     = true
          context.sp_controller = true
        }
      },
    ]
  }

  get parent_info() {
    return this.constructor.fetch_if(this.parent_key)
  }

  call(context) {
    if (this.parent_info) {
      this.parent_info.call(context)
    }
    this.func(context)
  }
}
