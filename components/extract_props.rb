#!/usr/bin/env ruby
require "pathname"
require "table_format"
require "json"

rows = []
Pathname(".").glob("**/{navi_module,ShogiPlayer}.{vue,js}") do |file|
  file.readlines.each do |e|
    if md = e.match(/^\s+(?<key>\w+):\s*{.*type:.*default:\s*(?<default>.*?),.*\/\/\s*(?<desc>.*)\n/m)
      rows << {
        "Name"        => "`#{md["key"]}`",
        "Description" => md["desc"].gsub(/\|/, "\\|"),
        "Default"     => md["default"],
      }
    end
  end
end

s = rows.to_t(markdown: true)
puts s
Pathname("MainDoc/props.md").write(s)
# >> | Name                          | Description                                               | Default                 |
# >> |-------------------------------|-----------------------------------------------------------|-------------------------|
# >> | `sp_summary`                  | 手数や結果の表示                                          | "is_summary_on"         |
# >> | `sp_slider`                   | スライダー表示                                            | "is_summary_off"        |
# >> | `sp_board_dimension_w`        | 盤のセル数(W)                                             |                       9 |
# >> | `sp_board_dimension_h`        | 盤のセル数(H)                                             |                       9 |
# >> | `sp_layout`                   | レイアウト is_(vertical\|horizontal)                      | "is_vertical"           |
# >> | `sp_hpos`                     | DEPRECATE                                                 | "is_hcentered"          |
# >> | `sp_vpos`                     | DEPRECATE                                                 | "is_vcentered"          |
# >> | `sp_fullheight`               | DEPRECATE                                                 | "is_fullheight_off"     |
# >> | `sp_balloon`                  | 対局者名の下に駒数スタイルと同じ背景色を置く              | "is_balloon_on"         |
# >> | `sp_layer`                    | レイヤー確認(デバッグ用)                                  | "is_layer_off"          |
# >> | `sp_board_shadow`             | 盤の影適用方法 is_board_shadow_(drop\|box\|none)          | "is_board_shadow_drop"  |
# >> | `sp_blink`                    | 最終手の表現方法 is_blink_(on\|off)                       | "is_blink_off"          |
# >> | `sp_pi_variant`               | 駒の種類                                                  | "is_pi_variant_a1by"    |
# >> | `sp_bg_variant`               | 盤の種類                                                  | "is_bg_variant_none"    |
# >> | `sp_mobile_fit`               | DEPRECATE                                                 | "is_mobile_fit_on"      |
# >> | `sp_mobile_vertical`          | モバイル時に自動的に縦配置に切り替える                    | "is_mobile_vertical_on" |
# >> | `sp_location_behavior`        | ☗☖をタップしたとき視点を切り替える                      | "is_location_flip_on"   |
# >> | `sp_debug`                    | デバッグモード                                            | "is_debug_off"          |
# >> | `sp_sfen_show`                | SFENを下に表示する                                        | "is_sfen_show_off"      |
# >> | `sp_overlay_nav`              | play_mode のとき盤の左右で手数変更(falseなら駒を動かせる) | "is_overlay_nav_off"    |
# >> | `player_click_handle`         | 名前(時間を含む)をタップしたときに実行する                | null                    |
# >> | `location_click_handle`       | ☗☖をタップしたときに実行する                            | null                    |
# >> | `board_click_handle`          | 盤をタップしたときに実行する(駒よりも優先)                | null                    |
# >> | `board_piece_back_user_style` | FIXME: add to README                                      | place => { return {} }  |
