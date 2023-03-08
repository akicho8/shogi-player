<template lang="pug">
ShogiPlayer(v-bind="$attrs" v-on="$listeners")
</template>

<script>
import Vue from "vue"
import Buefy from "buefy"
// // import "buefy/dist/buefy.css"
Vue.use(Buefy)

// shogi-player 本体
// import "shogi-player/components/stylesheets/all"
// import "shogi-player/components/ShogiPlayer.sass"
import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

// import { EventList } from "shogi-player/components/models/event_list.js"

export default {
  name: "ShogiPlayerLib",
  components: { ShogiPlayer },
}
</script>

<style lang="sass">
@import "shogi-player/assets/sass/application.sass"

// Shadow DOM 内で読み込むとフォントが読み込まれないがその他の部分は適用する必要があるため読み込む
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css")

// // Shadow DOM 内で読み込むと i タグに適用されるが「×」の状態になる
// // どこが問題なのかよくわかっていないが外側でもさらに読み込むと「×」が解消される
// @import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css")
//
// // @import "@mdi/font/css/materialdesignicons.min.css"
//
// // ShogiPlayer のスタイルを読み込む
// @import "shogi-player/components/ShogiPlayer.sass"
//
// // CSS側で読み込むと Web Components 内に含まれる
// @import "buefy/dist/buefy.css"

// このあとで +mobile などを使いたいため
// @import "~bulma/sass/utilities/_all"

// .ShogiPlayerLib
//   width: 100%
</style>
