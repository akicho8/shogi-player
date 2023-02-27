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
  @dragging="v => TheSp.current_turn_set_by_slider(v, true)"
  @change="v => TheSp.current_turn_set_by_slider(v, true)"
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
.ShogiPlayer
  .SpSlider
    margin-top: var(--sp_common_gap_real_px)
    margin-bottom: 0
    margin-left: 0
    margin-right: 0

    cursor: pointer
    width: 100%

    .b-slider-thumb
      &:focus
        outline: none // 青い枠を除去。フォーカスしているかどうかはサイズでわかるので不要

    // indicator がでかすぎるのを調整
    .b-slider-thumb-wrapper.has-indicator
      .b-slider-thumb
        padding: 8px 4px
        font-size: 8px

  &.is_layer_on
    .SpSlider
      +is_layer_border
</style>
