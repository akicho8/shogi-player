<template lang="pug">
.StyleEditor.is-relative(:class="se_component_class" :style="se_component_style")
  div(is="style" v-text="sp_css_embed")
  div(is="style" v-text="user_custom_css")

  .CheckerboardPattern.is-overlay(:class="checkerboard_pattern_params")

  //- https://buefy.org/documentation/sidebar
  // b-sidebar は .StyleEditor の中にないため .StyleEditor .b-sidebar .StyleEditorSidebar としている
  b-sidebar.StyleEditorSidebar(fullheight right v-model="sidebar_p" position="fixed" :can-cancel="[]")
    ControlPanel

  b-button.sidebar_toggle_button(@click="sidebar_toggle_handle" icon-left="menu" size="is-medium" type="is-text")

  .Workspace.is-overlay
    .WorkspaceBackground.is-overlay
    .ShogiPlayerWrap
      ShogiPlayer(
      v-bind="sp_component_bind_attrs"
      v-on="sp_component_events"
      :sp_viewpoint.sync="sp_viewpoint"
      :sp_board_cell_class_fn="sp_board_cell_class_fn"
      ref="sp_object"
      )
</template>

<script>
import _ from "lodash"
import Vue from "vue"
import { GX } from "../models/gx.js"


import { mod_import         } from "./mod_import.js"
import { mod_persistence      } from "./mod_persistence.js"
import { mod_sp_style         } from "./mod_sp_style.js"
import { mod_component_params } from "./mod_component_params.js"
import { mod_helper           } from "./mod_helper.js"
import { mod_think_mark       } from "./mod_think_mark.js"
import { mod_event            } from "./mod_event.js"
import { mod_variables        } from "./mod_variables.js"
import { mod_book             } from "./mod_book.js"
import { mod_shortcut         } from "./mod_shortcut.js"
import { mod_keydown          } from "./mod_keydown.js"
import { mod_autorun          } from "./mod_autorun.js"
import { mod_callback         } from "./mod_callback.js"
import { mod_category         } from "./mod_category.js"
import { mod_control_panel    } from "./mod_control_panel.js"

import ShogiPlayer from "../ShogiPlayer.vue"
import ControlPanel from "./ControlPanel.vue"

export default {
  name: "StyleEditor",
  mixins: [
    mod_import,
    mod_persistence,
    mod_sp_style,
    mod_component_params,
    mod_helper,
    mod_think_mark,
    mod_event,
    mod_variables,
    mod_book,
    mod_shortcut,
    mod_keydown,
    mod_autorun,
    mod_callback,
    mod_category,
    mod_control_panel,
  ],

  components: {
    ShogiPlayer,
    ControlPanel,
  },

  provide() {
    return {
      AppContext: this,
    }
  },

  computed: {
    development_p() { return process.env.NODE_ENV === "development" },
    __SYSTEM_TEST_RUNNING__() { return this.$route.query.__SYSTEM_TEST_RUNNING__ === "true" },

    ////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////

    // sp_star_z_index が -1 のときこちらが勝ってしまうので se_checkerboard_p を false にすること
    checkerboard_pattern_params() {
      if (this.se_checkerboard_p) {
        return ["pattern-checks-md", "has-text-black-bis", "has-background-black-ter"]
      }
    },

    // 動作を受け取るやつら
    sp_component_events() {
      const hv = {}
      hv["ev_play_mode_move"]              = this.ev_play_mode_move
      // hv["ev_edit_mode_short_sfen_change"] = this.SB.ev_edit_mode_short_sfen_change
      // hv["ev_short_sfen_change"]           = this.SB.ev_short_sfen_change
      // hv["ev_turn_offset_change"]          = v => this.SB.current_turn = v
      // hv["ev_turn_offset_max_change"]      = v => this.SB.turn_offset_max = v
      //
      // hv["ev_action_viewpoint_flip"]       = this.SB.ev_action_viewpoint_flip // 意図して☗☖をタップして反転させたとき
      // hv["ev_action_turn_change"]          = this.SB.ev_action_turn_change    // スライダーを動かしたとき
      // hv["ev_action_piece_lift"]           = this.SB.ev_action_piece_lift     // 意図して持ち上げた
      // hv["ev_action_piece_cancel"]         = this.SB.ev_action_piece_cancel   // 意図してキャンセルした
      // hv["ev_action_promote_select_open"]       = this.SB.ev_action_promote_select_open  // 成 or 不成 選択モードに入る
      // hv["ev_action_promote_select_close"]      = this.SB.ev_action_promote_select_close // 成 or 不成 選択モードから出る
      //
      // // 手番 or 先後違い系
      // hv["ev_illegal_click_but_self_is_not_turn"] = this.SB.ev_illegal_click_but_self_is_not_turn // 手番が違うのに操作しようとした
      // hv["ev_illegal_my_turn_but_oside_click"]    = this.SB.ev_illegal_my_turn_but_oside_click    // 自分が手番だが相手の駒を動かそうとした
      //
      // // 反則系
      hv["ev_illegal_illegal_accident"] = this.ev_illegal_illegal_accident

      // マークできる箇所をタップした
      hv["ev_action_click_for_think_mark"] = this.ev_action_click_for_think_mark

      return hv
    },
  },
}
</script>

<style lang="sass">
@import "./StyleEditor.scss"
</style>
