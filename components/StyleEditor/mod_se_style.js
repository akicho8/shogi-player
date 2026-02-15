export const mod_se_style = {
  computed: {
    se_css_human() { return this.CssHelper.pretty(this.se_css)  },
    se_css_embed() { return this.CssHelper.normalize(this.se_css) },

    se_css() {
      return `
        :root {
          /* 将棋盤全体の外側の横幅(コンテナ幅) */
          --se_frame_width:     ${this.se_frame_width}dvmin;

          /* 背景 */
          --se_ws_color:        ${this.ColorHelper.hsla_format(this.se_ws_color)};
          --se_ws_image:        ${this.se_ws_image};
          --se_ws_blur:         ${this.se_ws_blur};
          --se_ws_grayscale:    ${this.se_ws_grayscale};
          --se_ws_contrast:     ${this.se_ws_contrast};
          --se_ws_invert:       ${this.se_ws_invert};
          --se_ws_hue:          ${this.se_ws_hue};
          --se_ws_saturate:     ${this.se_ws_saturate};
          --se_ws_brightness:   ${this.se_ws_brightness};
          --se_ws_sepia:        ${this.se_ws_sepia};

          /* Transform 背景 */
          --se_tf_wall_perspective: ${this.se_tf_wall_perspective}px;
          --se_tf_wall_translate_x: ${this.se_tf_wall_translate_x}px;
          --se_tf_wall_translate_y: ${this.se_tf_wall_translate_y}px;
          --se_tf_wall_translate_z: ${this.se_tf_wall_translate_z}px;
          --se_tf_wall_rotate_x:    ${this.se_tf_wall_rotate_x}turn;
          --se_tf_wall_rotate_y:    ${this.se_tf_wall_rotate_y}turn;
          --se_tf_wall_rotate_z:    ${this.se_tf_wall_rotate_z}turn;
          --se_tf_wall_scale:       ${this.se_tf_wall_scale};

          /* Transform 盤 */
          --se_tf_board_perspective: ${this.se_tf_board_perspective}px;
          --se_tf_board_translate_x: ${this.se_tf_board_translate_x};
          --se_tf_board_translate_y: ${this.se_tf_board_translate_y};
          --se_tf_board_translate_z: ${this.se_tf_board_translate_z}px;
          --se_tf_board_rotate_x:    ${this.se_tf_board_rotate_x}turn;
          --se_tf_board_rotate_y:    ${this.se_tf_board_rotate_y}turn;
          --se_tf_board_rotate_z:    ${this.se_tf_board_rotate_z}turn;
          --se_tf_board_scale:       ${this.se_tf_board_scale};

          /* Transform 駒 */
          --se_tf_piece_perspective: ${this.se_tf_piece_perspective}px;
          --se_tf_piece_translate_x: ${this.se_tf_piece_translate_x};
          --se_tf_piece_translate_y: ${this.se_tf_piece_translate_y};
          --se_tf_piece_translate_z: ${this.se_tf_piece_translate_z}px;
          --se_tf_piece_rotate_x:    ${this.se_tf_piece_rotate_x}turn;
          --se_tf_piece_rotate_y:    ${this.se_tf_piece_rotate_y}turn;
          --se_tf_piece_rotate_z:    ${this.se_tf_piece_rotate_z}turn;
          --se_tf_piece_scale:       ${this.se_tf_piece_scale};
        }
      `
    },
  },
}
