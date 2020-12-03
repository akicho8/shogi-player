#!/usr/bin/env ruby
require "pathname"

Pathname(".").glob("**/*.{vue,scss,sass}") do |file|
  puts file.readlines.grep(/^\s*\-\-/).collect { |e| [e.strip, "(in #{file})"].join(" ") }
end
# >> --sp_stand_piece_w: 35px                    // 駒台の駒(W) (in PieceObject.vue)
# >> --sp_stand_piece_h: 44px                    // 駒台の駒(H) (in PieceObject.vue)
# >> --sp_grid_color: rgba(0, 0, 0, 0.5)         // グリッド色 (in BoardOuter.vue)
# >> --sp_board_padding: 2%                      // 盤の隅の隙間 (in BoardOuter.vue)
# >> --sp_grid_outer_stroke: 1px                 // 升目外枠の太さ (in BoardOuter.vue)
# >> --sp_board_radius: 0.5%                     // 盤の隅の丸め度合い (in BoardOuter.vue)
# >> --sp_board_color: rgba(0, 0, 0, 0.2)        // 盤の色 (in BoardOuter.vue)
# >> --sp_board_opacity: 1.0                     // 非半透明度 (in BoardOuter.vue)
# >> --sp_board_bg_image: none                   // 背景画像 (in BoardOuter.vue)
# >> --sp_body_width: 100% (in ShogiPlayerWidth.vue)
# >> --sp_piece_object_count_gap_right: 86%      // 駒数の位置(横配置時) (in PieceObjectCount.vue)
# >> --sp_piece_object_count_gap_bottom: 100%    // 駒数の位置(縦配置時) (in PieceObjectCount.vue)
# >> --sp_piece_object_count_font_size: 0.75rem  // 駒数の文字サイズ (in PieceObjectCount.vue)
# >> --sp_piece_object_count_font_color: #000000 // 駒数の文字色 (in PieceObjectCount.vue)
# >> --sp_ground_color: inherit                  // グラウンド背景色 (in ShogiPlayerGround.vue)
# >> --sp_ground_bg_image: none                  // グラウンド背景画像 (in ShogiPlayerGround.vue)
# >> --sp_side_min_w: 20vw (in Membership.vue)
# >> --sp_side_min_h: 20vw (in Membership.vue)
# >> --sp_board_aspect_ratio: 109.7%             // 盤の横を100としたときの縦の比率 (in AspectRatioFixedBlock.vue)
# >> --sp_shadow_offset: 2;                      // 右下方法への長さ (in stylesheets/new_initial_variables.scss)
# >> --sp_shadow_blur: 3;                        // 影の範囲 (in stylesheets/new_initial_variables.scss)
# >> --sp_shadow_color: rgba(0, 0, 0, 0.4);      // 色 (in stylesheets/new_initial_variables.scss)
