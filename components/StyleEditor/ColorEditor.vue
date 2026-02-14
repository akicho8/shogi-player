<template lang="pug">
b-colorpicker.ColorEditor(
  v-model="new_value"
  :alpha="alpha"
  :inline="inline"
  )
  template(#footer="{color}")
    .colorpicker-fields.mb-0
      //- 自由入力の方はリアルタイムで反応する (上書きはされない)
      b-field.mb-0(custom-class="is-small" label-position="on-border" label="自由入力")
        template(#message)
          .box.is-shadowless.has-background-white-ter.px-2.py-2.mt-2.mb-0
            template(v-for="e in other_formats")
              | {{e}}<br>

        b-input(size="is-small" type="text" :value="user_input" @input="input_handle")

      b-field.mt-2
        template(#message)
          b-button(size="is-small" @click="random_handle" type="is-primary") ランダム
</template>

<script>
import chroma from "chroma-js"
import BuefyColor from "@/node_modules/buefy/src/utils/color"
import { ColorHelper } from "./models/color_helper.js"

export default {
  name: "ColorEditor",
  props: {
    value:  { type: String, required: true  },
    alpha:  { type: Boolean, default: true  },
    inline: { type: Boolean, default: false },
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

    random_handle() {
      const str = ColorHelper.random({alpha: this.current_chroma.alpha()}) // alpha 値は保持する
      this.user_input = str
      this.input_handle(this.user_input)
    },
  },
  computed: {
    other_formats() {
      return [
        this.current_chroma.hex("auto"), // auto: alphaがあれば8桁でなければ6桁になる
        this.current_chroma.css("rgba"),
        this.current_chroma.css("hsla"),
      ]
    },
  },
}
</script>

<style lang="sass">
@import "./support.scss"
.ColorEditor
  input
    text-align: unset ! important // R,G,Bの各入力フィールドをばらばらに数値で入れる想定で右寄せになっているのを解除する
</style>
