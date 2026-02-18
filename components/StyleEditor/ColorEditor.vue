<template lang="pug">
b-colorpicker.ColorEditor(
  v-model="mut_color"
  :alpha="alpha"
  :inline="inline"
  :disabled="disabled"
  )
  template(#footer="{color}")
    .colorpicker-fields.mb-0
      b-field.mb-0(custom-class="is-small" label-position="on-border" label="自由入力")
        template(#message)
          .other_formats.box.is-shadowless.has-background-white-ter.px-2.py-2.mt-2.mb-0
            template(v-for="e in other_formats")
              | {{e}}<br>
        b-input(size="is-small" type="text" :value="free_text" @input="input_handle")

      b-field.mt-2
        template(#message)
          b-button(size="is-small" @click="random_handle" type="is-primary") ランダム
</template>

<script>
import BuefyColor from "@/node_modules/buefy/src/utils/color"
import { ColorHelper } from "./models/color_helper.js"

export default {
  name: "ColorEditor",
  props: {
    value:    { type: String, required: true  },
    alpha:    { type: Boolean, default: true  },
    inline:   { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      free_text: this.value,    // 自由入力用
    }
  },
  watch: {
    // 外側から変更があったとき
    value(str) {
      if (str !== this.free_text) {
        this.input_handle(str)
      }
    },

  },
  methods: {
    // ユーザーが変更したとき
    input_handle(str) {
      if (ColorHelper.valid_p(str)) {
        this.free_text = str
      }
    },

    // BuefyColor オブジェクトを返す
    buefy_color_create(str) {
      if (ColorHelper.invalid_p(str)) {
        str = "black"
      }
      const color = ColorHelper.create(str)
      const hex_str = color.toString({format: "hex"})
      return BuefyColor.parse(hex_str)
    },

    random_handle() {
      const str = ColorHelper.random({alpha: this.color_object.alpha}) // alpha 値は保持する
      this.input_handle(str)
    },
  },
  computed: {
    mut_color: {
      get() {
        return this.buefy_color_create(this.free_text)
      },
      set(v) {
        const old_format = v.toString("hsla") // BuefyColor 型は出力に関してはいろんなフォーマットに変換できる(が、古い書き方)
        const new_format = ColorHelper.create(old_format).toString({format: "hsl"}) // 新しい書き方 hsl(a b c / d) 形式
        this.$emit("input", new_format)
      },
    },
    color_object() {
      return ColorHelper.create(this.mut_color.toString("hsla"))
    },
    other_formats() {
      return [
        this.color_object.toString({format: "hsl"}),
        this.color_object.toString({format: "rgb"}),
        this.color_object.toString({format: "hex"}),
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
  .other_formats
    font-size: 0.5rem
</style>
