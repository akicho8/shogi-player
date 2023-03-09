export const mod_sp_css = {
  computed: {
    sp_css_human() { return this.css_to_human(this.sp_css)  },
    sp_css_embed() { return this.css_normalize(this.sp_css) },

    sp_css() {
      return `
        .Workspace {
          /* 盤テクスチャ */
          --sp_board_color:                      ${this.hsla_format(this.sp_board_color)};
          --sp_board_even_cell_color:            ${this.hsla_format(this.sp_board_even_cell_color)};
          --sp_board_odd_cell_color:             ${this.hsla_format(this.sp_board_odd_cell_color)};
          --sp_board_image:                      ${this.sp_board_image_url};

          /* 盤 */
          --sp_board_padding:                    ${this.sp_board_padding};
          --sp_board_radius:                     ${this.sp_board_radius};
          --sp_board_aspect_ratio:               ${this.sp_board_aspect_ratio};
          --sp_board_piece_size:                 ${this.sp_board_piece_size};
          --sp_board_piece_position:             ${this.sp_board_piece_position};
          --sp_board_horizontal_gap:             ${this.sp_board_horizontal_gap};
          --sp_board_vertical_gap:               ${this.sp_board_vertical_gap};

          /* 盤グリッド */
          --sp_grid_inner_color:                 ${this.hsla_format(this.sp_grid_inner_color)};
          --sp_grid_outer_color:                 ${this.hsla_format(this.sp_grid_outer_color)};
          --sp_grid_inner_stroke:                ${this.sp_grid_inner_stroke};
          --sp_grid_outer_stroke:                ${this.sp_grid_outer_stroke};
          --sp_board_edge_stroke:                ${this.sp_board_edge_stroke};
          --sp_star_size:                        ${this.sp_star_size};
          --sp_star_z_index:                     ${this.sp_star_z_index};

          /* 駒数 */
          --sp_piece_count_size:                 ${this.sp_piece_count_size};
          --sp_piece_count_font_color:           ${this.hsla_format(this.sp_piece_count_font_color)};
          --sp_piece_count_bg_color:             ${this.hsla_format(this.sp_piece_count_bg_color)};
          --sp_piece_count_padding:              ${this.sp_piece_count_padding};
          --sp_piece_count_horizontal_x:         ${this.sp_piece_count_horizontal_x};
          --sp_piece_count_horizontal_y:         ${this.sp_piece_count_horizontal_y};
          --sp_piece_count_vertical_x:           ${this.sp_piece_count_vertical_x};
          --sp_piece_count_vertical_y:           ${this.sp_piece_count_vertical_y};

          /* 駒台 */
          --sp_stand_piece_size:                 ${this.sp_stand_piece_size};
          --sp_stand_hover_border_color:         ${this.hsla_format(this.sp_stand_hover_border_color)};
          --sp_stand_bg_color:                   ${this.hsla_format(this.sp_stand_bg_color)};

          /* 名前と時間お大きさ */
          --sp_player_name_size:                 ${this.sp_player_name_size};
          --sp_player_time_size:                 ${this.sp_player_time_size};

          /* 駒箱 */
          --sp_piece_box_piece_size:             ${this.sp_piece_box_piece_size};
          --sp_piece_box_color:                  ${this.hsla_format(this.sp_piece_box_color)};

          /* ☗☖の大きさ */
          --sp_location_mark_active_size:        ${this.sp_location_mark_active_size};
          --sp_location_mark_inactive_size:      ${this.sp_location_mark_inactive_size};

          /* 成り不成り選択 */
          --sp_promote_select_modal_bg_color:    ${this.hsla_format(this.sp_promote_select_modal_bg_color)};
          --sp_promote_select_modal_hover_color: ${this.hsla_format(this.sp_promote_select_modal_hover_color)};

          /* 駒を操作中の移動元スタイル */
          --sp_mouse_lifted_origin_bg_color:     ${this.hsla_format(this.sp_mouse_lifted_origin_bg_color)};
          --sp_mouse_lifted_origin_opacity:      ${this.sp_mouse_lifted_origin_opacity};

          /* 駒台横配置のときの盤の上下の隙間 */
          --sp_common_gap:                       ${this.sp_common_gap};

          /* コントローラー */
          --sp_controller_width:                 ${this.sp_controller_width};
          --sp_controller_width_mobile:          ${this.sp_controller_width_mobile};

          /* 座標表記 */
          --sp_coordinate_x_size:                ${this.sp_coordinate_x_size};
          --sp_coordinate_x_push:                ${this.sp_coordinate_x_push};
          --sp_coordinate_y_size:                ${this.sp_coordinate_y_size};
          --sp_coordinate_y_push:                ${this.sp_coordinate_y_push};
          --sp_coordinate_color:                 ${this.sp_coordinate_color};
        }
      `
    },
  },
}
