<template lang="pug">
//- https://buefy.org/documentation/slider
//- |----------+----------------------------+------------------------+------------------------|
//- | event    | 外部から変更したら呼ばれる | 自分で動かすと呼ばれる | 離したときだけ呼ばれる |
//- |----------+----------------------------+------------------------+------------------------|
//- | input    | o                          | o                      |                        |
//- | change   |                            |                        | o                      |※キーボードにも反応する
//- | dragging |                            | o                      |                        |
//- |----------+----------------------------+------------------------+------------------------|
b-slider.is-unselectable.SpSlider(
  size="is-small"
  :value="TheSp.turn_offset"
  @dragging="v => TheSp.current_turn_set(v, {interactive: true})"
  @change="  v => TheSp.current_turn_set(v, {interactive: true})"
  :min="TheSp.turn_offset_min"
  :max="TheSp.turn_offset_max"
  :tooltip="false"
  :indicator="true"
  @dragstart="focus_handle"
  )
</template>

<script>
import { support } from "./support.js"

export default {
  name: "SpSlider",
  mixins: [support],
  methods: {
    // スライダーを動かしているのにフォーカスしない
    // buefy の不具合っぽい
    // なので自力でフォーカスしておく
    focus_handle() {
      this.focus_to_self()
    },

    // フォーカスさせた状態で document.activeElement を見ると何にフォーカスするべきかわかる
    // v-if="false" のときは querySelector が取れないので注意
    focus_to_self() {
      if (this.TheSp.focus_disable_p) {
        return false
      }
      if (this.$el.querySelector) {
        const el = this.$el.querySelector(".b-slider-thumb")
        if (el) {
          el.focus()
          return true
        }
      }
      return false
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"

$sp_slider_font_size: 0.015     // 盤の縦幅に対する割合
$sp_slider_font_min: 8px       // ただしこれ以上は小さくしない(SpController.vueの8pxと合わせたい)

.ShogiPlayer
  .b-slider
    margin: var(--sp_common_gap_real_px) 0 0
    cursor: pointer

  .b-slider .b-slider-thumb-wrapper.has-indicator .b-slider-thumb
    // padding: unquote("clamp(0px, calc(var(--sp_board_h) * 0.001), 6px)") unquote("clamp(2px, calc(var(--sp_board_w) * 0.001), 4px)")
    // font-size: unquote("max(calc(var(--sp_board_h) * #{$sp_slider_font_size}), #{$sp_slider_font_min})")
    // box-sizing: border-box
    padding: 7px 3px
    font-size: 8px
    &:focus
      outline: none // 青い枠を除去。フォーカスしているかどうかはサイズでわかるので不要

  // デフォルトのフォーカス時の拡大は大きすぎる
  .b-slider .b-slider-thumb-wrapper .b-slider-thumb:focus
    transform: unset
    font-weight: bold

  &.is_layer_on
    .SpSlider
      +is_layer_border
</style>
