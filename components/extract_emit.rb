require "pathname"
require "table_format"
require "json"

Dir.chdir(__dir__)

already_defs = %w(
ev:short_sfen
ev:play_mode_next_info
play_mode_next_moves
moves_take_turn_offset
ev:edit_mode_short_sfen
update:sp_turn
ev:play_mode_user_piece_put
user_viewpoint_flip
user_turn_change
user_piece_lift
user_piece_cancel
ev:turn_offset
ev:turn_offset_max
update:sp_run_mode
update:sp_body
update:sp_debug_mode
update:sp_viewpoint
update:sp_layout
update:sp_bg_variant
update:sp_piece_variant
board_cell_pointerdown
operation_invalid1
operation_invalid2
foul_accident
player_info_click)

rows = []
Pathname(".").glob("**/*.{vue,js}") do |file|
  file.readlines.each do |e|
    if md = e.match(/\$emit\(['"](?<key>[\w:]+)/)
      if already_defs.include?(md[:key])
      else
        rows << {:file => file.to_s, :key => md[:key]}
      end
    end
  end
end
rows = rows.sort_by {|e|e[:key]}
pp rows
