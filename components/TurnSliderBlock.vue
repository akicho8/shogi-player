<template lang="pug">
.TurnSliderBlock(v-if="base.inside_slider_p")
  //- input.TurnSliderBlock(type="range" :value="base.turn_offset" @input="base.current_turn_set($event.target.value)" :min="base.turn_offset_min" :max="base.turn_offset_max" ref="TurnSliderBlock")

  //- https://buefy.org/documentation/slider
  //- |----------+----------------------------+------------------------+------------------------|
  //- | event    | 外部から変更したら呼ばれる | 自分で動かすと呼ばれる | 離したときだけ呼ばれる |
  //- |----------+----------------------------+------------------------+------------------------|
  //- | input    | o                          | o                      |                        |
  //- | change   |                            |                        | o                      |※キーボードにも反応する
  //- | dragging |                            | o                      |                        |
  //- |----------+----------------------------+------------------------+------------------------|
  b-slider(
    size="is-small"
    :value="base.turn_offset"
    @dragging="v => base.current_turn_set_by_slider(v, true)"
    @change="v => base.current_turn_set_by_slider(v, true)"
    :min="base.turn_offset_min"
    :max="base.turn_offset_max"
    :tooltip="false"
    :indicator="true"
    @dragstart="focus_handle"
    )
</template>

<script>
import { support } from "./support.js"

export default {
  name: "TurnSliderBlock",
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
.ShogiPlayerGround
  +defvar(sp_turn_slider_block_margin_top, 0.75rem) // 手数スライダーの上マージン

  .TurnSliderBlock
    margin-top: var(--sp_turn_slider_block_margin_top)

    display: flex
    justify-content: center
    align-items: center

    .b-slider
      margin: 0
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
    .TurnSliderBlock
      +is_layer_border
</style>
