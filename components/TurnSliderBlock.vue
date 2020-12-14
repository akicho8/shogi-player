<template lang="pug">
.TurnSliderBlock(v-if="slider_show")
  //- input.TurnSliderBlock(type="range" :value="base.turn_offset" @input="base.current_turn_set($event.target.value)" :min="base.turn_offset_min" :max="base.turn_offset_max" ref="TurnSliderBlock")
  b-slider(
    :value="base.turn_offset"
    @input="base.current_turn_set"
    :min="base.turn_offset_min"
    :max="base.turn_offset_max"
    :tooltip="false"
    :indicator="false"
    @change="change_handle"
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
    change_handle(v) {
      this.focus_to_self()
    },
  },
  methods: {
    // フォーカスさせた状態で document.activeElement を見ると何にフォーカスするべきかわかる
    // v-if="false" のときは querySelector が取れないので注意
    focus_to_self() {
      const querySelector = this.$el.querySelector
      if (querySelector) {
        const el = querySelector(".b-slider-thumb")
        if (el) {
          el.focus()
          return true
        }
      }
      return false
    },
  },
  computed: {
    slider_show() {
      return this.base.slider_show && (this.base.view_p || this.base.play_p)
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .TurnSliderBlock
    display: flex
    justify-content: center
    align-items: center
    .b-slider
      margin: 1rem auto
      cursor: pointer
      width: calc(3rem + 6rem + 6rem + 3rem + 2.5rem)
      outline: none
    .b-slider-thumb
      &:focus
        outline: none // 青い枠を除去。フォーカスしているかどうかはサイズでわかるので不要
</style>
