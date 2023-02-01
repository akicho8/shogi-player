<template lang="pug">
.ShogiPlayerWcInside
  hr
  i.mdi.mdi-dots-vertical.mdi-18px
  hr
  hr
  | {{JSON.stringify($attrs)}}
  hr
  | {{JSON.stringify($props)}}
  hr
  | msg={{msg}}
  hr
  ShogiPlayer(v-bind="$props" v-on="$listeners")
</template>

<script>
// Buefy
// これは全体で使うことになるので本当は index.js で読み込んだ方がよい
import Vue from "vue"
import Buefy from "buefy"
// import "buefy/dist/buefy.css"
Vue.use(Buefy)

// shogi-player 本体
// import "./foo.sass"
// import "shogi-player/components/stylesheets/all"
// import "shogi-player/components/ShogiPlayer.sass"
import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

export default {
  name: "ShogiPlayerWcInside",
  components: { ShogiPlayer },
  // inheritAttrs: false,
  props: {
    sp_layout:     { type: String, },
    sp_slider:     { type: String, },
    sp_controller: { type: String, },
    //   foo_s: { type: String,  required: false, default: "view_mode",      },
    //   foo_n: { type: Number,  required: false, default: 123,              },
    //   foo_b: { type: Boolean, required: false, default: false,            },
    //   foo_a: { type: Array,   required: false, default: () => ["x", "y"], },
    //   foo_o: { type: Object,  required: false, default: {},               },
  },
  mounted() {
    console.log(this.$props)
    console.log(this.$attrs)
  },
}
</script>

<style lang="sass">
// Shadow DOM 内で読み込まないと届かない
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css")

// ShogiPlayer のスタイルを読み込む
//
// この場所から assets への相対パスを指定する
// ShogiPlayer.sass はそれを見て assets の場所がわかる
// $sp_assets_dir: "shogi-player/assets"
// $sp_css_root: ".ShogiPlayerWcInside2"
// // // // Web Components にした場合 html 内に定義しても shadow-root の中に届かない
// // // // なので Web Components 内に初期値を適用する
@import "shogi-player/components/ShogiPlayer.sass"

// CSS側で読み込むと Web Components 内に含まれる
@import "buefy/dist/buefy.css"

// このあとで +mobile などを使いたいため
// @import "~bulma/sass/utilities/_all"

// 効かない
// shogi-player-wc
//   width: 100%

.ShogiPlayerWcInside
  width: 100%
</style>
