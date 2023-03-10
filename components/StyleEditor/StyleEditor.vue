<template lang="pug">
.StyleEditor.is-relative(:class="component_class")
  div(is="style" v-text="sp_css_embed")
  div(is="style" v-text="se_css_embed")
  div(is="style" v-text="user_custom_css")

  .StyleEditor-Background.is-overlay(:class="component_background_class")

  b-sidebar.StyleEditorSidebar(fullheight right v-model="sidebar_p" position="fixed" :can-cancel="['escape']")
    SidebarContent

  b-button.sidebar_toggle_button(@click="sidebar_toggle_handle" icon-left="menu" size="is-medium" type="is-text")

    //- b-navbar(type="is-primary" :mobile-burger="false" wrapper-class="container" spaced)
    //-   template(slot="brand")
    //-     b-navbar-item.has-text-weight-bold 将棋盤エディター
    //-   template(slot="end")
    //-     b-navbar-item(@click="sidebar_toggle_handle")
    //-       b-icon(icon="menu")

    //- .section
    //-   .container.is-fluid
    //-     .buttons
    //-     .columns.is-multiline

  .Workspace.is-overlay
    .WorkspaceBackground.is-overlay
    .ShogiPlayerWrap
      ShogiPlayer(
      v-bind="sp_params"
      :sp_board_cell_class_fn="p => p.human_x === 5 && p.human_y === 5 && '天王山'"
      )
</template>

<script>
const DEVELOPMENT_P = process.env.NODE_ENV === "development"

import { HumanSideInfo    }    from "../models/human_side_info.js"
import { ModeInfo         }      from "../models/mode_info.js"
import { BoardVariantInfo }    from "../models/board_variant_info.js"
import { PieceVariantInfo }    from "../models/piece_variant_info.js"
import { KifuBookInfo     }     from "../models/kifu_book_info.js"
import { MixBlendModeInfo } from "../models/mix_blend_mode_info.js"

import { SeVariableInfo } from "./se_variable_info.js"
import { SePresetInfo }   from "./se_preset_info.js"
import { SeSectionInfo }    from "./se_section_info.js"

import { mod_storage } from "./mod_storage.js"
import { mod_sp_css } from "./mod_sp_css.js"
import { mod_se_css } from "./mod_se_css.js"
import { mod_helper } from "./mod_helper.js"

import ShogiPlayer   from "../ShogiPlayer.vue"
import MyColorPicker from "./MyColorPicker.vue"
import ImageUpload   from "./ImageUpload.vue"
import SeTitle   from "./SeTitle.vue"
import SidebarContent   from "./SidebarContent.vue"

