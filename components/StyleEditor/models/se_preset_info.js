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
        key: "モダン",
        parent_key: "初期値",
        func: context => {
          this.fetch("ビニ盤").call(context)
          this.fetch("盤面と駒台に隙間").call(context)
          this.fetch("駒表示確認用").call(context)

          context.se_ws_color         = "hsl(0 0% 30% / 1.0)"
        },
      },
      {
        key: "リアル",
        parent_key: "初期値",
        func: context => {
          this.fetch("盤面と駒台に隙間").call(context)
          this.fetch("駒表示確認用").call(context)
          context.user_custom_css_update_by("盤と駒台に影")

          context.se_ws_color               = "hsl(43 22% 36%)"

          context.sp_piece_variant          = "portella",
          context.sp_board_variant          = "wood_normal"
          context.sp_board_variant_to_stand = true

          context.sp_board_piece_size       = 1.0
          context.sp_stand_piece_size       = 1.0
          context.sp_piece_box_piece_size   = 1.0
        },
      },
      {
        key: "ハイブリッド",
        parent_key: "リアル",
        func: context => {
          this.fetch("ビニ盤").call(context)
          context.se_ws_color = "hsl(168 47% 23%)"
        },
      },
      {
        key: "紙面風",
        parent_key: "初期値",
        func: context => {
          this.fetch("盤面と駒台に隙間").call(context)
          this.fetch("駒表示確認用").call(context)

          context.se_ws_color                    = "white"                // 背景

          context.sp_piece_variant               = "paper"                // 紙面風駒
          context.sp_board_radius                = 0                      // 角を丸くしない
          context.sp_board_padding               = 0                      // 隙間なし
          context.sp_board_color                 = "white"                // 盤を白くする

          context.sp_grid_inner_stroke           = 1                      // グリッド線(細)
          context.sp_grid_outer_stroke           = 2                      // グリッド枠(太)
          context.sp_board_edge_stroke           = 0

          context.sp_balloon                     = false                  // 名前の下に吹き出し背景を入れない
          context.sp_location_mark_active_size   = 1.0                    // 手番でないときの☗☖を小さくしない
          context.sp_location_mark_inactive_size = 1.0                    // 手番でないときの☗☖を小さくしない

          context.sp_piece_count_bg_color        = "hsl(0 0% 95% / 0.94)" // 駒数の背景色。微灰色を微半透明で入れる。駒数が見やすくなる。

          context.sp_board_horizontal_gap        = 0.2                    // 座標があるため盤面の左右を空ける
        }
      },

      {
        key: "詰将棋風",
        parent_key: "紙面風",
        func: context => {
          this.fetch("盤面と駒台に隙間").call(context)
          this.fetch("駒表示確認用").call(context)

          context.sp_stand_gravity                      = "top"      // 駒台の位置
          context.sp_stand_flip                         = true       // 相手側を反転する
          context.sp_name_direction                     = "vertical" // 名前を縦書きする
          context.sp_player_info.black.name             = "先手"
          context.sp_player_info.black.time             = ""
          context.sp_player_info.white.name             = "後手"
          context.sp_player_info.white.time             = ""
          context.sp_coordinate                         = true       // 座標を表示する
          // context.sp_player_info.white.piece_visibility = "hidden"
        }
      },

      {
        key: "洋風",
        parent_key: "ハイブリッド",
        func: context => {
          context.sp_board_even_cell_color = "hsl(0 0% 0% / 0.08)"  // セルの色(偶数)
          context.sp_board_edge_stroke     = 3.0                    // 盤のエッジの縁取りの太さ
          context.sp_grid_inner_stroke     = 2.0                    // 盤の内側の格子の太さ
          context.sp_star_size             = 0.0                    // 星の大きさ
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
          context.sp_star_size    = 0.0
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
          context.se_tf_board_p = true
        },
      },
      // {
      //   key: "駒変形",
      //   parent_key: null,
      //   func: context => {
      //     context.se_tf_piece_p = true
      //   },
      // },
      {
        key: "コントローラー付き",
        parent_key: null,
        func: context => {
          context.sp_slider     = true
          context.sp_controller = true
        }
      },
      {
        key: "盤面と駒台に隙間",
        parent_key: null,
        func: context => {
          context.sp_board_horizontal_gap      = 0.15
          context.sp_board_vertical_gap        = 0.15
          context.sp_membership_horizontal_gap = 0.10
          context.sp_membership_vertical_gap   = 0.10
        }
      },
      {
        key: "ビニ盤",
        parent_key: null,
        func: context => {
          context.sp_board_variant          = "none"
          context.sp_board_variant_to_stand = false
          context.sp_board_color            = "hsl(36.23,75.36%,58.63%)"
          context.sp_stand_bg_color         = "hsl(36.23,75.36%,58.63%)"
        }
      },
      {
        key: "駒表示確認用",
        parent_key: null,
        func: context => {
          context.sfen_book_apply("駒表示確認用")

          context.sp_player_info.black.name = "先手"
          context.sp_player_info.black.time = "12:34<br>30<br>1:00"
          context.sp_player_info.white.name = "後手の名前はとても長い"
          context.sp_player_info.white.time = "12:34:56"
        }
      },
      {
        key: "縦長",
        parent_key: null,
        func: context => {
          context.se_frame_width = 0.6
          context.sp_layout = "vertical"
        }
      },
      {
        key: "横長",
        parent_key: null,
        func: context => {
          context.se_frame_width = 0.8
          context.sp_layout = "horizontal"
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
