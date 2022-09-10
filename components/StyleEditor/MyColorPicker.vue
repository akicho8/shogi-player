<template lang="pug">
b-colorpicker.MyColorPicker(
  v-model="new_value"
  :alpha="has_alpha"
  inline
  )
  template(#footer="{color}")
    .colorpicker-fields
      //- 自由入力の方はリアルタイムで反応する (上書きはされない)
      b-field(custom-class="is-small" label-position="on-border" label="自由入力" :message="other_formats")
        b-input(size="is-small" type="text" :value="user_input" @input="input_handle")

      //- 下の3つはフォーカスを外したときに反応する(リアルタイムにすると入力を書き換えられて不便なため)
      b-field(custom-class="is-small" label-position="on-border" label="HEX")
        b-input(size="is-small" type="text" lazy :value="current_chroma.hex('auto')" @input="input_handle")
      b-field(custom-class="is-small" label-position="on-border" label="RGBA")
        b-input(size="is-small" type="text" lazy :value="current_chroma.css('rgba')" @input="input_handle")
      b-field(custom-class="is-small" label-position="on-border" label="HSLA")
        b-input(size="is-small" type="text" lazy :value="current_chroma.css('hsla')" @input="input_handle")
</template>

<script>
import { support } from "../support.js"
import chroma from "chroma-js"
import BuefyColor from "@/node_modules/buefy/src/utils/color"

export default {
  name: "MyColorPicker",
  mixins: [support],
  props: {
    value:     { type: String, required: true },
    has_alpha: { type: Boolean, default: true },
  },
  data() {
    return {
      new_value: this.buefy_color_new(this.value), // colorpicker 用に BuefyColor 型にする
      user_input: this.value,                      // 最初の値を保持する
      current_chroma: chroma(this.value),          // 常に現在の値
    }
  },
  watch: {
    // 外側から変更があったとき
    value(v) {
      this.new_value = this.buefy_color_new(v)
    },
    // colorpicker が動いたとき
    new_value(v) {
      this.current_chroma = chroma(v.toString("rgba"))
      this.$emit("input", v.toString("rgba"))
    },
  },
  methods: {
    // ユーザーが変更したとき
    input_handle(v) {
      let color = this.safe_chroma(v)
      if (color == null) {
        // まだ入力中
        return
      }
      this.current_chroma = color
      this.new_value = this.buefy_color_new(v)
    },

    // BuefyColor オブジェクトを返す
    buefy_color_new(v) {
      return BuefyColor.parse(chroma(v).css("rgba")) // Buefy内蔵のBuefyColor クラスは rgba しかパースできない
    },

    // chroma でパースできたときだけ chroma オブジェクトを返す
    safe_chroma(v) {
      if (!chroma.valid(v)) {
        console.warn(`読み取りNG: ${v}`)
        return
      }
      console.info(`読み取りOK: ${v}`)
      return chroma(v)
    },
  },
  computed: {
    other_formats() {
      return [
        this.current_chroma.hex('auto'), // auto: alphaがあれば8桁でなければ6桁になる
        this.current_chroma.css('rgba'),
        this.current_chroma.css('hsla'),
      ]
    },
  },

}
</script>

<style lang="sass">
@import "../support.sass"
.MyColorPicker
  input
    text-align: unset ! important // R,G,Bの各入力フィールドをばらばらに数値で入れる想定で右寄せになっているのを解除する
</style>
