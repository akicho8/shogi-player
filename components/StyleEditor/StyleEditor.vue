<template lang="pug">
.StyleEditor.is-relative(:class="component_class")
  div(is="style" v-text="sp_css_embed")
  div(is="style" v-text="se_css_embed")
  div(is="style" v-text="user_custom_css")

  .StyleEditorBackground.is-overlay(:class="component_background_class")

  // .StyleEditor .b-sidebar ではセレクタが効かないため .StyleEditorSidebar としている
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
const DEVELOPMENT_P = process.env.NODE_ENV === "development"

import _ from "lodash"
import Vue from "vue"
import { GX } from "../models/gx.js"

import { HumanSideInfo             } from "../models/human_side_info.js"
import { ModeInfo                  } from "../models/mode_info.js"
import { BoardVariantInfo          } from "../models/board_variant_info.js"
import { PieceVariantInfo          } from "../models/piece_variant_info.js"
import { CoordinateInfo            } from "../models/coordinate_info.js"
import { MixBlendModeInfo          } from "../models/mix_blend_mode_info.js"
import { LiftCancelActionInfo      } from "../models/lift_cancel_action_info.js"
import { ClickResponseTimingInfo   } from "../models/click_response_timing_info.js"

import { VariableInfo            } from "./models/variable_info.js"
import { PresetInfo              } from "./models/preset_info.js"
import { CategoryInfo            } from "./models/category_info.js"
import { BoardSizePresetInfo     } from "./models/board_size_preset_info.js"
import { UserCustomCssPresetInfo } from "./models/user_custom_css_preset_info.js"
import { PieceVisibilityInfo     } from "./models/piece_visibility_info.js"
import { CssHelper               } from "./models/css_helper.js"
import { ColorHelper             } from "./models/color_helper.js"

import { mod_persistence      } from "./mod_persistence.js"
import { mod_sp_style       } from "./mod_sp_style.js"
import { mod_se_style       } from "./mod_se_style.js"
import { mod_helper       } from "./mod_helper.js"
import { mod_think_mark   } from "./mod_think_mark.js"
import { mod_event        } from "./mod_event.js"
import { mod_variables    } from "./mod_variables.js"
import { mod_book         } from "./mod_book.js"
import { mod_shortcut         } from "./mod_shortcut.js"
import { mod_keydown         } from "./mod_keydown.js"
import { mod_autorun } from "./mod_autorun.js"
import { mod_callback } from "./mod_callback.js"
import { mod_category } from "./mod_category.js"

import ShogiPlayer from "../ShogiPlayer.vue"
import ControlPanel from "./ControlPanel.vue"

export default {
  name: "StyleEditor",
  mixins: [
    mod_persistence,
    mod_sp_style,
    mod_se_style,
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

  mounted() {

  },

  methods: {
    tfx_slider_attrs(value) {
      return { ...this.slider_attrs, disabled: value }
    },

    sidebar_toggle_handle() {
      this.sidebar_p = !this.sidebar_p
    },
    se_ws_image_input_handle(v) {
      this.se_ws_image = v
    },
    sp_board_image_input_handle(v) {
      this.sp_board_image = v
      this.sp_board_variant = "none" // 背景画像プリセットを選択してない状態に戻しておく
    },

    se_preset_apply_handle(preset_info) {
      preset_info.func(this)
    },

    se_board_size_preset_apply_handle(board_size_preset_info) {
      board_size_preset_info.func(this)
    },

    se_user_custom_css_preset_apply_handle(user_custom_css_preset_info) {
      this.user_custom_css_update_by(user_custom_css_preset_info.key)
    },

    user_custom_css_update_by(key) {
      const user_custom_css_preset_info = this.UserCustomCssPresetInfo.fetch(key)
      this.user_custom_css = user_custom_css_preset_info.user_custom_css.trim()
    },

  },
  computed: {
    development_p() { return DEVELOPMENT_P },
    __SYSTEM_TEST_RUNNING__() { return this.$route.query.__SYSTEM_TEST_RUNNING__ === "true" },

    VariableInfo()            { return VariableInfo            },
    HumanSideInfo()           { return HumanSideInfo           },
    ModeInfo()                { return ModeInfo                },
    BoardVariantInfo()        { return BoardVariantInfo        },
    PieceVariantInfo()        { return PieceVariantInfo        },
    CoordinateInfo()          { return CoordinateInfo          },
    LiftCancelActionInfo()    { return LiftCancelActionInfo    },
    ClickResponseTimingInfo() { return ClickResponseTimingInfo },
    CategoryInfo()            { return CategoryInfo            },
    PresetInfo()              { return PresetInfo              },
    BoardSizePresetInfo()     { return BoardSizePresetInfo     },
    UserCustomCssPresetInfo() { return UserCustomCssPresetInfo },
    PieceVisibilityInfo()     { return PieceVisibilityInfo     },
    CssHelper()               { return CssHelper               },
    ColorHelper()             { return ColorHelper             },

    ////////////////////////////////////////////////////////////////////////////////

    slider_attrs() {
      return {
        indicator: true,
        tooltip: false,
        size: "is-small",
      }
    },

    tf0_slider_attrs() { return this.tfx_slider_attrs(this.se_tf0_mode === "is_tf0_mode_off") },
    tf1_slider_attrs() { return this.tfx_slider_attrs(this.se_tf1_mode === "is_tf1_mode_off") },
    tf2_slider_attrs() { return this.tfx_slider_attrs(this.se_tf2_mode === "is_tf2_mode_off") },

    ////////////////////////////////////////////////////////////////////////////////

    component_class() {
      return [
        {
          sidebar_p: this.sidebar_p
        },
        this.se_tf0_mode,
        this.se_tf1_mode,
        this.se_tf2_mode,
      ]
    },

    // sp_star_z_index が -1 のときこちらが勝ってしまうので se_bg_pattern を false にすること
    component_background_class() {
      if (this.se_bg_pattern) {
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
@import "pattern.css/pattern.scss"
@import "./support.scss"
@import "./layout.scss"
@import "./property.scss"
@import "./transform.scss"

.StyleEditor
  min-height: 100dvh
  overflow: hidden

.StyleEditor
  .sidebar_toggle_button
    position: fixed
    top: 0
    right: 0
    z-index: 1

  &.sidebar_p
    .Workspace
      +tablet
        width: unquote("calc(100% - #{$sidebar_width_tablet})")
      +desktop
        width: unquote("calc(100% - #{$sidebar_width_desktop})")

  .StyleEditorBackground
    height: 100%
    z-index: -200               // sp_star_z_index が -1 のときチェッカー背景より前面になるようにするため -1 未満にする

  .Workspace
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

  .WorkspaceBackground
    z-index: -100              // sp_star_z_index が -1 のとき背景より前面なるようにするため -1 未満にする
    background-color: var(--se_ws_color)
    background-image: var(--se_ws_image, none)
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    filter: unquote('invert(var(--se_ws_invert)) sepia(var(--se_ws_sepia)) hue-rotate(calc(var(--se_ws_hue) * 1turn)) saturate(var(--se_ws_saturate)) grayscale(var(--se_ws_grayscale)) brightness(var(--se_ws_brightness)) contrast(var(--se_ws_contrast)) blur(calc(var(--se_ws_blur) * 1px))')

  .ShogiPlayerWrap
    width: var(--se_frame_width)

</style>