export default {
  name: "StyleEditor",
  mixins: [
    mod_storage,
    mod_sp_css,
    mod_se_css,
    mod_helper,
  ],

  components: {
    ShogiPlayer,
    MyColorPicker,
    ImageUpload,
    SeTitle,
    SidebarContent,
  },

  data() {
    return {
      sidebar_p: true,
      ...SeVariableInfo.data_all,
    }
  },

  provide() {
    return {
      TheSe: this,
    }
  },

  created() {
    this.data_init()
  },

  methods: {
    data_init() {
      const query = this.$route.query
      const { body, black, white } = query

      if (body) {
        this.sp_body = body
      }
      if (black) {
        this.sp_player_info.black = black
      }
      if (white) {
        this.sp_player_info.white = white
      }
      if ("turn" in query) {
        this.sp_turn = Number(query.turn)
      }
      if ("viewpoint" in query) {
        this.sp_viewpoint = query.viewpoint
      }

      if (!body) {
        this.kifu_sample_key = this.KifuBookInfo.values[1].key
        this.kifu_sample_key = this.KifuBookInfo.fetch("KIF_15733").key
        this.kifu_sample_key_input_handle()
      }

      if (false) {
        this.sp_player_info = {
          black: { name: "先手", time: "12:34", },
          white: { name: "後手", time: "56:78", },
        }
      }
    },

    tfx_slider_attrs(value) {
      return { ...this.slider_attrs, disabled: value }
    },

    kifu_sample_key_input_handle() {
      if (this.kifu_book_info) {
        this.sp_body = this.kifu_book_info.sp_body
        this.sp_player_info.black.name = this.kifu_book_info.black
        this.sp_player_info.white.name = this.kifu_book_info.white
      }
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

    paper_style_handle(se_preset_info) {
      se_preset_info.func(this)
    },
    se_tf0_reset() {
      this.se_tf0_perspective = 200
      this.se_tf0_translate_x = 0
      this.se_tf0_translate_y = 0
      this.se_tf0_translate_z = 0
      this.se_tf0_rotate_x    = 0
      this.se_tf0_rotate_y    = 0
      this.se_tf0_rotate_z    = 0
      this.se_tf0_scale       = 1.0
    },
    se_tf1_reset() {
      this.se_tf1_perspective = 200
      this.se_tf1_translate_x = 0
      this.se_tf1_translate_y = 0
      this.se_tf1_translate_z = 0
      this.se_tf1_rotate_x    = 0
      this.se_tf1_rotate_y    = 0
      this.se_tf1_rotate_z    = 0
      this.se_tf1_scale       = 1.0
    },
    se_tf2_reset() {
      this.se_tf2_perspective = 200
      this.se_tf2_translate_x = 0
      this.se_tf2_translate_y = 0
      this.se_tf2_translate_z = 0
      this.se_tf2_rotate_x    = 0
      this.se_tf2_rotate_y    = 0
      this.se_tf2_rotate_z    = 0
      this.se_tf2_scale       = 1.0
    },
  },
  computed: {
    development_p() { return DEVELOPMENT_P },

    HumanSideInfo()    { return HumanSideInfo    },
    ModeInfo()         { return ModeInfo         },
    BoardVariantInfo() { return BoardVariantInfo },
    PieceVariantInfo() { return PieceVariantInfo },
    KifuBookInfo()     { return KifuBookInfo     },
    MixBlendModeInfo() { return MixBlendModeInfo },
    SeSectionInfo()         { return SeSectionInfo         },
    SeVariableInfo()   { return SeVariableInfo   },
    SePresetInfo()     { return SePresetInfo     },

    kifu_book_info() {
      if (this.kifu_sample_key) {
        return KifuBookInfo.fetch(this.kifu_sample_key)
      }
    },

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

    sp_board_image_url() {
      if (!this.sp_board_image) {
        return "none"
      }
      return `url(${this.sp_board_image})`
    },

    se_ws_bg_url() {
      if (!this.se_ws_image) {
        return "none"
      }
      return `url(${this.se_ws_image})`
    },

    sp_params() {
      let params = {}
      params.sp_board_dimension_w    = this.sp_board_dimension_w
      params.sp_board_dimension_h    = this.sp_board_dimension_h
      params.sp_layout               = this.sp_layout
      params.sp_balloon              = this.sp_balloon
      params.sp_layer                = this.sp_layer
      params.sp_piece_variant        = this.sp_piece_variant
      params.sp_board_variant        = this.sp_board_variant
      params.sp_mobile_vertical      = this.sp_mobile_vertical
      params.sp_mode                 = this.sp_mode
      params.sp_viewpoint            = this.sp_viewpoint
      params.sp_debug                = this.sp_debug,
      params.sp_comment              = this.sp_comment,
      params.sp_turn                 = this.sp_turn
      params.sp_body                 = this.sp_body
      params.sp_dev_tools            = this.sp_dev_tools
      params.sp_turn_show            = this.sp_turn_show
      params.sp_coordinate           = this.sp_coordinate
      params.sp_coordinate_variant_v = this.sp_coordinate_variant_v
      params.sp_stand_gravity        = this.sp_stand_gravity
      params.sp_stand_flip        = this.sp_stand_flip
      params.sp_name_direction       = this.sp_name_direction
      params.sp_slider               = this.sp_slider
      params.sp_controller           = this.sp_controller
      params.sp_player_info          = this.sp_player_info
      params.sp_legal_move_only      = this.sp_legal_move_only
      params.sp_illegal_validate     = this.sp_illegal_validate
      params.sp_lift_cancel_action   = this.sp_lift_cancel_action
      return params
    },
  },
}
</script>

<style lang="sass">
@import "pattern.css/pattern.scss"
@import "./support.sass"

.StyleEditorSidebar
  .sidebar-content
    +mobile
      width: $sidebar_width_mobile
    +tablet
      width: $sidebar_width_tablet
    +desktop
      width: $sidebar_width_desktop

.StyleEditor
  .sidebar_toggle_button
    position: fixed
    top: 0
    right: 0
    z-index: 1

  min-height: 100vh

  &.sidebar_p
    .Workspace
      +tablet
        width: unquote("calc(100% - #{$sidebar_width_tablet})")
      +desktop
        width: unquote("calc(100% - #{$sidebar_width_desktop})")

  .StyleEditor-Background
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
    background-image: var(--se_ws_image)
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    filter: unquote('invert(var(--se_ws_invert)) sepia(var(--se_ws_sepia)) hue-rotate(calc(var(--se_ws_hue) * 1turn)) saturate(var(--se_ws_saturate)) grayscale(var(--se_ws_grayscale)) brightness(var(--se_ws_brightness)) contrast(var(--se_ws_contrast)) blur(calc(var(--se_ws_blur) * 1px))')

  .ShogiPlayerWrap
    // width: 100%
    // +tablet
    //   width: var(--se_frame_width)
    width: var(--se_frame_width)

  // 背景の変形
  &.is_tf0_mode_on
    .Workspace
      transform: perspective(var(--se_tf0_perspective)) translate3d(var(--se_tf0_translate_x), var(--se_tf0_translate_y), var(--se_tf0_translate_z)) rotateX(var(--se_tf0_rotate_x)) rotateY(var(--se_tf0_rotate_y)) rotateZ(var(--se_tf0_rotate_z)) scale(var(--se_tf0_scale))

  // 盤の変形
  &.is_tf1_mode_on
    .SpTransformBlock
      transform: perspective(var(--se_tf1_perspective)) translate3d(var(--se_tf1_translate_x), var(--se_tf1_translate_y), var(--se_tf1_translate_z)) rotateX(var(--se_tf1_rotate_x)) rotateY(var(--se_tf1_rotate_y)) rotateZ(var(--se_tf1_rotate_z)) scale(var(--se_tf1_scale))

  // 駒の変形は先後対称。何を先後対称にするかは感覚で決める
  =def_tf2($dir)
    transform: unquote('perspective(var(--se_tf2_perspective)) translate3d(calc(var(--se_tf2_translate_x) * #{$dir}), calc(var(--se_tf2_translate_y) * #{$dir}), var(--se_tf2_translate_z)) rotateX(calc(var(--se_tf2_rotate_x) * #{$dir})) rotateY(calc(var(--se_tf2_rotate_y) * 1)) rotateZ(calc(var(--se_tf2_rotate_z) * 1)) scale(var(--se_tf2_scale))')
  &.is_tf2_mode_on
    .is_position_north
      .PieceObject
        +def_tf2(-1)
    .is_position_south
      .PieceObject
        +def_tf2(1)
</style>
