<template lang="pug">
.PromoteSelectModal(:class="position_key")
  .OverlayBackground
  .pieces_block(ref="pieces_block")
    PieceTap(:piece_texture_class="piece_texture_class(true)"  @click.native="TheSp.promotable_piece_moved2(true)")
    PieceTap(:piece_texture_class="piece_texture_class(false)" @click.native="TheSp.promotable_piece_moved2(false)")
</template>

<script>
import { support } from "./support.js"
import _ from "lodash"
import PieceTap from "./PieceTap.vue"

export default {
  mixins: [support],
  name: "PromoteSelectModal",
  components: {
    PieceTap,
  },
  mounted() {
    this.component_position_set()
  },
  methods: {
    piece_texture_class(promoted) {
      return this.soldier.clone_with_attrs({promoted: promoted}).css_class_list
    },
    // 対象のセルの相対位置にこのコンポーネントを配置
    component_position_set() {
      const el = this.$refs.pieces_block
      const {x, y} = this.pieces_block_v
      el.style.left = `${x}px`
      el.style.top  = `${y}px`
    },
  },
  computed: {
    // 対象の駒
    soldier() {
      return this.TheSp.dialog_soldier
    },
    // 南北どちら側にあるか
    position_key() {
      return this.soldier.location.flip_if(this.TheSp.fliped).position_key
    },
    // 対処のセルの中央の座標
    cell_v() {
      const key = this.soldier.place.css_place_key      // "place_2_3"
      const el = this.TheSp.$el.querySelector("." + key) // querySelector(".place_2_3")
      const rc = el.getBoundingClientRect()             // ビューポートの左上を基準とした座標を取得
      const x = rc.left + rc.width  / 2                 // 本当は rc.x を使いたいが iOS11未満の Safari にはない
      const y = rc.top  + rc.height / 2
      return {x, y}
    },
    // pieces_block の座標
    pieces_block_v() {
      const el = this.$refs.pieces_block
      const rc = el.getBoundingClientRect()
      let x = this.cell_v.x - rc.width  / 2
      let y = this.cell_v.y - rc.height / 2
      // |---||---|
      // |   ||   |
      // |v歩|| と|
      // |   ||   |
      // |---||---| <---
      // |   ||   |
      // |vと|| 歩|
      // |   ||   |
      // |---||---|
      if (this.position_key === "is_position_north") {
        y -= rc.height / 4
        // |---|
        // |   |
        // |v歩|
        // |   |
        // |---|
        // |   |
        // |vと| <---
        // |   |
        // |---|
      } else {
        y += rc.height / 4
        // |---|
        // |   |
        // | と|<---
        // |   |
        // |---|
        // |   |
        // | 歩|
        // |   |
        // |---|
      }
      return {x, y}
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayer .SpGround
  +defvar(sp_promote_select_modal_bg_color, hsla(0, 0%, 0%, 0.5))     // 成り不成り選択画面の背景色
  +defvar(sp_promote_select_modal_hover_color, hsla(0, 0%, 100%, 0.5)) // 成り不成り選択でhoverした駒の背景色
  +defvar(sp_promote_select_modal_z_index, $promote_select_modal_z)          // 成り不成り選択モーダルの z-index

  .PromoteSelectModal
    .OverlayBackground
      @extend %overlay

      position: fixed // 画面全体を覆う
      background-color: var(--sp_promote_select_modal_bg_color)

      z-index: var(--sp_promote_select_modal_z_index)

    .pieces_block
      position: fixed
      z-index: calc(var(--sp_promote_select_modal_z_index) + 1)

      display: flex
      justify-content: center
      align-items: center

    &.is_position_north
      .pieces_block
        flex-direction: column-reverse // 「歩」「と」の順

    &.is_position_south
      .pieces_block
        flex-direction: column // 「と」「歩」の順

  &.is_layer_on
    .PromoteSelectModal
      +is_layer_border
</style>
