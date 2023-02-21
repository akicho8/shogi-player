require "pathname"
require "table_format"
require "json"

Dir.chdir(__dir__)

already_defs = %w(
ev_short_sfen_change
ev_play_mode_move
play_mode_next_moves
moves_take_turn_offset
ev_edit_mode_short_sfen_change
update:sp_turn
ev_play_mode_piece_put
ev_action_viewpoint_flip
ev_action_turn_change
ev_action_piece_lift
ev_action_piece_cancel
ev_turn_offset_change
ev_turn_offset_max_change
update:sp_mode
update:sp_debug
update:sp_viewpoint
ev_action_board_cell_pointerdown
ev_foul_click_but_self_is_not_turn
ev_foul_my_turn_but_oside_click
ev_foul_foul_accident
ev_action_player_info_click

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
