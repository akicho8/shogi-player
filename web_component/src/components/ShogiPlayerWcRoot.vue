<template lang="pug">
.ShogiPlayerWcRoot(part="__root__")
  // CSS変数の初期値はここに定義する
  // __root__ は確認のためにつけているだけなので使うな
  .ShogiPlayerCssVariablesOverride1(part="sp_css_variables")
    // 上書きする場合のCSS変数は shogi-player-wc::part(sp_css_variables) {} でここに定義してもらう
    // ShogiPlayerWcRoot でも上書きできたが優先度が曖昧なため階層化している
    .ShogiPlayerCssVariablesOverride2(:style="sp_css_variables_hash")
      // ここに定義すると shogi-player-wc::part(sp_css_variables) {} に勝つ
      // 例: sp_css_variables="{'--sp_controller_width':0.8}"
      ShogiPlayer(
        v-bind="$props"
        v-on="$listeners"
        @update:sp_turn="e => $emit('update:sp_turn', e)"
      )
</template>

<script>
import JSON5 from "json5"

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
  name: "ShogiPlayerWcRoot",
  components: { ShogiPlayer },
  inheritAttrs: false,
  props: {
    // ここで style を受けていると v-bind="$props" でそのまま渡すことができる
    // が、ちょっとわかりづらい
    style: { type: String, },

    sp_css_variables: { type: String, },

    sp_layout:     { type: String, },
    sp_slider:     { type: String, },
    sp_controller: { type: String, },
    sp_body:       { type: String, },
  },
  mounted() {
    // console.log(JSON5.parse(""))

    console.log("NODE_ENV", process.env.NODE_ENV)
    console.log("$attrs", this.$attrs)
    console.log("$props", this.$props)
    console.log(this.sp_css_variables_hash)
  },
  methods: {
    foo(v) {
      console.log(v)
      this.$emit("update:sp_turn", v)

      // this.$el.dispatchEvent(
      //   new CustomEvent("foo", {})
      //   //   bubbles: true,
      //   //   composed: true,
      //   //   cancelable: false,
      //   //   detail: self
      //   // })
      // )

    },
  },
  computed: {
    sp_css_variables_hash() {
      return JSON5.parse(this.sp_css_variables ?? "{}")
    },
  },
}
</script>

<style lang="sass">
// Shadow DOM 内で読み込むと i タグに適用されるが「×」の状態になる
// どこが問題なのかよくわかっていないが外側でもさらに読み込むと「×」が解消される
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css")

// ShogiPlayer のスタイルを読み込む
//
// この場所から assets への相対パスを指定する
// ShogiPlayer.sass はそれを見て assets の場所がわかる
// $sp_assets_dir: "shogi-player/assets"
// $sp_css_root: ".ShogiPlayerWcRoot2"
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

// .ShogiPlayerWcRoot
//   width: 100%
</style>
