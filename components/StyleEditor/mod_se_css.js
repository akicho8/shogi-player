export const mod_se_css = {
  computed: {
    se_css_human() { return this.css_to_human(this.se_css)  },
    se_css_embed() { return this.css_normalize(this.se_css) },

    se_css() {
      return `
        .Workspace {
          /* 将棋盤全体の外側の横幅(コンテナ幅) */
          --se_frame_width:     ${this.se_frame_width}vmin;

          /* 背景 */
          --se_ws_color:        ${this.hsla_format(this.se_ws_color)};
          --se_ws_image:        ${this.se_ws_bg_url};
          --se_ws_blur:         ${this.se_ws_blur};
          --se_ws_grayscale:    ${this.se_ws_grayscale};
          --se_ws_contrast:     ${this.se_ws_contrast};
          --se_ws_invert:       ${this.se_ws_invert};
          --se_ws_hue:          ${this.se_ws_hue};
          --se_ws_saturate:     ${this.se_ws_saturate + this.se_ws_saturate2};
          --se_ws_brightness:   ${this.se_ws_brightness};
          --se_ws_sepia:        ${this.se_ws_sepia};

          /* Transform 背景 */
          --se_tf0_perspective: ${this.se_tf0_perspective}px;
          --se_tf0_translate_x: ${this.se_tf0_translate_x}px;
          --se_tf0_translate_y: ${this.se_tf0_translate_y}px;
          --se_tf0_translate_z: ${this.se_tf0_translate_z}px;
          --se_tf0_rotate_x:    ${this.se_tf0_rotate_x}turn;
          --se_tf0_rotate_y:    ${this.se_tf0_rotate_y}turn;
          --se_tf0_rotate_z:    ${this.se_tf0_rotate_z}turn;
          --se_tf0_scale:       ${this.se_tf0_scale};

          /* Transform 盤 */
          --se_tf1_perspective: ${this.se_tf1_perspective}px;
          --se_tf1_translate_x: ${this.se_tf1_translate_x}px;
          --se_tf1_translate_y: ${this.se_tf1_translate_y}px;
          --se_tf1_translate_z: ${this.se_tf1_translate_z}px;
          --se_tf1_rotate_x:    ${this.se_tf1_rotate_x}turn;
          --se_tf1_rotate_y:    ${this.se_tf1_rotate_y}turn;
          --se_tf1_rotate_z:    ${this.se_tf1_rotate_z}turn;
          --se_tf1_scale:       ${this.se_tf1_scale};

          /* Transform 駒 */
          --se_tf2_perspective: ${this.se_tf2_perspective}px;
          --se_tf2_translate_x: ${this.se_tf2_translate_x}px;
          --se_tf2_translate_y: ${this.se_tf2_translate_y}px;
          --se_tf2_translate_z: ${this.se_tf2_translate_z}px;
          --se_tf2_rotate_x:    ${this.se_tf2_rotate_x}turn;
          --se_tf2_rotate_y:    ${this.se_tf2_rotate_y}turn;
          --se_tf2_rotate_z:    ${this.se_tf2_rotate_z}turn;
          --se_tf2_scale:       ${this.se_tf2_scale};
        }
      `
    },
  },
}
