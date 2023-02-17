import _ from "lodash"
import { Location } from "./models/location.js"
import isMobile from 'ismobilejs'

const FOCUS_FUNCTION = false

export const app_focus = {
  props: {
    // mountedしたらスライダーにフォーカスする？
    sp_mounted_focus_to_slider: {
      type: Boolean,
      default: false,
    },
  },
  beforeMount() {
    if (this.debug_p) {
      console.log(`sp_mobile_p: ${this.sp_mobile_p}`)
      console.log(`devise_info.key: ${this.devise_info.key}`)
      console.log(`focus_disable_p: ${this.focus_disable_p}`)
    }
  },
  mounted() {
    if (this.sp_mounted_focus_to_slider) {
      this.turn_slider_focus()
    }
  },
  methods: {
    // テキストフィールドまたはテキストエリアにフォーカスしているか？
    focus_on_input_tag_p() {
      const dom = document.activeElement
      if (dom.tagName === "TEXTAREA" || dom.tagName === "INPUT") {
        return true
      }
    },

    // コントローラーの指定のパーツにフォーカスする
    nav_focus_to(key) {
      if (this.focus_disable_p) { return false }
      const el = this.__navigate_block_element_refs(key)
      if (el) {
        el.focus()
        return true
      }
      return false
    },

    // コントローラーのスライダーにフォーカスする
    turn_slider_focus() {
      if (this.focus_disable_p) { return false }
      const el = this.__navigate_block_element_refs("TurnSliderBlock")
      if (el) {
        return el.focus_to_self()
      }
      return false
    },

    // private

    __navigate_block_element_refs(key) {
      if (this.$NavigateBlock) {
        return this.$NavigateBlock.$refs[key]
      }
    },
  },
  computed: {
    focus_enable_p() {
      return !this.focus_disable_p
    },
    // モバイル端末または実際タッチできる端末であればキーボードはないと見なしてスライダーにフォーカスしない
    focus_disable_p() {
      return this.sp_mobile_p || this.devise_info.key === "touch"
    },
    sp_mobile_p() {  // mobile_p にするとグローバルで定義したものと干渉する
      return isMobile(window.navigator).any
    },
  },
}
