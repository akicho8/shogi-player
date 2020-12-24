#!/usr/bin/env ruby
require "pathname"
require "table_format"
require "json"

rows = []
Pathname(".").glob("**/ShogiPlayer.{vue,js}") do |file|
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
# >> | Name                          | Description                                      | Default                 |
# >> |-------------------------------|--------------------------------------------------|-------------------------|
# >> | `sp_board_dimension_w`        | 盤のセル数(W)                                    |                       9 |
# >> | `sp_board_dimension_h`        | 盤のセル数(H)                                    |                       9 |
# >> | `sp_layout`                   | レイアウト             | "is_vertical"           |
# >> | `sp_hpos`                     | DEPRECATION                                      | "is_hcentered"          |
# >> | `sp_vpos`                     | DEPRECATION                                      | "is_vcentered"          |
# >> | `sp_fullheight`               | DEPRECATION                                      | "is_fullheight_off"     |
# >> | `sp_balloon`                  | 対局者名の下に駒数スタイルと同じ背景色を置く     | "is_balloon_on"         |
# >> | `sp_layer`                    | レイヤー確認(デバッグ用)                         | "is_layer_off"          |
# >> | `sp_board_shadow`             | 盤の影適用方法 is_board_shadow_(drop\|box\|none) | "is_board_shadow_drop"  |
# >> | `sp_blink`                    | 最終手の表現方法 is_blink_(on\|off)              | "is_blink_off"          |
# >> | `sp_pi_variant`               | 駒の種類                                         | "is_pi_variant_a1by"    |
# >> | `sp_bg_variant`               | 盤の種類                                         | "is_bg_variant_none"    |
# >> | `sp_mobile_fit`               | DEPRECATION                                      | "is_mobile_fit_on"      |
# >> | `sp_mobile_vertical`          | モバイル時に自動的に縦配置に切り替える           | "is_mobile_vertical_on" |
# >> | `sp_location_behavior`        | ☗☖をタップしたとき視点を切り替える             | "is_location_flip_on"   |
# >> | `board_piece_back_user_style` | FIXME: add to README                             | place => { return {} }  |
